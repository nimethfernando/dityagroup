export interface HomePageContent {
  hero: {
    tagline: string;
    superHeading: string;
    title: string;
    subTitle: string;
    description: string;
    exploreBtnText: string;
    getStartedBtnText: string;
  };
  coreValues: {
    subtitle: string;
    heading: string;
    para1: string;
    para2: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    growthCardTitle: string;
    growthCardDesc: string;
    timeCardTitle: string;
    timeCardDesc: string;
    founderName: string;
    founderRole: string;
  };
  stats: {
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };
  whyChooseUs: {
    subtitle: string;
    heading: string;
    description: string;
    metric1Percent: string;
    metric1Title: string;
    metric1Desc: string;
    metric2Percent: string;
    metric2Title: string;
    metric2Desc: string;
    testimonialQuote: string;
    testimonialAuthor: string;
  };
  howItWorks: {
    subtitle: string;
    heading: string;
    description: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  consultationBanner: {
    badge: string;
    heading: string;
    description: string;
    btnText: string;
  };
}

export interface AboutPageContent {
  banner: {
    badge: string;
    title: string;
    subtitle: string;
  };
  story: {
    subtitle: string;
    heading: string;
    para1: string;
    para2: string;
    missionQuote: string;
    prodCardTitle: string;
    prodCardDesc: string;
    timeCardTitle: string;
    timeCardDesc: string;
  };
  founder: {
    badge: string;
    quote: string;
    name: string;
    role: string;
  };
}

export interface ContactPageContent {
  banner: {
    badge: string;
    title: string;
    subtitle: string;
  };
  info: {
    subtitle: string;
    heading: string;
    description: string;
    phone: string;
    phoneHours: string;
    email: string;
    emailDesc: string;
    address: string;
  };
}

export interface HousePageContent {
  banner: {
    badge: string;
    title: string;
    subtitle: string;
  };
  details: {
    division: string;
    heading: string;
    description: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    checklistTitle: string;
    checklists: string[];
    ctaTitle: string;
    ctaDesc: string;
    ctaBtnText: string;
  };
}

export interface PageContentMap {
  home: HomePageContent;
  about: AboutPageContent;
  contact: ContactPageContent;
  'global-business-network': HousePageContent;
  'ditya-astroverse': HousePageContent;
  'ditya-math-house': HousePageContent;
  'ditya-business-house': HousePageContent;
  'ditya-trading-house': HousePageContent;
  'ditya-tech-house': HousePageContent;
}

export interface PageDefinition {
  slug: keyof PageContentMap;
  title: string;
  path: string;
  category: string;
}

export const PAGE_DEFINITIONS: PageDefinition[] = [
  { slug: 'home', title: 'Home Page', path: '/', category: 'Core Pages' },
  { slug: 'about', title: 'About Us', path: '/about-us', category: 'Core Pages' },
  { slug: 'contact', title: 'Contact Us', path: '/contact-us', category: 'Core Pages' },
  { slug: 'global-business-network', title: 'Global Business Network', path: '/global-business-network', category: 'Houses' },
  { slug: 'ditya-astroverse', title: 'Ditya Astro Verse', path: '/ditya-astroverse', category: 'Houses' },
  { slug: 'ditya-math-house', title: 'Ditya Math House', path: '/ditya-math-house', category: 'Houses' },
  { slug: 'ditya-business-house', title: 'Ditya Business House', path: '/ditya-business-house', category: 'Houses' },
  { slug: 'ditya-trading-house', title: 'Ditya Trading House', path: '/ditya-trading-house', category: 'Houses' },
  { slug: 'ditya-tech-house', title: 'Ditya Tech House', path: '/ditya-tech-house', category: 'Houses' },
];

export const DEFAULT_PAGE_CONTENTS: PageContentMap = {
  home: {
    hero: {
      tagline: 'Since 2018',
      superHeading: 'Code Your Destiny. Create Your Legacy.',
      title: 'Ancient Wisdom. Modern Solutions.',
      subTitle: 'Limitless Possibilities.',
      description:
        'We blend timeless sciences with modern innovations to help you gain clarity, create wealth, build connections and live a life of purpose and fulfillment.',
      exploreBtnText: 'Explore Our Services',
      getStartedBtnText: 'Get Started',
    },
    coreValues: {
      subtitle: 'Welcome to DITYA GROUP',
      heading: 'Our Vision Is Creating Infinite Growth Possibilities',
      para1:
        'If you’re like most ambitious individuals or business owners, you manage multiple roles at once—handling finances, operations, strategy, and execution. Managing everything alone can become overwhelming and limit your true growth potential. That’s where Ditya Group steps in.',
      para2:
        'We provide integrated solutions across stock market guidance with live trading support, business growth, numerology & spiritual guidance, online doctor appointment services, math learning solutions, and coworking spaces—all designed to simplify your life and accelerate your success. Our approach combines practical expertise with deep insight to help you make powerful and aligned decisions.',
      bullet1: 'Simplicity Creates Growth',
      bullet2: 'Growth Through Better Systems',
      bullet3: 'Customer-Focused Approach',
      bullet4: 'Continuous Learning & Improvement',
      growthCardTitle: 'Increase Growth',
      growthCardDesc:
        'Partnering with Ditya Group leads to smarter decisions, higher productivity, and faster business success',
      timeCardTitle: 'Save Time',
      timeCardDesc:
        'With Ditya Group, you can streamline tasks and focus on growth while we handle the support systems',
      founderName: 'Aamitt Batra',
      founderRole: 'CEO & Founder Ditya Group',
    },
    stats: {
      stat1Number: '500 +',
      stat1Label: 'Happy Clients',
      stat2Number: '3,000 +',
      stat2Label: 'Projects & Solutions Delivered',
      stat3Number: '15',
      stat3Label: 'Years Of Experience',
      stat4Number: '72',
      stat4Label: 'Team Members',
    },
    whyChooseUs: {
      subtitle: 'Why Choose Us',
      heading: 'Why Choose US',
      description:
        'Ditya Group handles everything that slows down your growth journey. From financial guidance to essential services, we simplify your path so you can focus on achieving bigger goals. Let us manage what supports your success while you move ahead with clarity.',
      metric1Percent: '95%',
      metric1Title: 'Limited Growth Approach',
      metric1Desc:
        'Managing everything alone or relying on traditional methods can slow down decisions, reduce efficiency, and limit your true potential.',
      metric2Percent: '100%',
      metric2Title: 'Ditya Smart System',
      metric2Desc:
        'An integrated system of trading guidance, numerology insights, and essential services designed to give you clarity, speed, and complete growth support.',
      testimonialQuote:
        'Working with Ditya Group has been a game changer. Their guidance in trading, numerology, and business support made decision-making easier and more effective. Everything is well-managed and results are clearly visible. Truly worth the investment and their other services.',
      testimonialAuthor: 'Aditya Malhotra',
    },
    howItWorks: {
      subtitle: 'How It Works',
      heading: 'How Ditya Group Personalized Approach Works',
      description:
        'Ditya Group provides integrated solutions across finance, numerology, and all other essential services. Our personalized approach helps you make better decisions, simplify tasks, and grow faster with clarity.',
      step1Title: 'Book a Session',
      step1Desc: 'Connect with our expert team for one-on-one initial guidance and customized planning.',
      step2Title: 'Choose Your Service',
      step2Desc: 'Select from our 6 specialized Houses to fit your precise personal or business needs.',
      step3Title: 'Start Your Journey',
      step3Desc: 'Launch with structured support, active mentorship, and experience tangible results.',
    },
    consultationBanner: {
      badge: 'Need Clarification?',
      heading: 'Still Confused About Our Features? Get A Consultation',
      description:
        'If you’re unsure about our services, don’t worry! We offer consultations to guide you with complete clarity. Our team provides the right support across trading, numerology, and essential services to help you make confident decisions.',
      btnText: 'Start Consultation',
    },
  },
  about: {
    banner: {
      badge: 'Get To Know Us',
      title: 'About Us',
      subtitle: 'Building Solutions That Simplify Growth, Learning, and Financial Success',
    },
    story: {
      subtitle: 'Our Story',
      heading: 'An Integrated Ecosystem For Modern Growth & Timeless Wisdom',
      para1:
        'At DITYA Group, we believe growth becomes easier when people have access to the right support systems, structured solutions, and clear guidance. Our mission is to create an ecosystem where individuals, students, professionals, businesses, and organizations can access multiple solutions under one platform.',
      para2:
        'DITYA Group was built with the vision of creating practical solutions that support learning, technology, business growth, digital transformation, financial understanding, and personal development.',
      missionQuote:
        'Creating an integrated ecosystem where individuals and enterprises grow with clarity and confidence.',
      prodCardTitle: 'Increase Productivity',
      prodCardDesc: 'Streamlined execution and smarter decisions across every domain.',
      timeCardTitle: 'Save Valuable Time',
      timeCardDesc: 'Let dedicated systems handle complexity while you expand horizons.',
    },
    founder: {
      badge: 'Founder Message',
      quote:
        '“Our vision is simple — create systems, services, and solutions that make growth easier for individuals and businesses while continuously expanding opportunities under one ecosystem.”',
      name: 'Aamitt Batra',
      role: 'Founder & CEO, DITYA GROUP',
    },
  },
  contact: {
    banner: {
      badge: 'We Are Available 24/7',
      title: 'Contact Us',
      subtitle: 'Have questions about our Houses or guidance programs? Connect directly with our team.',
    },
    info: {
      subtitle: 'Reach Out Directly',
      heading: 'Let’s Start a Conversation Today',
      description:
        'Whether you are looking for stock market mentorship, business growth advisory, numerology solutions, or software engineering, our executive team is ready to assist.',
      phone: '+91-93510 90301',
      phoneHours: 'Mon–Sat 9:00 AM – 7:00 PM IST',
      email: 'groupditya@gmail.com',
      emailDesc: 'Prompt response within 24 hours',
      address:
        '3rd floor, 261, Sewa Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004',
    },
  },
  'global-business-network': {
    banner: {
      badge: 'Networking • Referrals • Growth',
      title: 'Global Business Network',
      subtitle:
        'An elite platform connecting entrepreneurs, founders, and decision-makers for strategic collaborations and high-value referral exchanges.',
    },
    details: {
      division: 'GBN Circle',
      heading: 'Empowering Business Owners Through High-Trust Networks',
      description:
        'Global Business Network (GBN Circle) is designed to help entrepreneurs transcend traditional networking limitations. We create curated peer groups, closed-door executive forums, and structured referral ecosystems where business leaders can scale with integrity and mutual trust.',
      card1Title: 'Increase Growth',
      card1Desc: 'Expand into new territories with direct access to vetted partners and clients.',
      card2Title: 'Save Time',
      card2Desc: 'Skip the friction of cold prospecting and connect directly with key decision-makers.',
      checklistTitle: 'What GBN Circle Delivers:',
      checklists: [
        'Weekly structured networking circles',
        'Cross-industry referral generation',
        'Exclusive corporate masterclasses',
        'Access to investors and strategic capital',
        'Verified business profile directory',
        'VIP access to national summits & expos',
      ],
      ctaTitle: 'Ready to Expand Your Network?',
      ctaDesc: 'Apply for GBN Circle membership and meet your local chapter.',
      ctaBtnText: 'Apply for Membership',
    },
  },
  'ditya-astroverse': {
    banner: {
      badge: 'Numerology • Astrology • Tarot • Energy',
      title: 'Ditya Astro Verse',
      subtitle:
        'Operated under Ditya Divine Code — Aligning your planetary cycles, vibrational numbers, and cosmic frequencies for life and business mastery.',
    },
    details: {
      division: 'Ditya Divine Code',
      heading: 'What You Carry In Your Name & Numbers Matters Deeply',
      description:
        'Every digit and vibration in your birth chart, business name, and home plays a profound role in the flow of energy. Ditya Astro Verse blends ancient Vedic principles with modern analytical numerology to decode hidden blockages, optimize decision timing, and open channels of sustained wealth.',
      card1Title: 'Aligned Decisions',
      card1Desc: 'Launch companies, sign contracts, and make investments during optimal cosmic windows.',
      card2Title: 'Remove Obstacles',
      card2Desc: 'Fast, proven energetic remedies to clear stuck financial and relational patterns.',
      checklistTitle: 'Comprehensive Astroverse Offerings:',
      checklists: [
        'Professional Name Correction & Spelling Harmonization',
        'Business Name & Brand Numerical Analysis',
        'Vedic Birth Chart & Kundli Deep Dive',
        'Tarot Intuitive Guidance & Decision Support',
        'Vastu Consultation for Homes & Corporate Offices',
        'Customized Gemstone & Energy Frequency Remedies',
      ],
      ctaTitle: 'Discover Your Numerological Blueprint',
      ctaDesc: 'Book a 1-on-1 private reading with our senior numerology master.',
      ctaBtnText: 'Book Private Reading',
    },
  },
  'ditya-math-house': {
    banner: {
      badge: 'Concept Mastery • Speed Math • Academic Excellence',
      title: 'Ditya Math House',
      subtitle:
        'Operated under Ditya Math Code — Building mathematical confidence, conceptual clarity, and high-performance problem-solving skills for every student.',
    },
    details: {
      division: 'Ditya Math Code',
      heading: 'Transforming Math From Anxiety Into Intuitive Strength',
      description:
        'Mathematics is not just about memorizing formulas; it is the universal language of logic, patterns, and clarity. Ditya Math House dismantles mathematical apprehension through systematic conceptual coaching, visual problem decomposition, and Vedic mental math techniques that dramatically elevate speed and test scores.',
      card1Title: 'Score Improvement',
      card1Desc: 'Targeted drills and structured diagnostic testing to conquer difficult topics.',
      card2Title: 'Speed Calculations',
      card2Desc: 'Master lightning-fast mental arithmetic for competitive and school exams.',
      checklistTitle: 'Our Academic Programs:',
      checklists: [
        'Foundational Concept Building (Grades 6–12)',
        'Vedic Mathematics & Rapid Calculation Workshops',
        'Board Exam Focused Booster Crash Courses',
        'Competitive Exam Quantitative Aptitude Preparation',
        'One-on-One Dedicated Doubt Clearing Sessions',
        'Continuous Performance Analytics & Parent Reports',
      ],
      ctaTitle: 'Book a Math Assessment Session',
      ctaDesc: 'Evaluate your student’s strengths and identify conceptual blindspots.',
      ctaBtnText: 'Schedule Assessment',
    },
  },
  'ditya-business-house': {
    banner: {
      badge: 'Consultancy • Strategy • Execution • Scaling',
      title: 'Ditya Business House',
      subtitle:
        'What you decide in business matters deeply. Delivering actionable consulting, operating frameworks, and execution advisory for ambitious enterprises.',
    },
    details: {
      division: 'Business Growth & Consultancy',
      heading: 'Architecting Resilient Businesses For Predictable Revenue',
      description:
        'Navigating market headwinds, team alignment, and operational bottlenecks requires experienced guidance. Ditya Business House embeds strategic advisors within your leadership workflow to identify revenue leakages, streamline core operating systems, and position your enterprise for high-multiple growth.',
      card1Title: 'Scale Revenue',
      card1Desc: 'Data-driven market entry, pricing optimization, and client acquisition pipelines.',
      card2Title: 'Operational Clarity',
      card2Desc: 'Automate redundant manual workflows and free leadership to focus on strategy.',
      checklistTitle: 'Strategic Advisory Capabilities:',
      checklists: [
        'Comprehensive Business Model Diagnostic & Audit',
        'SOP Development & Delegation Architecture',
        'Cash Flow Optimization & Working Capital Planning',
        'Go-To-Market & Omnichannel Brand Positioning',
        'Executive Mentorship & Decision Facilitation',
        'Mergers, Joint Ventures & Strategic Alliance Structuring',
      ],
      ctaTitle: 'Request a Strategic Business Audit',
      ctaDesc: 'Connect with our principal business consultants for a confidential review.',
      ctaBtnText: 'Request Audit',
    },
  },
  'ditya-trading-house': {
    banner: {
      badge: 'Learn • Trade • Grow',
      title: 'Ditya Trading House',
      subtitle:
        'Financial market education, live market technical analysis, discipline mastery, and structured trading mentorship for consistent wealth generation.',
    },
    details: {
      division: 'Financial Markets & Trading Education',
      heading: 'Mastering the Stock Market with Data, Discipline & Live Mentorship',
      description:
        'Trading without a validated edge and sound psychological discipline is gambling. Ditya Trading House equips aspiring and experienced market participants with institutional price action concepts, risk-to-reward frameworks, and real-time market guidance to protect capital and consistently extract profits.',
      card1Title: 'Risk-First Trading',
      card1Desc: 'Protect your downside rigorously with systematic position sizing and stops.',
      card2Title: 'Live Market Hours',
      card2Desc: 'Observe real-time trade setups, levels, and execution discipline during market hours.',
      checklistTitle: 'Trading Mentorship Syllabus:',
      checklists: [
        'Price Action & Advanced Candlestick Pattern Recognition',
        'Futures & Options (F&O) Hedging and Greeks Mastery',
        'Volume Spread Analysis (VSA) & Institutional Order Flow',
        'Daily Pre-Market Levels & Real-Time Trading Room Access',
        'Emotional Discipline, Trader Psychology & Journaling',
        'Long-Term Portfolio Construction & Wealth Compounding',
      ],
      ctaTitle: 'Join the Live Trading Mentorship',
      ctaDesc: 'Access our next trading cohort and private daily discord channels.',
      ctaBtnText: 'Enroll Now',
    },
  },
  'ditya-tech-house': {
    banner: {
      badge: 'Software • AI • Web & Mobile • Automation',
      title: 'Ditya Tech House',
      subtitle:
        'Operated under Ditya Quantum Code — Architecting enterprise software solutions, AI workflows, responsive web platforms, and digital transformation.',
    },
    details: {
      division: 'Ditya Quantum Code',
      heading: 'What You Build In Technology Matters Deeply',
      description:
        'In a digital-first global economy, cutting-edge technology is the primary driver of competitive advantage. Ditya Tech House delivers full-cycle software engineering, cloud infrastructure, custom web & mobile apps, and artificial intelligence integrations that empower businesses to operate with extreme speed and reliability.',
      card1Title: 'Modern Architectures',
      card1Desc: 'Next.js, React, TypeScript, cloud serverless microservices, and clean databases.',
      card2Title: 'Rapid Deployment',
      card2Desc: 'Agile sprints, automated CI/CD pipelines, and enterprise-grade security.',
      checklistTitle: 'Technology Engineering Services:',
      checklists: [
        'Custom Web Applications (Next.js, React, Tailwind, Node)',
        'Enterprise Database Design, Optimization & Migration',
        'AI Chatbots, LLM Agents & Workflow Automation',
        'E-Commerce & High-Conversion Digital Portals',
        'Mobile Applications (iOS & Android cross-platform)',
        'Cybersecurity Audits, API Development & Cloud Hosting',
      ],
      ctaTitle: 'Have a Project in Mind?',
      ctaDesc: 'Discuss your technical architecture and scope with our lead developers.',
      ctaBtnText: 'Discuss Project Scope',
    },
  },
};

