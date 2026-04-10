// src/config.js
// Polar Heating & Air Conditioning | Meridian, ID
// Demo by Elevate Marketing LLC — elevatemarketingidaho.com
// Prospect data sourced via live research session — April 2026

const config = {
  business: {
    name:             "Polar Heating & Air Conditioning",
    tagline:          "Meridian's Trusted Comfort Experts",
    subTagline:       "Heating · Cooling · Heat Pumps · Indoor Air Quality",
    phone:            "(208) 884-0334",
    phoneRaw:         "2088840334",
    email:            "",
    address:          "4045 W Cherry Ln",
    city:             "Meridian",
    state:            "ID",
    zip:              "83642",
    owner:            "Claude Croy",
    yearsInBusiness:  "20+",
    license:          "Licensed & Insured — Serving Meridian Since 2000+",
    emergencyService: true,
    financing:        true,
    financeNote:      "Financing options available — ask about current programs when you call.",
  },

  hero: {
    eyebrow:       "Meridian, Idaho · Since 2001",
    line1:         "THEY JUST",
    line2:         "FIXED IT.",
    headline:      "They Didn't Try To Sell Me A New Unit.",
    headlineAccent:"They Just Fixed It.",
    subheadline:
      "Honest HVAC service for the Treasure Valley since 2001. Family-owned. Bryant authorized. Fair prices — no pressure, no upsell.",
    urgency:       "Same-Day Service Available",
    ctaText:       "Get a Free Quote",
    emergencyText: "Same-Day Service Available",
  },

  images: {
    hero: "",
  },

  services: [
    {
      title:       "AC Repair & Service",
      description:
        "Fast diagnosis and repair on all major AC brands. Same-day service available when your cooling goes out during a Treasure Valley summer.",
      icon: "❄️",
    },
    {
      title:       "Furnace Repair & Replacement",
      description:
        "Keep your home warm through Idaho winters. We service all makes and models and give you an honest repair-vs-replace recommendation every time.",
      icon: "🔥",
    },
    {
      title:       "Heat Pump Installation",
      description:
        "Year-round comfort from a single system. We install and service energy-efficient heat pumps sized right for your Meridian home.",
      icon: "♻️",
    },
    {
      title:       "Seasonal Tune-Ups",
      description:
        "Spring AC tune-ups and fall furnace check-ups to catch problems before they turn into emergency calls. Keep your system running at peak efficiency.",
      icon: "🔧",
    },
    {
      title:       "Indoor Air Quality",
      description:
        "Air filtration, humidifiers, UV systems, and ventilation solutions for cleaner, healthier air inside your home — year round.",
      icon: "💨",
    },
    {
      title:       "New System Installation",
      description:
        "Full system replacements with upfront pricing and flexible financing. We size your system correctly and install it to last.",
      icon: "🏠",
    },
  ],

  trustBadges: [
    "Licensed & Insured",
    "Locally Owned — Meridian, ID",
    "Serving the Valley 20+ Years",
    "All Major Brands Serviced",
    "Free Estimates on Replacements",
    "Flexible Financing Available",
  ],

  reviews: [
    {
      name:   "J.F., Meridian",
      text:   "Polar Heating and Air is who I call and who I recommend. They replaced my system and have done my tune-ups ever since — always professional and reasonably priced.",
      rating: 5,
      source: "Nextdoor",
    },
    {
      name:   "C.S., Meridian",
      text:   "Polar Heating and Air Conditioning is right here in my neighborhood. They replaced my furnace about ten years ago and have performed system tune-ups professionally and at reasonable cost ever since.",
      rating: 5,
      source: "Nextdoor",
    },
    {
      name:   "Meridian Homeowner",
      text:   "When my neighbors asked for an honest heating and cooling company that's reasonable and responsive, I told them Polar. They've never let me down.",
      rating: 5,
      source: "Nextdoor",
    },
  ],

  serviceArea: {
    headline: "Serving the Treasure Valley",
    cities: [
      "Meridian",
      "Boise",
      "Eagle",
      "Nampa",
      "Kuna",
      "Star",
      "Caldwell",
      "Middleton",
    ],
  },

  financing: {
    headline: "Flexible Financing on New Systems",
    body:
      "A full HVAC replacement is a serious investment. We offer financing options so you can stay comfortable without the financial stress. Ask about current programs when you call — approval is fast and the process is simple.",
    ctaText: "Ask About Financing",
  },

  quote: {
    headline:    "Get Your Free Quote Today",
    subheadline:
      "Tell us about your home and we'll get back to you fast — usually same day. No pressure, just an honest assessment.",
    fields: ["name", "email", "phone", "zip", "service", "message"],
  },

  colors: {
    primary:     "#1B3A6B",
    primaryDark: "#0F2347",
    secondary:   "#0A1628",
    accent:      "#C8102E",
    accentLight: "#E8293A",
    bg:          "#F4F6F9",
    surface:     "#FFFFFF",
    text:        "#0F2347",
    textMuted:   "#64748b",
  },

  fonts: {
    primary: "DM Sans",
  },

  meta: {
    title:
      "Polar Heating & Air Conditioning | Meridian, ID HVAC",
    description:
      "Locally owned HVAC company serving Meridian and the Treasure Valley. Heating, cooling, heat pumps, and indoor air quality. Call (208) 884-0334.",
  },

  footer: {
    credit:    "Website by Elevate Marketing LLC",
    creditUrl: "https://elevatemarketingidaho.com",
  },
}

export default config
