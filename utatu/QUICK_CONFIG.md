# QUICK CONFIGURATION GUIDE

## 🔧 Essential Settings to Update

### 1. PHONE NUMBER
**Current:** `0785630795`
**Where to update:** Search & Replace in all files

```
- index.html: Lines with phone
- script.js: WhatsApp integration
- Links: href="tel:0785630795"
- Links: https://wa.me/256785630795
```

**Update Command (in code editor):**
- Ctrl+H (or Cmd+H on Mac)
- Find: `0785630795`
- Replace: `YOUR_PHONE_HERE`
- Click "Replace All"

### 2. CLINIC NAME
**Current:** `Utatu Medicals and Maternity Centre`
**Instance:** appears throughout
**Keep consistent** or update all occurrences

### 3. LOCATION
**Current:** `Adjumani, Uganda`
**Update in:**
- About section
- Contact section
- Footer
- Map integration

### 4. EMAIL ADDRESS
**Current:** `info@utaturmedicals.ug`
**Update in:** Footer section (line ~900+)

### 5. OPERATING HOURS
**Current:** 
- Mon-Fri: 8:00 AM - 6:00 PM
- Sat: 9:00 AM - 4:00 PM
- Sun: By Appointment

**Update in:** Contact section, Appointments section

---

## 🎨 STYLE CUSTOMIZATION

### Colors (in `styles.css`)
```css
:root {
    --primary-color: #00a884;      /* Main branding */
    --secondary-color: #0066cc;    /* Secondary accent */
    --accent-color: #ff6b6b;       /* Emergency red */
    --dark-color: #1a1a2e;         /* Dark text */
    --light-color: #f5f5f5;        /* Light background */
}
```

### Font
Edit near line 7 in `styles.css`:
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

### Container Width (max 1200px)
Change line ~24 in `styles.css`:
```css
.container {
    max-width: 1200px;
}
```

---

## 📝 TEXT CONTENT UPDATES

### Hero Section
Edit in `index.html` around line 70:
```html
<h1>Welcome to Utatu Medicals and Maternity Centre</h1>
<p class="tagline">Affordable, Quality Healthcare for All</p>
```

### Services
Edit service cards starting around line 150 in `index.html`:
- Each service has: Icon, Title, Description
- Update as needed

### Testimonials
Edit around line 550 in `index.html`:
- Update review text
- Update reviewer names
- Update service categories

### FAQ
Edit around line 650 in `index.html`:
- Update questions and answers
- Add/remove FAQ items as needed

---

## 📱 IMAGE SETUP

### Add Logo
1. Save logo as `logo.png` in `images/` folder
2. Find in `index.html` around line 16:
```html
<div class="logo">
    <i class="fas fa-hospital"></i>
    <span>Utatu Medicals</span>
</div>
```
3. Replace with:
```html
<div class="logo">
    <img src="images/logo.png" alt="Clinic Logo" style="height: 40px;">
    <span>Utatu Medicals</span>
</div>
```

### Add Hero Image (Optional)
1. Save hero image in `images/` folder
2. Add to `styles.css` around line 230:
```css
.hero {
    background: linear-gradient(...), url('images/hero.jpg');
    background-size: cover;
    background-position: center;
}
```

### Add Team Photos (Optional)
Add in About section of HTML:
```html
<div class="team-photo">
    <img src="images/doctor1.jpg" alt="Doctor Name">
</div>
```

---

## ⚙️ ADVANCED CUSTOMIZATION

### Change Service Count
Default: 12 services
Edit in `index.html` services grid section (around line 140+)
Add/Remove `<div class="service-card">` blocks

### Modify Colors Scheme
1. Choose new color palette
2. Update `:root` variables in `styles.css`
3. Test on mobile and desktop

### Add New Sections
1. Add section to HTML with unique ID
2. Add nav link pointing to ID
3. Add styling in CSS
4. Update JavaScript if interactive

### Disable/Hide Sections
To hide a section without deleting:
1. Add to CSS:
```css
#section-name {
    display: none;
}
```

### Change Fonts
Update font-family in `styles.css`:
```css
font-family: 'Your Font Name', sans-serif;
```

Import from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## 🔗 LINK CUSTOMIZATION

### Navigation Links
Edit `index.html` around line 20:
```html
<li><a href="#home">Home</a></li>
<li><a href="#about">About</a></li>
```

### Social Links
Edit footer around line 850:
```html
<a href="https://wa.me/256785630795" target="_blank">
```

### Emergency Button
Edit around line 42:
```html
<a href="tel:0785630795" class="emergency-btn">
```

---

## 📊 ANALYTICS SETUP

### Google Analytics
Add this before `</body>` tag in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual ID.

---

## 🔐 SECURITY NOTES

### Before Publishing:
- [ ] Remove any test/dummy data
- [ ] Verify all links work
- [ ] Check phone numbers
- [ ] Remove console.log statements
- [ ] Verify SSL certificate (if on HTTPS)
- [ ] Test forms
- [ ] Check images are optimized

### Keep Secure:
- Don't expose sensitive info
- Use HTTPS in production
- Keep backups of original files
- Test changes before deploying

---

## 📋 FORM SETTINGS

### Appointment Form
Located around line 590 in `index.html`

**Change WhatsApp integration:**
In `script.js` around line 65:
```javascript
const whatsappURL = `https://wa.me/256785630795?text=...`;
```

### Form Fields
Current fields:
- Full Name (required)
- Phone Number (required)
- Service Selection
- Preferred Date
- Additional Notes

To modify: Edit HTML form section

---

## 🎯 DEPLOYMENT SETTINGS

### For Email Integration
If you want email instead of WhatsApp:

**Using Formspree:**
1. Go to formspree.io
2. Create form
3. Update form action in HTML:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### For Custom Backend
Connect to your own API:
```javascript
// In script.js, replace WhatsApp section with:
fetch('https://yourapi.com/appointments', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
})
```

---

## 🌍 LOCALIZATION

### Change Currency
Edit services or pricing sections

### Change Language (if needed)
Would require creating separate HTML files or using i18n library

### Change Date Format
In JavaScript around line 200:
```javascript
const dateFormat = new Date(date).toLocaleDateString('en-UG');
```

---

## 🔄 UPDATING RUNNING WEBSITE

### To Update Existing Site:
1. Edit files locally
2. Test thoroughly
3. Upload new files via FTP
4. Clear browser cache
5. Verify changes live

### Rollback if Needed:
1. Keep backup of old version
2. Upload old files back
3. Website reverts

### Track Changes:
- Create `CHANGES.log`:
```
[2024-01-15] Updated phone number, added new testimonials
[2024-01-10] Fixed mobile layout issue
```

---

## ✅ LAUNCH CHECKLIST

### Before Going Live:
- [ ] All text customized
- [ ] Contact info updated
- [ ] Images added
- [ ] Links tested
- [ ] Mobile responsive verified
- [ ] Forms working
- [ ] Analytics added
- [ ] Domain configured
- [ ] SSL certificate enabled
- [ ] Backup created

### Initial Launch:
- [ ] Website goes live
- [ ] Add to Google Search Console
- [ ] Share on social media
- [ ] Tell staff/patients
- [ ] Monitor for issues
- [ ] Check analytics daily (first week)

---

## 📞 QUICK REFERENCE

### File to Edit | Section | Frequency
- `index.html` | Content, Images, Services | As needed
- `styles.css` | Colors, Layout, Typography | Monthly
- `script.js` | Contact info, Form | As needed
- `README.md` | Documentation | Quarterly

### Update Frequency:
- **Testimonials:** Monthly
- **Hours/Contact:** As changes occur
- **Services:** Quarterly
- **About:** Yearly or on major changes

---

**Document Version:** 1.0
**Last Updated:** 2024
**For:** Utatu Medicals and Maternity Centre
