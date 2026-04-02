-- Schema for Maa Sudama Tempo Service Logistics Platform

-- 1. Profiles (Ties to Supabase Auth users)
CREATE TYPE user_role AS ENUM ('SUPERADMIN', 'SUBADMIN', 'CLIENT', 'DRIVER');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'CLIENT',
  approval_status TEXT DEFAULT 'pending_approval' CHECK (approval_status IN ('pending_approval', 'approved', 'rejected')),
  full_name TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Optional, if they have an active user acc
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  gst_number TEXT,
  address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Vehicles (Fleet Inventory)
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_name TEXT NOT NULL,
  registration_number TEXT UNIQUE NOT NULL,
  capacity_tons DECIMAL,
  bed_length_ft DECIMAL,
  type TEXT CHECK (type IN ('Small', 'Mid', 'Heavy')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Drivers
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Optional mapping to Auth user
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  assigned_vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'on_trip', 'on_leave', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Trips (Consignments / Duty)
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ref_number TEXT UNIQUE NOT NULL, -- e.g., MSTS-2026-0001
  client_id UUID REFERENCES clients(id) ON DELETE RESTRICT,
  driver_id UUID REFERENCES drivers(id) ON DELETE RESTRICT,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE RESTRICT,
  origin_address TEXT NOT NULL,
  destination_address TEXT NOT NULL,
  trip_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_transit', 'completed', 'cancelled')),
  base_fare DECIMAL DEFAULT 0.0,
  extra_km DECIMAL DEFAULT 0.0,
  late_night_charge DECIMAL DEFAULT 0.0,
  waiting_charge DECIMAL DEFAULT 0.0,
  total_amount DECIMAL DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Bills (GST and Dummy Invoices)
CREATE TABLE bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  trip_id UUID REFERENCES trips(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('GST', 'Dummy')),
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled')),
  document_url TEXT, -- Link to storage bucket PDF/Image
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Ledgers (Account Tracking)
CREATE TABLE ledgers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL,
  description TEXT NOT NULL,
  debit DECIMAL DEFAULT 0.0, -- Amount charged to client
  credit DECIMAL DEFAULT 0.0, -- Amount paid by client
  balance DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledgers ENABLE ROW LEVEL SECURITY;

-- SUPERADMIN and SUBADMIN can read all profiles. Clients/Drivers can only read their own.
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Client viewing rules
CREATE POLICY "Clients can view their own company records" ON clients FOR SELECT USING (
  profile_id = auth.uid()
);

-- Trip Rules
CREATE POLICY "Clients view their own trips" ON trips FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE profile_id = auth.uid())
);
CREATE POLICY "Drivers view their own trips" ON trips FOR SELECT USING (
  driver_id IN (SELECT id FROM drivers WHERE profile_id = auth.uid())
);

-- NOTE: Admins will require policies mapped via functions or jwt claims checking their profile role.

-- 8. PostgreSQL Trigger for Auto-Profile Creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, company_name, role, approval_status)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'company_name',
    CAST(COALESCE(new.raw_user_meta_data->>'role', 'CLIENT') AS user_role),
    COALESCE(new.raw_user_meta_data->>'approval_status', 'pending_approval')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
