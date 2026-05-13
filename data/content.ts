// ─────────────────────────────────────────────────────────────────────────────
// EDIT ALL SITE CONTENT HERE
// This single file controls every piece of text, stat, card, and contact info.
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  name: "The Mosser Group",
  agent: "Sara Mosser",
  affiliation: "Keller Williams",
  tagline: "You've got somewhere you want to be —\nlet me help you get there.",
}

// ── HERO ──────────────────────────────────────────────────────────────────────
export const heroStats = [
  { value: "$100M+",  label: "Career Sales" },
  { value: "10",      label: "Years Experience" },
  { value: "Top 10%", label: "Solo Agents ATL" },
]

// ── ABOUT ─────────────────────────────────────────────────────────────────────
export const about = {
  eyebrow: "About The Mosser Group",
  headline: "Real Estate,\nDone With Intention",
  paragraphs: [
    "Sara Mosser built The Mosser Group on a simple belief: your home is more than a transaction — it's a chapter in your life. With over a decade of experience navigating the Atlanta market, Sara brings a rare combination of market precision, emotional intelligence, and unwavering commitment to every client she works with.",
    "Whether you're buying your first home, selling a property you've cherished, or relocating to Atlanta's vibrant communities, Sara serves as your trusted guide from the first conversation through closing day and beyond.",
  ],
  values: [
    {
      title: "Local Expertise",
      desc: "Deep roots across Atlanta's neighborhoods — from Buckhead to Inman Park to Sandy Springs and beyond.",
    },
    {
      title: "Strategic Negotiation",
      desc: "Every offer, every counteroffer handled with precision, with your best interests at the center of every decision.",
    },
    {
      title: "Client-First Always",
      desc: "You're never a number. Sara's boutique approach means personalized attention, clear communication, and genuine care.",
    },
  ],
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
export const services = [
  {
    number: "01",
    title: "Buying a Home",
    desc: "From your first search to keys in hand, Sara guides every decision with clarity and calm confidence — so you always feel prepared and never alone.",
  },
  {
    number: "02",
    title: "Selling a Home",
    desc: "Strategic pricing, beautiful presentation, expert negotiation. Your home deserves a sale that truly reflects its value, and Sara delivers exactly that.",
  },
  {
    number: "03",
    title: "Relocation Guidance",
    desc: "New to Atlanta? Sara's deep local knowledge helps you land in the right neighborhood from day one — with zero guesswork on your end.",
  },
  {
    number: "04",
    title: "Luxury Real Estate",
    desc: "Elevated service for elevated properties. Discretion, strategy, and expertise across Atlanta's luxury market — handled with the care it deserves.",
  },
]

// ── PROCESS ───────────────────────────────────────────────────────────────────
export const process = [
  {
    step: "01",
    title: "Discover Your Goals",
    desc: "Every great move begins with a real conversation. Sara takes time to understand what you truly want — not just right now, but for the long term.",
  },
  {
    step: "02",
    title: "Build Your Strategy",
    desc: "Using market data, hyper-local insight, and a decade of experience, Sara crafts a personalized plan built around your specific situation.",
  },
  {
    step: "03",
    title: "Navigate With Confidence",
    desc: "From listings to offers to inspections, Sara is beside you every step of the way. Clear communication, no surprises, no stress.",
  },
  {
    step: "04",
    title: "Close With Clarity",
    desc: "When it's time to close, you'll feel fully prepared, genuinely supported, and proud of where you've landed. That's the Mosser promise.",
  },
]

// ── PROPERTIES ────────────────────────────────────────────────────────────────
// Replace image paths: add your photos to /public/images/
export const properties = [
  {
    id: 1,
    image: "/images/property-1.jpg", // Add photo to /public/images/property-1.jpg
    location: "Buckhead, Atlanta, GA",
    price: "$1,250,000",
    beds: 4,
    baths: 3.5,
    sqft: "3,800",
    status: "Active",
  },
  {
    id: 2,
    image: "/images/property-2.jpg", // Add photo to /public/images/property-2.jpg
    location: "Inman Park, Atlanta, GA",
    price: "$875,000",
    beds: 3,
    baths: 2.5,
    sqft: "2,400",
    status: "Active",
  },
  {
    id: 3,
    image: "/images/property-3.jpg", // Add photo to /public/images/property-3.jpg
    location: "Sandy Springs, GA",
    price: "$1,650,000",
    beds: 5,
    baths: 4,
    sqft: "4,600",
    status: "Under Contract",
  },
]

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
export const testimonials = [
  {
    quote: "Sara didn't just find us a house — she found us our home. Her patience, expertise, and genuine care made the entire process feel effortless. We can't imagine going through this without her.",
    name: "Michael & Jennifer R.",
    location: "Buckhead, Atlanta",
  },
  {
    quote: "I was relocating from New York with no idea where to start. Sara became my trusted advisor from day one. She knew exactly which neighborhoods fit our lifestyle, and the transition was completely seamless.",
    name: "Amanda L.",
    location: "Midtown Atlanta",
  },
  {
    quote: "Selling our home was emotional, and Sara handled everything with such professionalism and sensitivity. We got above asking price in under two weeks. She is simply the best in the business.",
    name: "David & Carol M.",
    location: "Sandy Springs, GA",
  },
]

// ── CONTACT ───────────────────────────────────────────────────────────────────
export const contact = {
  eyebrow: "Ready To Begin?",
  headline: "Let's Talk About\nYour Next Move",
  subtext: "Whether you're ready to start or simply exploring your options, Sara would love to connect. Reach out — let's see what's possible together.",
  phone: "(404) 555-0192",          // Replace with real phone number
  email: "sara@themossergroup.com", // Replace with real email
  address: "3630 Peachtree Rd NE, Suite 100\nAtlanta, GA 30326", // Replace with real address
  social: {
    instagram: "#", // Replace with real Instagram URL
    linkedin:  "#", // Replace with real LinkedIn URL
    facebook:  "#", // Replace with real Facebook URL
  },
}
