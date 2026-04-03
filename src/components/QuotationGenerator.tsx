import React, { useState, useEffect } from 'react';
import { FileText, X } from 'lucide-react';

const quotationTemplate = (companyName: string, companyAddress: string, dateStr: string, validStr: string) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quotation – Maa Sudama Tempo Service</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0D2545; --navy-mid: #1B3A6B; --gold: #C8960C; --gold-light: #F0C93A;
    --cream: #FDF9F2; --ink: #1A1A2E; --muted: #6B7280; --pale: #EBF2FA; --white: #FFFFFF;
    --green: #1a6b35; --green-pale: #edfaf3;
  }
  body { font-family: 'DM Sans', sans-serif; background: #e8edf3; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 30px 16px; flex-direction: column; align-items: center; }
  .page { width: 794px; background: var(--white); box-shadow: 0 20px 80px rgba(13,37,69,0.18); position: relative; overflow: hidden; }
  .sidebar { position: absolute; left: 0; top: 0; bottom: 0; width: 8px; background: linear-gradient(180deg, var(--gold) 0%, var(--navy) 50%, var(--gold) 100%); }
  .header { background: var(--navy); padding: 24px 32px 20px 50px; display: flex; justify-content: space-between; align-items: flex-start; position: relative; }
  .header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold)); }
  .brand-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 900; color: var(--white); line-height: 1.2; }
  .brand-sub { font-size: 9px; font-weight: 500; color: var(--gold-light); letter-spacing: 3px; text-transform: uppercase; margin-top: 3px; }
  .brand-info { margin-top: 8px; display: flex; flex-direction: column; gap: 2px; }
  .brand-info span { font-size: 9px; color: rgba(255,255,255,0.6); }
  .brand-info span b { color: rgba(255,255,255,0.88); font-weight: 500; }
  .quotation-meta { text-align: right; min-width: 190px; }
  .quote-label { font-size: 8.5px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); font-weight: 600; }
  .quote-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--white); line-height: 1; margin: 3px 0 8px; }
  .meta-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 2px; }
  .meta-key { font-size: 8.5px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 1px; }
  .meta-val { font-size: 9px; color: rgba(255,255,255,0.9); font-weight: 500; }
  .recipient-bar { background: var(--pale); padding: 9px 32px 9px 50px; border-bottom: 1px solid #D5E4F2; }
  .recipient-flex { display: flex; align-items: center; gap: 14px; }
  .recipient-label { font-size: 8px; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); font-weight: 600; white-space: nowrap; }
  .recipient-sep { width: 1px; height: 18px; background: #C5D8EC; }
  .recipient-name { font-size: 13px; font-weight: 700; color: var(--navy); font-family: 'Playfair Display', serif; text-transform: uppercase; }
  .recipient-dept { font-size: 9.5px; color: var(--muted); margin-left: 4px; }
  .validity-badge { margin-left: auto; background: var(--gold); color: var(--white); font-size: 8.5px; font-weight: 700; letter-spacing: 1px; padding: 4px 10px; text-transform: uppercase; }
  .recipient-addr { font-size: 9.5px; color: var(--navy-mid); margin-top: 5px; padding-left: 104px; font-weight: 500; }
  .body { padding: 14px 32px 14px 50px; }
  .section-title { font-size: 8px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--navy); border-left: 3px solid var(--gold); padding-left: 8px; margin-bottom: 8px; margin-top: 13px; }
  .section-title:first-child { margin-top: 0; }
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: var(--navy); }
  thead th { padding: 6px 8px; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--white); text-align: center; }
  thead th:first-child { text-align: left; }
  tbody tr:nth-child(even) { background: var(--pale); }
  tbody tr { border-bottom: 1px solid #E2EBF5; }
  tbody td { padding: 6px 8px; font-size: 9px; color: var(--ink); text-align: center; vertical-align: middle; }
  tbody td:first-child { text-align: left; font-weight: 600; color: var(--navy-mid); }
  .tag { display: inline-block; background: rgba(13,37,69,0.07); color: var(--navy); font-size: 7px; font-weight: 600; padding: 1px 4px; border-radius: 2px; margin-left: 3px; vertical-align: middle; }
  .rate-cell { font-weight: 700; color: var(--navy); }
  .range-cell { color: var(--green); font-weight: 600; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .pkg-box { border: 1px solid #D0DFF0; padding: 10px 12px; position: relative; background: var(--cream); flex: 1; }
  .pkg-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); }
  .pkg-title { font-family: 'Playfair Display', serif; font-size: 10.5px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
  .pkg-row { display: flex; justify-content: space-between; padding: 3px 0; border-bottom: 1px dashed #D8E8F5; }
  .pkg-row:last-child { border-bottom: none; }
  .pkg-key { font-size: 8.5px; color: var(--muted); font-weight: 500; }
  .pkg-val { font-size: 8.5px; color: var(--ink); font-weight: 600; }
  .big-price { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--navy); margin-bottom: 5px; }
  .big-price span { font-size: 9px; color: var(--muted); font-family: 'DM Sans', sans-serif; font-weight: 400; }
  .term-card { background: var(--pale); border-top: 3px solid var(--gold); padding: 9px 10px; }
  .term-card-title { font-size: 8px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--navy); margin-bottom: 5px; }
  .term-item { font-size: 8.5px; color: var(--ink); line-height: 1.5; padding: 2px 0; border-bottom: 1px dashed #D5E4F2; }
  .term-item:last-child { border-bottom: none; }
  .term-item b { color: var(--navy-mid); font-weight: 600; }
  .note-bar { background: #FFFBEC; border-left: 4px solid var(--gold); padding: 6px 10px; font-size: 8px; color: #6B5500; margin-top: 9px; line-height: 1.5; }
  .note-bar b { color: #8A6900; }
  .value-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; }
  .vp-card { background: var(--navy); padding: 9px 8px; position: relative; overflow: hidden; }
  .vp-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); }
  .vp-card.highlight { background: #0e3d1a; }
  .vp-card.highlight::after { background: #25d366; }
  .vp-icon { font-size: 15px; margin-bottom: 4px; }
  .vp-title { font-size: 8px; font-weight: 700; color: var(--gold-light); letter-spacing: 0.3px; margin-bottom: 3px; }
  .vp-card.highlight .vp-title { color: #7fffc4; }
  .vp-text { font-size: 7.5px; color: rgba(255,255,255,0.68); line-height: 1.45; }
  .wa-banner { background: linear-gradient(135deg, #0e3d1a 0%, #1a6b35 100%); border-left: 4px solid #25d366; padding: 10px 14px; display: flex; align-items: flex-start; gap: 10px; margin-top: 9px; position: relative; overflow: hidden; }
  .wa-banner::before { content: ''; position: absolute; right: -20px; top: -20px; width: 80px; height: 80px; border-radius: 50%; background: rgba(37,211,102,0.08); }
  .wa-logo { font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 1px; }
  .wa-content { flex: 1; }
  .wa-title { font-size: 9.5px; font-weight: 700; color: #7fffc4; letter-spacing: 0.5px; margin-bottom: 3px; }
  .wa-title span { color: #25d366; font-size: 10.5px; }
  .wa-desc { font-size: 8.5px; color: rgba(255,255,255,0.78); line-height: 1.5; }
  .wa-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
  .wa-tag { background: rgba(37,211,102,0.15); border: 1px solid rgba(37,211,102,0.3); color: #7fffc4; font-size: 7.5px; font-weight: 600; padding: 2px 7px; border-radius: 10px; }
  .doc-banner { background: linear-gradient(135deg, #0D2545 0%, #1B3A6B 100%); border-left: 4px solid var(--gold); padding: 10px 14px; display: flex; align-items: flex-start; gap: 10px; margin-top: 7px; position: relative; overflow: hidden; }
  .doc-banner::before { content: ''; position: absolute; right: -20px; top: -20px; width: 80px; height: 80px; border-radius: 50%; background: rgba(200,150,12,0.08); }
  .doc-icon { font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 1px; }
  .doc-content { flex: 1; }
  .doc-title { font-size: 9.5px; font-weight: 700; color: var(--gold-light); letter-spacing: 0.5px; margin-bottom: 3px; }
  .doc-desc { font-size: 8.5px; color: rgba(255,255,255,0.78); line-height: 1.5; }
  .doc-pills { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
  .doc-pill { background: rgba(200,150,12,0.15); border: 1px solid rgba(200,150,12,0.35); color: var(--gold-light); font-size: 7.5px; font-weight: 600; padding: 2px 7px; border-radius: 10px; }
  .noentry-banner { background: linear-gradient(135deg, #1a0a00 0%, #3d1500 100%); border-left: 4px solid #ff6b00; padding: 10px 14px; display: flex; align-items: flex-start; gap: 10px; margin-top: 7px; position: relative; overflow: hidden; }
  .noentry-banner::before { content: ''; position: absolute; right: -20px; top: -20px; width: 80px; height: 80px; border-radius: 50%; background: rgba(255,107,0,0.1); }
  .noentry-badge { background: #ff6b00; color: white; font-size: 8px; font-weight: 800; padding: 2px 7px; border-radius: 3px; letter-spacing: 1px; text-transform: uppercase; white-space: nowrap; margin-top: 2px; align-self: flex-start; flex-shrink: 0; }
  .noentry-content { flex: 1; }
  .noentry-title { font-size: 9.5px; font-weight: 700; color: #ffb366; letter-spacing: 0.5px; margin-bottom: 3px; }
  .noentry-title span { color: #ff6b00; font-size: 10.5px; }
  .noentry-desc { font-size: 8.5px; color: rgba(255,255,255,0.78); line-height: 1.5; }
  .noentry-pills { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
  .noentry-pill { background: rgba(255,107,0,0.15); border: 1px solid rgba(255,107,0,0.4); color: #ffb366; font-size: 7.5px; font-weight: 600; padding: 2px 7px; border-radius: 10px; }
  .sig-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 4px; }
  .sig-block { border-top: 2px solid var(--navy); padding-top: 7px; }
  .sig-for { font-size: 8px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--navy); }
  .sig-line { border-bottom: 1px solid #B0C4DE; margin: 16px 0 4px; width: 80%; }
  .sig-label { font-size: 7.5px; color: var(--muted); }
  .footer { background: var(--navy); padding: 9px 32px 9px 50px; display: flex; justify-content: space-between; align-items: center; margin-top: 12px; }
  .footer-left { font-size: 7.5px; color: rgba(255,255,255,0.45); }
  .footer-left b { color: rgba(255,255,255,0.75); }
  .footer-right { font-size: 7.5px; color: var(--gold); font-weight: 600; letter-spacing: 0.8px; }
  .print-btn { margin-top: 18px; }
  .print-btn button { background: #0D2545; color: white; border: none; padding: 10px 28px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; letter-spacing: 1px; }
  @media print { body { background: white; padding: 0; } .page { box-shadow: none; } .print-btn { display: none; } @page { margin: 0; size: A4; } }
</style>
</head>
<body>
<div class="page">
  <div class="sidebar"></div>
  <div class="header">
    <div>
      <div class="brand-name">Maa Sudama<br>Tempo Service</div>
      <div class="brand-sub">Freight &amp; Logistics — NCR</div>
      <div class="brand-info">
        <span><b>GSTIN:</b> 06AZJPM1895R2ZE &nbsp;|&nbsp; <b>Constitution:</b> Proprietorship – Kanchan Mishra</span>
        <span><b>Address:</b> 177, Block-B, Vinay Nagar, Faridabad, Haryana – 121013</span>
        <span><b>Phone:</b> +91-9313818431 &nbsp;|&nbsp; +91-7703976645 &nbsp;|&nbsp; <b>Email:</b> connect.msts@gmail.com</span>
      </div>
    </div>
    <div class="quotation-meta">
      <div class="quote-label">Official Document</div>
      <div class="quote-title">Quotation</div>
      <div class="meta-row"><span class="meta-key">Ref No.</span><span class="meta-val">MSTS/${companyName.substring(0,3).toUpperCase()}/Q2/2026-001</span></div>
      <div class="meta-row"><span class="meta-key">Date</span><span class="meta-val">${dateStr}</span></div>
      <div class="meta-row"><span class="meta-key">Valid Until</span><span class="meta-val">${validStr}</span></div>
    </div>
  </div>

  <div class="recipient-bar">
    <div class="recipient-flex">
      <span class="recipient-label">Prepared For</span>
      <div class="recipient-sep"></div>
      <span class="recipient-name">${companyName}</span>
      <span class="recipient-dept">— Attn: Logistics / Operations Department</span>
      <div class="validity-badge">Valid 90 Days</div>
    </div>
    ${companyAddress ? '<div class="recipient-addr">' + companyAddress + '</div>' : ''}
  </div>

  <div class="body">
    <div class="section-title">Fleet &amp; Freight Rate Schedule</div>
    <table>
      <thead>
        <tr>
          <th>Vehicle</th><th>Bed</th><th>Capacity</th><th>Base Fare (3 km)</th><th>Per km (After 3 km)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Maruti Suzuki Super Carry STD <span class="tag">Small</span></td>
          <td>7 ft</td><td>Up to 1 Ton</td><td class="rate-cell">₹400</td><td class="range-cell">₹26–₹30 / km</td>
        </tr>
        <tr>
          <td>Tata Ace Gold <span class="tag">Mid</span></td>
          <td>8 ft</td><td>Up to 1 Ton</td><td class="rate-cell">₹500</td><td class="range-cell">₹31–₹35 / km</td>
        </tr>
        <tr>
          <td>Mahindra Supro Mini Truck <span class="tag">×2 Dedicated</span></td>
          <td>8 ft</td><td>Up to 1 Ton</td><td class="rate-cell">₹500</td><td class="range-cell">₹31–₹35 / km</td>
        </tr>
        <tr>
          <td>Mahindra Bolero Maxx PU <span class="tag">Heavy</span></td>
          <td>9 ft</td><td>Up to 1.8 Ton</td><td class="rate-cell">₹700</td><td class="range-cell">₹32–₹38 / km</td>
        </tr>
      </tbody>
    </table>

    <div class="two-col" style="margin-top:12px;">
      <div>
        <div class="section-title">Full-Day Corporate Packages</div>
        <div style="display:flex;gap:8px;">
          <div class="pkg-box">
            <div class="pkg-title">Carry / Ace / Supro</div>
            <div class="big-price">₹2,500 <span>/ day</span></div>
            <div class="pkg-row"><span class="pkg-key">Shift</span><span class="pkg-val">10 AM – 5 PM (7 hrs)</span></div>
            <div class="pkg-row"><span class="pkg-key">Distance</span><span class="pkg-val">Max 100 km</span></div>
            <div class="pkg-row"><span class="pkg-key">Extra km</span><span class="pkg-val">Per-km rate applies</span></div>
          </div>
          <div class="pkg-box">
            <div class="pkg-title">Bolero Maxx PU</div>
            <div class="big-price">₹3,500 <span>/ day</span></div>
            <div class="pkg-row"><span class="pkg-key">Shift</span><span class="pkg-val">10 AM – 5 PM (7 hrs)</span></div>
            <div class="pkg-row"><span class="pkg-key">Distance</span><span class="pkg-val">Max 100 km</span></div>
            <div class="pkg-row"><span class="pkg-key">Extra km</span><span class="pkg-val">Per-km rate applies</span></div>
          </div>
        </div>
      </div>
      <div>
        <div class="section-title">Ancillary &amp; Payment Terms</div>
        <table>
          <thead><tr><th style="text-align:left;">Charge Type</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Overtime (After 5:00 PM)</td><td class="range-cell">₹100–₹150 / hr</td></tr>
            <tr><td>Extended Waiting</td><td class="range-cell">₹0.5–₹1.0 / min</td></tr>
            <tr><td>Standard Loading/Unloading</td><td style="color:var(--green);font-weight:700;">Included</td></tr>
          </tbody>
        </table>
        <div style="margin-top:7px;">
          <div class="term-card">
            <div class="term-card-title">Payment Options</div>
            <div class="term-item"><b>Corporate:</b> Monthly billing, payment within 10 days of invoice</div>
            <div class="term-item"><b>Ad-hoc:</b> 30% advance + 70% on job completion</div>
            <div class="term-item"><b>Standard:</b> Post-completion — same day or within 7 days</div>
          </div>
        </div>
      </div>
    </div>

    <div class="note-bar">
      <b>Exclusions:</b> Tolls, parking &amp; third-party labour not included. &nbsp;|&nbsp;
      <b>GST @ 18%</b> applicable if invoice required (GSTIN: 06AZJPM1895R2ZE — ITC eligible). &nbsp;|&nbsp;
      All rates valid within NCR/Faridabad zone until <b>${validStr}</b>.
    </div>

    <div class="wa-banner">
      <div class="wa-logo">💬</div>
      <div class="wa-content">
        <div class="wa-title"><span>WhatsApp</span> Dedicated Tracking Group — Per Consignment</div>
        <div class="wa-desc">Har shipment ke liye ek <b style="color:#7fffc4;">dedicated WhatsApp group</b> banaya jaata hai...</div>
      </div>
    </div>

    <div class="doc-banner">
      <div class="doc-icon">📄</div>
      <div class="doc-content">
        <div class="doc-title">Document &amp; Cheque Pickup / Delivery Service</div>
        <div class="doc-desc">Aapko khud aana ki zarurat nahi — hamara driver aapka <b style="color:var(--gold-light);">cheque collect kar sakta hai</b>...</div>
      </div>
    </div>

    <div class="noentry-banner">
      <div class="noentry-badge">🚫 No Entry<br>Pass</div>
      <div class="noentry-content">
        <div class="noentry-title"><span>No Entry Pass</span> — 24×7 Delivery Advantage</div>
        <div class="noentry-desc">Hamare <b style="color:#ffb366;">saare vehicles ke paas valid No Entry Pass hain</b> — iska matlab hum No Entry timing mein bhi delivery kar sakte hain jab baaki transporters ruk jaate hain. Aapka cargo kabhi delay nahi hoga.
        </div>
        <div class="noentry-pills">
          <span class="noentry-pill">✅ No Entry Timing Coverage</span>
          <span class="noentry-pill">🕐 Early Morning Slots</span>
          <span class="noentry-pill">🌙 Late Night Delivery</span>
          <span class="noentry-pill">🏙️ City Centre Access</span>
        </div>
      </div>
    </div>

    <div class="section-title" style="margin-top:12px;">Acceptance &amp; Signatures</div>
    <div class="sig-row">
      <div class="sig-block">
        <div class="sig-for">For: Maa Sudama Tempo Service</div>
        <div class="sig-line"></div>
        <div class="sig-label">Kanchan Mishra (Proprietor) &nbsp;|&nbsp; Date: ${dateStr}</div>
      </div>
      <div class="sig-block">
        <div class="sig-for">For: ${companyName}</div>
        <div class="sig-line"></div>
        <div class="sig-label">Authorised Signatory &nbsp;|&nbsp; Name: _______________ &nbsp;|&nbsp; Date: _______________</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-left">Valid only under reference <b>MSTS/${companyName.substring(0,3).toUpperCase()}/Q2/2026-001</b>. All disputes subject to jurisdiction of Faridabad courts.</div>
    <div class="footer-right">connect.msts@gmail.com &nbsp;|&nbsp; +91-9313818431</div>
  </div>
</div>

<div class="print-btn">
  <button onclick="window.print()">🖨 PRINT / SAVE AS PDF</button>
</div>
</body>
</html>`;

export function QuotationGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Basic interval for the animated prompt
    const initial = setTimeout(() => setShowPrompt(true), 1500);
    const initialHide = setTimeout(() => setShowPrompt(false), 5000);

    const intervalId = setInterval(() => {
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 3000);
    }, 15000); // Trigger prompt every 15 seconds

    return () => {
      clearTimeout(initial);
      clearTimeout(initialHide);
      clearInterval(intervalId);
    };
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) return;

    // Dates
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    
    // Validity: +90 days
    const validDate = new Date(today);
    validDate.setDate(validDate.getDate() + 90);
    const validStr = validDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const finalHtml = quotationTemplate(companyName, address, dateStr, validStr);

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(finalHtml);
      newWindow.document.close();
      // Optional: Wait for resources then print
      // setTimeout(() => newWindow.print(), 500);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Animated Prompt Tooltip */}
        <div 
          className={`bg-white text-slate-800 font-bold px-4 py-2 rounded-xl shadow-xl border-b-4 border-primary transition-all duration-500 origin-bottom-right ${showPrompt && !isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        >
           👉 Get Instant Quotation
           {/* Tooltip little tail */}
           <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b-4 border-r-4 border-primary transform rotate-45"></div>
        </div>

        {/* 3D Button */}
        <button 
          onClick={() => setIsOpen(true)}
          title="Generate Quotation"
          className={`pointer-events-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-orange-500 border-b-[6px] border-orange-700 active:border-b-0 active:translate-y-[6px] shadow-[0_10px_25px_rgba(255,165,0,0.6)] transition-all hover:scale-110 ${showPrompt ? 'animate-bounce' : ''}`}
        >
          {/* Pulsing ring inside the button to make it look alive */}
          <div className="absolute inset-0 rounded-full animate-ping bg-white/30"></div>
          <FileText className="w-8 h-8 text-white drop-shadow-md z-10" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground bg-secondary/50 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold font-display mb-2">Create Quotation</h2>
              <p className="text-sm text-muted-foreground mb-6">Enter the client details to instantly generate a branded PDF quotation.</p>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Company Name *</label>
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="e.g. Reliance Logistics"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-secondary/20 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Company Address <span className="opacity-50 text-xs font-normal">(Optional)</span></label>
                  <textarea 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Sector 14, Noida, UP"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-secondary/20 focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                  >
                    Generate & Download
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
