import { Truck, Shield, UserCheck, MessageSquare, FileText, Award } from "lucide-react";

export const vehicles = [
  {
    name: "Maruti Super Carry",
    image: "/vehicles/maruti-suzuki-super-carry-petrol-1-2-litre.png",
    bedSize: "7ft",
    capacity: "≤ 1 Ton",
    baseFare: "₹400",
    baseFareNote: "first 3km",
    perKm: "₹26–30/km",
    fullDay: "₹2,500/day",
    fullDayNote: "10AM–5PM, max 100km",
    useCases: ["Small parcel delivery", "Document courier", "Urban last-mile"],
  },
  {
    name: "Tata Ace Gold",
    image: "/vehicles/tata-ace-gold-cng-plus-mini-trucks.jpg",
    bedSize: "8ft",
    capacity: "≤ 1 Ton",
    baseFare: "₹500",
    baseFareNote: "first 3km",
    perKm: "₹31–35/km",
    fullDay: "₹2,500/day",
    fullDayNote: "10AM–5PM, max 100km",
    useCases: ["Warehouse transfers", "E-commerce logistics", "Inter-city short haul"],
  },
  {
    name: "Mahindra Supro",
    image: "/vehicles/mahindra-supro-cng-duo-1686291787.webp",
    bedSize: "8ft",
    capacity: "≤ 1 Ton",
    baseFare: "₹500",
    baseFareNote: "first 3km",
    perKm: "₹31–35/km",
    fullDay: "₹2,500/day",
    fullDayNote: "10AM–5PM, max 100km",
    useCases: ["Factory supply runs", "Retail distribution", "Event logistics"],
  },
  {
    name: "Bolero Maxx PU",
    image: "/vehicles/mahindra-bolero-maxx-pik-up-63751.avif",
    bedSize: "9ft",
    capacity: "≤ 1.8 Ton",
    baseFare: "₹700",
    baseFareNote: "first 3km",
    perKm: "₹32–38/km",
    fullDay: "₹3,500/day",
    fullDayNote: "10AM–5PM, max 100km",
    useCases: ["Heavy cargo transport", "Construction material", "Bulk B2B delivery"],
  },
];

export const whyChooseUs = [
  {
    num: "01",
    title: "Guaranteed Fleet",
    description: "4 vehicle types always ready — no third-party dependencies. Your shipment moves on time, every time.",
    icon: Truck,
  },
  {
    num: "02",
    title: "Verified Drivers",
    description: "Background-checked, trained professionals who treat your cargo like their own.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Direct Proprietor Access",
    description: "Speak directly to Kanchan Mishra — no call centers, no runarounds, real accountability.",
    icon: UserCheck,
  },
  {
    num: "04",
    title: "WhatsApp Tracking",
    description: "Live updates, photos, and coordination in dedicated WhatsApp groups per trip.",
    icon: MessageSquare,
  },
  {
    num: "05",
    title: "Doc & Cheque Runner",
    description: "We handle document pickups, cheque deliveries, and sensitive material transport with full proof-of-delivery.",
    icon: FileText,
  },
  {
    num: "06",
    title: "Full Accountability",
    description: "GST-compliant invoicing, timestamped POD photos, and transparent billing — no hidden charges.",
    icon: Award,
  },
];

export const stats = [
  { value: "8+", label: "Years" },
  { value: "4,130+", label: "Trips" },
  { value: "20+", label: "Companies" },
  { value: "4", label: "Vehicle Types" },
  { value: "100%", label: "On-time" },
];

export const clientLogos = [
  "ASB Industries", "Asha Medical", "C1 Modular System", "Classic Flooring",
  "Consolidated Carpet", "Enero Experts", "Glass Wall System", "Global Medilife",
  "Ideas", "Innovcrete", "Interior India", "International Trading",
  "LeoTech System", "Mahabal Concrete", "MS Curative", "Pareek Electricals",
  "Rise Against Hunger", "Vinayak Infra", "Vishal Builder", "Wood Stock",
];

export const bookingSteps = [
  { step: 1, title: "Book", description: "Request a trip via phone, WhatsApp, or our platform" },
  { step: 2, title: "Confirm", description: "We confirm vehicle type, timing, and estimated fare" },
  { step: 3, title: "Driver Assigned", description: "A verified driver is assigned and dispatched" },
  { step: 4, title: "Pickup", description: "Driver arrives at pickup location, loads cargo with photo proof" },
  { step: 5, title: "Delivery", description: "Cargo delivered to destination with timestamped POD" },
  { step: 6, title: "Invoice", description: "GST-compliant invoice generated and shared" },
];
