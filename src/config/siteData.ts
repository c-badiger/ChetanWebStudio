export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  iconName: string;
  description: string;
  benefits: string[];
  cta: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Business' | 'Landing Pages' | 'UI/UX' | 'Web Apps';
  industry: string;
  description: string;
  technologies: string[];
  objective: string;
  result?: string;
  image: string;
  caseStudy?: {
    overview: string;
    clientType: string;
    problem: string;
    goals: string[];
    designApproach: string;
    devApproach: string;
    features: string[];
    takeaways: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  popular?: boolean;
  pages: string;
  turnaround: string;
  revisions: string;
  features: string[];
  notIncluded?: string[];
  cta: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  business: string;
  role: string;
  avatar?: string;
  content: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  id: string;
  category: 'Process' | 'Pricing' | 'Technical' | 'Support';
  question: string;
  answer: string;
}

export const SITE_CONFIG = {
  personal: {
    name: "Chetan Badiger",
    profession: "Freelance Web Designer & Developer",
    headline: "Websites That Turn Visitors Into Customers.",
    subheadline: "I design and build modern, high-converting websites for businesses, startups, and personal brands.",
    availability: "Available for Freelance Projects",
    experienceYears: "5+ Years",
    location: "India",
    email: "chetanwebstudio35@gmail.com",
    whatsapp: "+919380897891",
    whatsappFormatted: "+91 93808 97891",
    linkedin: "https://linkedin.com/in/chetanwebstudio",
    github: "https://github.com/c-badiger",
    upiId: "9380897891@ybl",
    upiQrNote: "Scan using GPay, PhonePe, Paytm, or any UPI App",
  },

  trustPillars: [
    {
      title: "Modern Design",
      description: "Clean SaaS-grade visual hierarchy with dark themes, glassmorphism, and bold modern typography.",
      icon: "Palette"
    },
    {
      title: "Mobile-First",
      description: "Seamless user experience engineered specifically for mobile, tablet, and desktop screens.",
      icon: "Smartphone"
    },
    {
      title: "Fast Performance",
      description: "Optimized asset loading, clean code, and fast Core Web Vitals to maximize search rankings.",
      icon: "Zap"
    },
    {
      title: "Client-Focused",
      description: "Transparent communication, milestone-driven delivery, and dedicated post-launch support.",
      icon: "ShieldCheck"
    }
  ],

  statistics: [
    { label: "Performance Score", value: "99/100", note: "Google Core Web Vitals" },
    { label: "Mobile Optimization", value: "100%", note: "Fluid Responsive Touch UI" },
    { label: "Turnaround Time", value: "1–3 Wks", note: "On-time Delivery Guaranteed" },
    { label: "Clean Code", value: "0% Bloat", note: "Modular & SEO Friendly" }
  ],

  services: [
    {
      id: "web-design",
      title: "Website Design",
      badge: "Visual Identity",
      iconName: "Layout",
      description: "Modern, responsive website concepts designed specifically around your brand identity and business objectives.",
      benefits: [
        "Custom UI/UX layout crafted from scratch",
        "High-converting landing page structure",
        "Figma design system & interactive prototypes",
        "Brand color palette & typography selection"
      ],
      cta: "Discuss Your Project"
    },
    {
      id: "web-dev",
      title: "Website Development",
      badge: "High Performance",
      iconName: "Code",
      description: "Fast, secure, and functional websites built using modern web technologies (React, Next.js, TypeScript, Tailwind).",
      benefits: [
        "Pixel-perfect frontend implementation",
        "Optimized speed & Core Web Vitals",
        "Accessible, clean, search-engine friendly code",
        "Cross-browser and multi-device tested"
      ],
      cta: "Discuss Your Project"
    },
    {
      id: "landing-pages",
      title: "Landing Pages",
      badge: "High Conversion",
      iconName: "Target",
      description: "Laser-focused landing pages designed to generate qualified leads and convert ad campaign traffic into sales.",
      benefits: [
        "Conversion-focused copywriting structure",
        "Compelling hero sections & strong call-to-actions",
        "Interactive form validation & lead capture",
        "Fast page load time to minimize bounce rates"
      ],
      cta: "Discuss Your Project"
    },
    {
      id: "business-sites",
      title: "Business Websites",
      badge: "Complete Solution",
      iconName: "Briefcase",
      description: "Professional multi-page web presence for local businesses, agencies, clinics, gyms, salons, and startups.",
      benefits: [
        "Multi-page structure (Services, About, Pricing, Contact)",
        "Integrated inquiry forms & WhatsApp chat buttons",
        "Google Maps & local business SEO optimization",
        "Content management ready for easy updates"
      ],
      cta: "Discuss Your Project"
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      badge: "User Centric",
      iconName: "Figma",
      description: "Intuitive digital interfaces engineered for maximum user engagement and smooth navigation flows.",
      benefits: [
        "User flow & wireframe architecture",
        "Interactive visual prototypes",
        "Accessibility & contrast compliance",
        "Design system component libraries"
      ],
      cta: "Discuss Your Project"
    },
    {
      id: "redesign",
      title: "Website Redesign",
      badge: "Transformation",
      iconName: "Sparkles",
      description: "Transform outdated, slow, or non-responsive websites into modern, sleek, high-performing digital platforms.",
      benefits: [
        "Modern dark/light aesthetic overhaul",
        "Mobile layout overhaul & optimization",
        "Site speed boosting & script cleanup",
        "SEO preservation & URL redirect mapping"
      ],
      cta: "Discuss Your Project"
    }
  ] as ServiceItem[],

  problemSolution: {
    heading: "Your website shouldn't just look good.",
    subheading: "A bad website costs you customers every single day. Here is how we transform user bounce into business inquiries.",
    problems: [
      { text: "Outdated design that damages brand credibility", icon: "XCircle" },
      { text: "Poor mobile experience losing over 60% of visitors", icon: "XCircle" },
      { text: "Slow load times causing users to abandon immediately", icon: "XCircle" },
      { text: "Confusing navigation and buried contact details", icon: "XCircle" },
      { text: "Weak call-to-action with zero conversion strategy", icon: "XCircle" }
    ],
    solutions: [
      { text: "Modern SaaS-grade dark design that instills instant trust", icon: "CheckCircle2" },
      { text: "Fluid mobile-first interface optimized for touch devices", icon: "CheckCircle2" },
      { text: "Lightning fast speed with < 1 second load times", icon: "CheckCircle2" },
      { text: "Clear visual hierarchy guiding users to inquiry forms", icon: "CheckCircle2" },
      { text: "Conversion-engineered CTAs placed strategically", icon: "CheckCircle2" }
    ]
  },

  projects: [
    {
      id: "nexus-analytics",
      title: "Nexus Analytics AI Platform",
      category: "Web Apps",
      industry: "SaaS & AI Data Technology",
      description: "A dark theme SaaS platform dashboard designed for real-time AI data visualization and customer metrics.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Lucide"],
      objective: "Create a modern visual dashboard interface that communicates complex metrics with extreme clarity.",
      image: "/projects/saas.png",
      caseStudy: {
        overview: "Nexus Analytics required a futuristic yet intuitive web application interface to showcase live predictive telemetry.",
        clientType: "FinTech & AI Startup",
        problem: "Existing user dashboards were cluttered, slow to render data, and lacked mobile touch optimization.",
        goals: [
          "Simplify telemetry data display using glowing modern card components",
          "Ensure instantaneous rendering on tablet and mobile viewports",
          "Establish an authoritative dark aesthetic with glowing cyan accents"
        ],
        designApproach: "Utilized a sleek deep slate palette with neon cyan accents, modular grid cards, and glassmorphism headers.",
        devApproach: "Built with React component architecture, CSS grid layout, and optimized SVG micro-animations.",
        features: [
          "Interactive analytics metrics grid",
          "Real-time status indicators",
          "Responsive navigation sidebar drawer",
          "Dark mode color tokens"
        ],
        takeaways: "Designed to maximize data readability and reduce cognitive load for analytics teams."
      }
    },
    {
      id: "aura-chronos",
      title: "Aura Chronos Luxury E-Commerce",
      category: "Business",
      industry: "Luxury Accessories & Retail",
      description: "A minimalist, dark aesthetic online storefront built for premium timepiece collection highlights and direct checkout.",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
      objective: "Deliver a high-end luxury shopping experience with instant page loads and fluid micro-interactions.",
      image: "/projects/ecommerce.png",
      caseStudy: {
        overview: "Aura Chronos needed a digital flagship store that felt as luxurious as their handcrafted physical timepieces.",
        clientType: "E-Commerce Luxury Retailer",
        problem: "Conventional e-commerce templates felt generic, bloated, and failed to project luxury exclusivity.",
        goals: [
          "Craft an ultra-clean product visual grid",
          "Streamline the path from item discovery to inquiry / purchase",
          "Achieve a 98+ Google PageSpeed score"
        ],
        designApproach: "Paired dark obsidian backgrounds with metallic bronze/gold highlights and high-contrast typography.",
        devApproach: "Implemented lazy loading for ultra high resolution product images and lightweight state management.",
        features: [
          "Interactive product gallery viewer",
          "Slide-out shopping drawer",
          "Filterable catalog grid",
          "Mobile-first checkout flow"
        ],
        takeaways: "Built to elevate brand perception and increase average order values."
      }
    },
    {
      id: "apex-fitness",
      title: "Apex Performance Gym & Club",
      category: "Landing Pages",
      industry: "Health, Fitness & Local Business",
      description: "An energetic, conversion-focused business website for a premium gym chain featuring membership tiers and booking.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Vite"],
      objective: "Convert local web traffic into gym walk-in visits and free trial pass signups.",
      image: "/projects/business.png",
      caseStudy: {
        overview: "Apex Performance needed a vibrant local business web presence to showcase personal training programs and state-of-the-art facilities.",
        clientType: "Fitness & Wellness Club",
        problem: "Old site was static, hard to navigate on phones, and had no clear call-to-action for local lead capture.",
        goals: [
          "Highlight trial membership pass signups",
          "Showcase facility photo galleries and trainer profiles",
          "Integrate direct WhatsApp and Google Maps contact actions"
        ],
        designApproach: "High-contrast dark layout with vibrant amber warning glow highlights, aggressive typography, and bold hero cards.",
        devApproach: "Structured with reusable pricing cards, WhatsApp click-to-chat integration, and interactive schedule tables.",
        features: [
          "Tiered membership pricing table",
          "One-tap trial pass claim form",
          "Trainer spotlight carousel",
          "Interactive schedule accordion"
        ],
        takeaways: "Engineered specifically to convert local mobile search traffic into real-world gym inquiries."
      }
    },
    {
      id: "vanguard-agency",
      title: "Vanguard Creative Digital Agency",
      category: "UI/UX",
      industry: "Design & Marketing Agency",
      description: "A state-of-the-art agency portfolio site with floating 3D glass cards, dynamic hero banners, and lead forms.",
      technologies: ["HTML5", "Vanilla CSS", "JavaScript", "Canvas"],
      objective: "Demonstrate high-end web craft to attract enterprise clients seeking custom digital design.",
      image: "/projects/landing.png",
      caseStudy: {
        overview: "Vanguard needed a creative showcase site that immediately establishes technical and artistic dominance.",
        clientType: "Design & Digital Marketing Firm",
        problem: "Generic WordPress templates failed to communicate creative authority to high-ticket clients.",
        goals: [
          "Demonstrate bespoke web design capability",
          "Highlight key agency case studies visually",
          "Capture high-budget project briefs via interactive wizard"
        ],
        designApproach: "Deep navy background, glassmorphic cards, glowing radial gradients, and modern serif/sans typography.",
        devApproach: "Clean semantic HTML5 layout with modular CSS design tokens and smooth scroll animations.",
        features: [
          "Glassmorphism visual card components",
          "Multi-step lead qualification form",
          "Client testimonial showcase",
          "Interactive service breakdown"
        ],
        takeaways: "Serves as an exemplar of high-converting agency website design."
      }
    }
  ] as ProjectItem[],

  techStack: [
    { name: "HTML5", category: "Frontend", level: "Expert", icon: "Code2" },
    { name: "CSS3 / Custom CSS", category: "Frontend", level: "Expert", icon: "Palette" },
    { name: "JavaScript (ES6+)", category: "Frontend", level: "Expert", icon: "FileJson" },
    { name: "TypeScript", category: "Frontend", level: "Advanced", icon: "FileCode" },
    { name: "React", category: "Frontend", level: "Expert", icon: "Atom" },
    { name: "Next.js", category: "Frontend", level: "Advanced", icon: "Layers" },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert", icon: "Wand2" },
    { name: "Node.js", category: "Backend", level: "Intermediate", icon: "Server" },
    { name: "Express", category: "Backend", level: "Intermediate", icon: "Cpu" },
    { name: "MongoDB", category: "Backend", level: "Intermediate", icon: "Database" },
    { name: "Figma", category: "UI/UX & Tools", level: "Expert", icon: "Figma" },
    { name: "Git & GitHub", category: "UI/UX & Tools", level: "Expert", icon: "GitBranch" },
  ],

  workProcess: [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We discuss your business goals, target audience, brand identity, and key requirements to define a clear project roadmap.",
      deliverables: ["Project Scope & Timeline", "Wireframe Concepts", "Content Checklist"]
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description: "I craft custom UI mockups, visual hierarchy, color schemes, and interactive prototypes tailored to your brand.",
      deliverables: ["Figma Design Mockups", "Interactive Prototype", "Mobile Responsive Views"]
    },
    {
      number: "03",
      title: "Development & Coding",
      description: "I transform approved designs into fast, responsive, and clean code using modern web frameworks with optimal performance.",
      deliverables: ["Pixel-Perfect Code", "Speed & Core Web Vitals Audit", "SEO Meta Structure"]
    },
    {
      number: "04",
      title: "Testing & Launch",
      description: "We thoroughly test across mobile, tablet, and desktop viewports, deploy your site live, and hand over all files.",
      deliverables: ["Domain & Hosting Setup", "Cross-Browser Quality Check", "Source Code Handover & Guide"]
    }
  ],

  pricing: [
    {
      id: "starter",
      name: "Starter Package",
      tagline: "Ideal for landing pages, portfolio sites, and simple business launches.",
      price: "Custom Quote",
      pages: "1 Single Page (Landing)",
      turnaround: "5–7 Days",
      revisions: "2 Iteration Rounds",
      features: [
        "1 Custom Modern Landing Page",
        "Mobile & Tablet Responsive",
        "Fast Performance (< 1s load time)",
        "Contact Form & WhatsApp Button",
        "Basic On-Page SEO Setup",
        "Domain & Deployment Assistance"
      ],
      notIncluded: ["Multi-page navigation", "CMS integration"],
      cta: "Get Started"
    },
    {
      id: "professional",
      name: "Professional Business",
      tagline: "For established businesses needing a complete multi-page web presence.",
      price: "Custom Quote",
      popular: true,
      pages: "Up to 5 Pages",
      turnaround: "2 Weeks",
      revisions: "3 Iteration Rounds",
      features: [
        "Up to 5 Custom Designed Pages",
        "Custom UI/UX Design System",
        "Interactive Form & Lead Capture",
        "High Performance & Core Web Vitals",
        "Complete SEO Metadata & OpenGraph",
        "Google Maps & Analytics Integration",
        "Payment / UPI Card Integration",
        "30 Days Post-Launch Support"
      ],
      cta: "Recommended Choice"
    },
    {
      id: "custom",
      name: "Custom Web App / Premium",
      tagline: "For complex web applications, platforms, or custom requirements.",
      price: "Custom Quote",
      pages: "Tailored to Scope",
      turnaround: "3+ Weeks",
      revisions: "Unlimited during phase",
      features: [
        "Bespoke Web Application / SaaS UI",
        "Complex State & API Integrations",
        "Custom Animations & Micro-Interactions",
        "Advanced Analytics & Event Tracking",
        "Priority Support & Strategy Session",
        "Handover Code Documentation"
      ],
      cta: "Discuss Custom Scope"
    }
  ] as PricingPlan[],

  testimonials: [
    // Real testimonials can be populated here.
    // If empty array, component gracefully renders the professional empty state.
  ] as TestimonialItem[],

  payment: {
    title: "Payment Options",
    description: "Flexible & secure payment methods for project deposits and milestone completions.",
    upiId: "chetanwebstudio@upi",
    notice: "Payment details & official invoice will be provided after project confirmation.",
    supported: ["UPI (GPay, PhonePe, Paytm, BHIM)", "Direct Bank Transfer (NEFT/IMPS)"]
  },

  faqs: [
    {
      id: "faq-1",
      category: "Process",
      question: "How does the project process work?",
      answer: "We follow a 4-step process: 01 Discovery & Strategy, 02 Design & Wireframing, 03 Development & Coding, and 04 Testing & Launch. You are kept updated at every key milestone."
    },
    {
      id: "faq-2",
      category: "Process",
      question: "How long does it take to build a website?",
      answer: "A standard landing page usually takes 5–7 days, while a multi-page professional business website takes around 2 weeks. Custom web applications vary depending on complexity."
    },
    {
      id: "faq-3",
      category: "Technical",
      question: "Will my website work on mobile devices?",
      answer: "Yes, 100%. All websites I design and build are mobile-first, ensuring fluid performance, touch-friendly UI elements, and perfect layouts across smartphones, tablets, and desktop displays."
    },
    {
      id: "faq-4",
      category: "Technical",
      question: "Do you provide website hosting and domain setup?",
      answer: "Yes! I assist with registering your custom domain and deploying your website to fast, modern hosting platforms such as Vercel, Netlify, or your preferred hosting server."
    },
    {
      id: "faq-5",
      category: "Process",
      question: "Can you redesign an existing outdated website?",
      answer: "Absolutely. I specialize in taking outdated, slow, or non-responsive websites and completely revamping their visual design, mobile layout, loading speed, and conversion structure."
    },
    {
      id: "faq-6",
      category: "Technical",
      question: "Do you include Search Engine Optimization (SEO)?",
      answer: "Yes, every website includes essential technical SEO: semantic HTML5 structure, optimized meta titles and descriptions, OpenGraph social preview tags, fast loading speeds, and sitemap structure."
    },
    {
      id: "faq-7",
      category: "Pricing",
      question: "What payment methods do you accept?",
      answer: "I support UPI payments (Google Pay, PhonePe, Paytm, BHIM) using UPI ID or QR code, as well as direct bank wire transfers (NEFT/IMPS). Official invoices are issued for all projects."
    },
    {
      id: "faq-8",
      category: "Support",
      question: "Can I update the website content myself later?",
      answer: "Yes. I build clean, modular components and provide handover instructions. If you require a Content Management System (CMS) like headless Sanity or Strapi, we can include that in the scope."
    },
    {
      id: "faq-9",
      category: "Process",
      question: "How do revisions work?",
      answer: "Each package includes dedicated feedback rounds during the design and development phases to ensure you are 100% satisfied before final launch."
    },
    {
      id: "faq-10",
      category: "Support",
      question: "Do you offer post-launch maintenance?",
      answer: "Yes, I provide post-launch technical support and ongoing monthly maintenance packages for updates, security checks, and content tweaks."
    }
  ] as FAQItem[]
};
