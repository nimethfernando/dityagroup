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
  coreValues?: {
    subtitle: string;
    heading: string;
    welcomeBadge: string;
    para1: string;
    para2: string;
    para3: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    prodCardTitle: string;
    prodCardDesc: string;
    timeCardTitle: string;
    timeCardDesc: string;
  };
  story?: {
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
    tag?: string;
    quote: string;
    name: string;
    role: string;
  };
  stats?: {
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };
  howItWorks?: {
    subtitle: string;
    heading: string;
    description: string;
    step1Num?: string;
    step1Desc: string;
    step2Num?: string;
    step2Desc: string;
    step3Num?: string;
    step3Desc: string;
    testimonialQuote: string;
    testimonialAuthor: string;
  };
  whyChooseUs?: {
    subtitle: string;
    heading: string;
    description: string;
    metric1Percent: string;
    metric1Title: string;
    metric1Desc: string;
    metric2Percent: string;
    metric2Title: string;
    metric2Desc: string;
  };
  cta?: {
    btnText: string;
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
    secondaryPhone?: string;
    secondaryPhoneLabel?: string;
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
    overviewHeading?: string;
    overviewDescription?: string;
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

export interface ServicesPageContent {
  banner: {
    badge: string;
    title: string;
    subtitle: string;
  };
  intro: {
    heading: string;
    description: string;
  };
}

export interface LegalPageContent {
  banner: {
    badge: string;
    title: string;
    subtitle: string;
  };
  content: {
    section1Title: string;
    section1Text: string;
    section2Title: string;
    section2Text: string;
    section3Title: string;
    section3Text: string;
    section4Title: string;
    section4Text: string;
    section5Title: string;
    section5Text: string;
  };
}

export interface CustomPageContent {
  isCustomPage: boolean;
  category: string;
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
  richContent?: string;
}

export interface GBNPageContent {
  banner: {
    badge: string;
    title: string;
    subtitle: string;
  };
  intro: {
    tagline: string;
    heading: string;
    description: string;
  };
  features: {
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  tiers?: {
    heading: string;
    subtitle: string;
    tier1Title: string;
    tier1Criteria: string;
    tier1Desc: string;
    tier1Features: string[];
    tier2Title: string;
    tier2Criteria: string;
    tier2Desc: string;
    tier2Features: string[];
  };
  stats?: {
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
  cta: {
    heading: string;
    description: string;
    btnText: string;
    btnLink: string;
  };
}

export interface PageContentMap {
  home: HomePageContent;
  about: AboutPageContent;
  contact: ContactPageContent;
  services: ServicesPageContent;
  'privacy-policy': LegalPageContent;
  'terms-and-conditions': LegalPageContent;
  'ditya-wealth-house': HousePageContent;
  'global-business-network': GBNPageContent;
  'ditya-astroverse': HousePageContent;
  'ditya-math-house': HousePageContent;
  'ditya-business-house': HousePageContent;
  'ditya-trading-house': HousePageContent;
  'ditya-tech-house': HousePageContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [customSlug: string]: any;
}

export interface PageDefinition {
  slug: string;
  title: string;
  path: string;
  category: string;
  isCustomPage?: boolean;
}

export const PAGE_DEFINITIONS: PageDefinition[] = [
  { slug: 'home', title: 'Home Page', path: '/', category: 'Core Pages' },
  { slug: 'about', title: 'About Us', path: '/about-us', category: 'Core Pages' },
  { slug: 'services', title: 'Services & Houses Directory', path: '/services', category: 'Core Pages' },
  { slug: 'contact', title: 'Contact Us', path: '/contact-us', category: 'Core Pages' },
  { slug: 'global-business-network', title: 'Global Business Network (GBN)', path: '/global-business-network', category: 'Ecosystem & Networks' },
  { slug: 'privacy-policy', title: 'Privacy Policy', path: '/privacy-policy', category: 'Legal & Policy' },
  { slug: 'terms-and-conditions', title: 'Terms & Conditions', path: '/terms-and-conditions', category: 'Legal & Policy' },
  { slug: 'ditya-wealth-house', title: 'Ditya Wealth House', path: '/ditya-wealth-house', category: 'Houses' },
  { slug: 'ditya-astroverse', title: 'Ditya Astroverse', path: '/ditya-astroverse', category: 'Houses' },
  { slug: 'ditya-math-house', title: 'Ditya Math House', path: '/ditya-math-house', category: 'Houses' },
  { slug: 'ditya-business-house', title: 'Ditya Business House', path: '/ditya-business-house', category: 'Houses' },
  { slug: 'ditya-trading-house', title: 'Ditya Trading House', path: '/ditya-trading-house', category: 'Houses' },
  { slug: 'ditya-tech-house', title: 'Ditya Tech House', path: '/ditya-tech-house', category: 'Houses' },
  { slug: 'global-business-network', title: 'Global Business Network', path: '/global-business-network', category: 'Houses' },
];

export function createDefaultCustomPage(title: string, category = 'Services Sub-Page'): CustomPageContent {
  return {
    isCustomPage: true,
    category,
    banner: {
      badge: 'Ditya Group • Specialized Solution',
      title,
      subtitle: `Explore personalized consulting, methodologies, and services offered under ${title}.`,
    },
    details: {
      division: 'Ditya Group Ecosystem',
      heading: `Transform Your Results with ${title}`,
      description: `We provide specialized, high-impact guidance and execution support tailored to your unique requirements. Discover our curated approaches and expert mentorship.`,
      card1Title: 'Strategic Clarity',
      card1Desc: 'Actionable step-by-step frameworks tailored to your specific goals and timeline.',
      card2Title: 'Dedicated Mentorship',
      card2Desc: 'Direct support from experienced practitioners and seasoned advisors.',
      checklistTitle: 'Key Advantages & Offerings:',
      checklists: [
        'Personalized diagnostic review & roadmap',
        'Direct 1-on-1 strategic consultation sessions',
        'Continuous execution feedback & milestone tracking',
        'Access to proprietary frameworks & resources',
        'Priority support & executive access',
      ],
      ctaTitle: `Ready to Get Started with ${title}?`,
      ctaDesc: 'Schedule an initial discovery consultation with our senior advisory team.',
      ctaBtnText: 'Request Consultation',
    },
    richContent: '',
  };
}

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
      badge: 'About Us',
      title: 'About Us',
      subtitle: 'Building Solutions That Simplify Growth',
    },
    coreValues: {
      subtitle: 'Our Core Value',
      heading: 'Our Business Is Making Your Life Easier',
      welcomeBadge: 'Welcome To DITYA GROUP',
      para1:
        'At DITYA Group, we believe growth becomes easier when people have access to the right support systems, structured solutions, and clear guidance. Our mission is to create an ecosystem where individuals, students, professionals, businesses, and organizations can access multiple solutions under one platform.',
      para2:
        'DITYA Group was built with the vision of creating practical solutions that support learning, technology, business growth, digital transformation, financial understanding, and personal development. Rather than focusing on a single industry, we aim to create a connected ecosystem where different services work together to support long-term growth.',
      para3:
        'Whether you are seeking educational support, digital services, financial learning, business solutions, technology support, or structured guidance — DITYA Group is designed to simplify the journey.',
      bullet1: 'Simplicity Creates Growth',
      bullet2: 'Growth Through Better Systems',
      bullet3: 'Customer-Focused Approach',
      bullet4: 'Continuous Learning & Improvement',
      prodCardTitle: 'Increase Productivity',
      prodCardDesc:
        'Partnering with Ditya Group leads to smarter decisions, higher productivity, and faster business success',
      timeCardTitle: 'Save Time',
      timeCardDesc:
        'With Ditya Group, you can streamline tasks and focus on growth while we handle the support systems',
    },
    story: {
      subtitle: 'Our Core Value',
      heading: 'Our Business Is Making Your Life Easier',
      para1:
        'At DITYA Group, we believe growth becomes easier when people have access to the right support systems, structured solutions, and clear guidance. Our mission is to create an ecosystem where individuals, students, professionals, businesses, and organizations can access multiple solutions under one platform.',
      para2:
        'DITYA Group was built with the vision of creating practical solutions that support learning, technology, business growth, digital transformation, financial understanding, and personal development.',
      missionQuote:
        'Creating an integrated ecosystem where individuals and enterprises grow with clarity and confidence.',
      prodCardTitle: 'Increase Productivity',
      prodCardDesc:
        'Partnering with Ditya Group leads to smarter decisions, higher productivity, and faster business success',
      timeCardTitle: 'Save Time',
      timeCardDesc:
        'With Ditya Group, you can streamline tasks and focus on growth while we handle the support systems',
    },
    founder: {
      badge: 'CEO & Founder BMC Genie',
      tag: 'Founder Message',
      quote:
        '“Our vision is simple — create systems, services, and solutions that make growth easier for individuals and businesses while continuously expanding opportunities under one ecosystem.”',
      name: 'Aamitt Batra',
      role: 'Founder, DITYA GROUP',
    },
    stats: {
      stat1Number: '500 +',
      stat1Label: 'Happy Clients',
      stat2Number: '3,000 +',
      stat2Label: 'Projects & Solutions Delivered',
      stat3Number: '15',
      stat3Label: 'Years Of Experience',
      stat4Number: '22',
      stat4Label: 'Team Members',
    },
    howItWorks: {
      subtitle: 'How It Works',
      heading: 'How Ditya Group Personalized Approach Works',
      description:
        'Ditya Group provides integrated solutions across finance, numerology, and all other essential services. Our personalized approach helps you make better decisions, simplify tasks, and grow faster with clarity.',
      step1Num: '01',
      step1Desc: 'Book a session with our expert team for guidance and planning.',
      step2Num: '02',
      step2Desc: 'Choose the service that best fits your personal or business needs.',
      step3Num: '03',
      step3Desc: 'Start your journey with structured support and see results quickly',
      testimonialQuote:
        '“Working with Ditya Group has been a game changer. Their guidance in trading, numerology, and business support made decision-making easier and more effective. Everything is well-managed and results are clearly visible. Truly worth the investment and their other services.”',
      testimonialAuthor: 'Aditya Malhotra',
    },
    whyChooseUs: {
      subtitle: 'Why Choose Us',
      heading: 'Why Choose US',
      description:
        'Ditya Group handles everything that slows down your growth journey. From financial guidance to essential services, we simplify your path so you can focus on achieving bigger goals. Let us manage what supports your success while you move ahead with clarity.',
      metric1Percent: '35%',
      metric1Title: 'Limited Growth Approach',
      metric1Desc:
        'Managing everything alone or relying on traditional methods can slow down decisions, reduce efficiency, and limit your true potential.',
      metric2Percent: '100%',
      metric2Title: 'Ditya Smart System',
      metric2Desc:
        'An integrated system of trading guidance, numerology insights, and essential services designed to give you clarity, speed, and complete growth support',
    },
    cta: {
      btnText: 'Free Consultation',
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
      secondaryPhone: '+995 555433091',
      secondaryPhoneLabel: 'Georgia Number',
      phoneHours: 'Mon–Sat 9:00 AM – 7:00 PM IST',
      email: 'groupditya@gmail.com',
      emailDesc: 'Prompt response within 24 hours',
      address:
        '3rd floor, 261, Sewa Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004',
    },
  },
  'ditya-wealth-house': {
    banner: {
      badge: 'Stock Market • F&O • Forex • Live Trading Support',
      title: 'Ditya Wealth House',
      subtitle:
        'What you do in trading matters deeply. How you enter and exit the market can have a strong impact on your profits and losses.',
    },
    details: {
      division: 'Ditya Trade Code',
      heading: 'What You Do In Trading Matters Deeply',
      description:
        'What you do in trading matters deeply. How you enter and exit the market can have a strong impact on your profits and losses. With the right guidance through Ditya Trade Code and numerology-based timing, you can understand trends, behavior, and opportunities while maintaining control in your decisions. The more aligned your strategy is, the more likely you are to achieve consistency and growth. When your approach is clear, it improves your overall trading journey.\n\nThis entire segment covers stock market, F&O, and forex where we provide live trading support, help in stuck trades, and complete guidance for better decisions.',
      overviewHeading: 'Overview Services',
      overviewDescription:
        'We are a multi-service company providing a variety of solutions including stock market guidance, numerology, software, and essential services. We support clients across different needs, whether it is a one-time consultation or long-term guidance based on their goals.',
      card1Title: 'Increase Growth',
      card1Desc: 'Working with Ditya Group leads to better clarity, stronger decisions, and overall business and personal success.',
      card2Title: 'Save Time',
      card2Desc: 'With Ditya Group, you can rely on structured support systems that reduce your workload and help you focus on growth.',
      checklistTitle: 'We can support you with a variety of services, such as:',
      checklists: [
        'Stock market and live trading guidance',
        'F&O and forex trading support',
        'Trade analysis and risk management',
        'Numerology and name correction',
        'Tarot card and astrology guidance',
        'Face reading and palm reading',
        'Vedic astrology insights',
        'Business and decision alignment',
        'Software and digital solutions',
        'Online doctor consultation access',
        'Math learning and academic support',
        'Coworking and productivity spaces',
        'Customer and client support',
        'Business consulting and strategy',
        'Financial and growth planning',
      ],
      ctaTitle: 'Not Enough Time In The Day? Give Us A Call',
      ctaDesc: 'We are available 24/7 to help you with any questions or concerns that you have about our products or services. You can contact us anytime and we will be happy to assist you.',
      ctaBtnText: 'Get Started',
    },
  },
  'global-business-network': {
    banner: {
      badge: 'Premier International Community',
      title: 'Global Business Network (GBN)',
      subtitle: 'Expand Your Reach. Connect with Industry Leaders Worldwide.',
    },
    intro: {
      tagline: 'Connect • Collaborate • Grow',
      heading: 'A Business Network Built Around Meaningful Relationships',
      description:
        'The Global Business Network is a premier community designed for ambitious entrepreneurs, executives, and business owners. We bridge the gap between local expertise and global opportunities by fostering powerful collaborations, sharing actionable market insights, and providing a trusted ecosystem for sustainable business growth.',
    },
    features: {
      card1Title: 'Strategic Networking',
      card1Desc:
        'Connect with high-net-worth individuals, investors, and elite professionals across international markets to build partnerships that matter.',
      card2Title: 'Global Market Insights',
      card2Desc:
        'Gain access to exclusive resources, trends, and strategies to help your business scale across borders seamlessly.',
      card3Title: 'Exclusive Events & Cohorts',
      card3Desc:
        'Participate in private networking events, mastermind sessions, and specialized cohorts (like the Elite Council) designed to accelerate your growth.',
    },
    tiers: {
      heading: 'Tailored Membership Tiers',
      subtitle: 'Select the networking circle aligned with your business scale and strategic ambitions.',
      tier1Title: 'GBN Circle',
      tier1Criteria: 'For businesses with ₹20 Lakh+ annual turnover',
      tier1Desc:
        'A structured business networking experience for entrepreneurs, professionals, and rising business leaders.',
      tier1Features: [
        'Curated online & physical networking sessions',
        'Official member business showcase presentations',
        'Direct business introductions & referral exchange',
        'Cross-industry collaboration opportunities',
        'Global business community connections',
      ],
      tier2Title: 'GBN Elite Council',
      tier2Criteria: 'For businesses with ₹5 Crore+ annual turnover',
      tier2Desc:
        'An exclusive, invite-only mastermind council for established enterprise leaders and visionary founders.',
      tier2Features: [
        'Private executive morning roundtables',
        'High-value strategic partnership introductions',
        'Confidential mastermind & scaling advisory',
        'Direct leadership-level peer networking',
        'Cross-border expansion and investment facilitation',
      ],
    },
    stats: {
      stat1Number: '500+',
      stat1Label: 'Vetted Business Leaders',
      stat2Number: '12+',
      stat2Label: 'Global Chapters & Hubs',
      stat3Number: '₹150Cr+',
      stat3Label: 'Closed Business Collaborations',
    },
    cta: {
      heading: 'Ready to Accelerate Your Global Reach?',
      description:
        'Join an elite circle of entrepreneurs and industry leaders creating cross-border impact. Apply for GBN Circle membership today.',
      btnText: 'Join the Network / Become a Member',
      btnLink: '/contact-us?service=GBN%20Circle',
    },
  },
  'ditya-astroverse': {
    banner: {
      badge: 'Numerology • Astrology • Tarot • Energy',
      title: 'Ditya Astroverse',
      subtitle:
        'What you carry in your name and numbers matters deeply.',
    },
    details: {
      division: 'Ditya Divine Code',
      heading: 'What You Carry In Your Name and Numbers Matters Deeply',
      description:
        'What you carry in your name and numbers matters deeply. How your energy is aligned can have a powerful impact on your life and business. With the right numerology guidance, you can understand your strengths, timing, and opportunities while creating balance in your decisions. The more aligned your energy is, the more likely you are to attract growth, clarity, and success. When your vibration is strong, it naturally enhances your personal and professional journey.\n\nThis entire segment is operated under Ditya Divine Code, where we also cover tarot card reading, astrology, face reading, palm reading, and Vedic astrology for complete spiritual guidance.',
      overviewHeading: 'Overview Services',
      overviewDescription:
        'We are a multi-service company providing a variety of solutions including stock market guidance, numerology, software, and essential services. We support clients across different needs, whether it is a one-time consultation or long-term guidance based on their goals.',
      card1Title: 'Increase Growth',
      card1Desc: 'Working with Ditya Group leads to better clarity, stronger decisions, and overall business and personal success.',
      card2Title: 'Save Time',
      card2Desc: 'With Ditya Group, you can rely on structured support systems that reduce your workload and help you focus on growth.',
      checklistTitle: 'We can support you with a variety of services, such as:',
      checklists: [
        'Numerology and name correction',
        'Tarot card and astrology guidance',
        'Face reading and palm reading',
        'Vedic astrology insights',
        'Business and decision alignment',
        'Stock market and trading support',
        'Software and digital solutions',
        'Online doctor consultation access',
        'Math learning and academic support',
        'Coworking and productivity spaces',
        'Customer and client support',
        'Business consulting and strategy',
        'Financial and growth planning',
      ],
      ctaTitle: 'Not Enough Time In The Day? Give Us A Call',
      ctaDesc: 'We are available 24/7 to help you with any questions or concerns that you have about our products or services. You can contact us anytime and we will be happy to assist you.',
      ctaBtnText: 'Get Started',
    },
  },
  'ditya-math-house': {
    banner: {
      badge: 'Concept Clarity • Academic Performance • Doubt Solving',
      title: 'Ditya Math House',
      subtitle:
        'What you learn in math matters deeply. How clearly you understand concepts can have a strong impact on your confidence and academic performance.',
    },
    details: {
      division: 'Ditya Math Code',
      heading: 'What You Learn In Math Matters Deeply',
      description:
        'What you learn in math matters deeply. How clearly you understand concepts can have a strong impact on your confidence and academic performance. With the right support under Ditya Math Code, you can improve clarity, problem-solving skills, and overall understanding while maintaining consistency in learning. The more aligned your practice is, the more likely you are to achieve better results and confidence. When your basics are strong, it improves your entire academic journey.\n\nThis entire segment covers math learning, doubt solving, and concept clarity where we provide structured support and complete guidance for better performance.',
      overviewHeading: 'Overview Services',
      overviewDescription:
        'We are a multi-service company providing a variety of solutions including stock market guidance, numerology, software, and essential services. We support clients across different needs, whether it is a one-time consultation or long-term guidance based on their goals.',
      card1Title: 'Increase Growth',
      card1Desc: 'Working with Ditya Group leads to better clarity, stronger decisions, and overall business and personal success.',
      card2Title: 'Save Time',
      card2Desc: 'With Ditya Group, you can rely on structured support systems that reduce your workload and help you focus on growth.',
      checklistTitle: 'We can support you with a variety of services, such as:',
      checklists: [
        'Math learning and concept clarity',
        'Doubt solving and practice support',
        'Academic performance improvement',
        'Structured learning guidance',
        'Stock market and live trading guidance',
        'Numerology and spiritual services',
        'Software and digital solutions',
        'Online doctor consultation access',
        'Coworking and productivity spaces',
        'Customer and client support',
        'Business consulting and strategy',
        'Financial and growth planning',
      ],
      ctaTitle: 'Not Enough Time In The Day? Give Us A Call',
      ctaDesc: 'We are available 24/7 to help you with any questions or concerns that you have about our products or services. You can contact us anytime and we will be happy to assist you.',
      ctaBtnText: 'Get Started',
    },
  },
  'ditya-business-house': {
    banner: {
      badge: 'Business Consultancy • Growth Planning • Strategic Support',
      title: 'Ditya Business House',
      subtitle:
        'What you decide in business matters deeply. How you plan, execute, and grow can have a strong impact on your success and long-term stability.',
    },
    details: {
      division: 'Business Consultancy & Growth Planning',
      heading: 'What You Decide In Business Matters Deeply',
      description:
        'What you decide in business matters deeply. How you plan, execute, and grow can have a strong impact on your success and long-term stability. With the right system under Ditya Business House, you can build clear strategies, improve decision-making, and identify the right opportunities while maintaining control in your operations. The more aligned your business approach is, the more likely you are to achieve consistent growth and results. When your direction is clear, it improves your overall business journey.\n\nThis entire segment covers business consultancy, growth planning, and strategic support where we provide expert guidance and complete assistance for better performance.',
      overviewHeading: 'Overview Services',
      overviewDescription:
        'We are a multi-service company providing a variety of solutions including stock market guidance, numerology, software, and essential services. We support clients across different needs, whether it is a one-time consultation or long-term guidance based on their goals.',
      card1Title: 'Increase Growth',
      card1Desc: 'Working with Ditya Group leads to better clarity, stronger decisions, and overall business and personal success.',
      card2Title: 'Save Time',
      card2Desc: 'With Ditya Group, you can rely on structured support systems that reduce your workload and help you focus on growth.',
      checklistTitle: 'We can support you with a variety of services, such as:',
      checklists: [
        'Business consultancy and growth planning',
        'Strategy building and execution support',
        'Decision-making and opportunity guidance',
        'Performance and business improvement',
        'Stock market and live trading guidance',
        'Numerology and spiritual services',
        'Software and digital solutions',
        'Online doctor consultation access',
        'Math learning and academic support',
        'Coworking and productivity spaces',
        'Customer and client support',
        'Financial and growth planning',
      ],
      ctaTitle: 'Not Enough Time In The Day? Give Us A Call',
      ctaDesc: 'We are available 24/7 to help you with any questions or concerns that you have about our products or services. You can contact us anytime and we will be happy to assist you.',
      ctaBtnText: 'Get Started',
    },
  },
  'ditya-trading-house': {
    banner: {
      badge: 'Learn • Trade • Grow',
      title: 'Ditya Trading House',
      subtitle:
        'Learn. Trade. Grow.',
    },
    details: {
      division: 'Trading Education & Market Understanding',
      heading: 'What You Learn About Trading & Financial Markets Matters Deeply',
      description:
        'What you learn about trading and financial markets matters deeply. How clearly you understand market behavior, risk management, and decision-making can have a strong impact on your trading journey and financial confidence. With the right support under Ditya Trading House, you can improve market understanding, trading discipline, and practical knowledge while maintaining consistency in learning.\n\nThe more structured your approach becomes, the more likely you are to develop better decision-making and stronger market awareness. When your foundation is strong, it improves your entire trading journey. This entire segment covers trading education, market understanding, live guidance, and practical learning where we provide structured support and complete guidance for better market awareness.',
      overviewHeading: 'Overview Services',
      overviewDescription:
        'We are a multi-service company providing a variety of solutions including stock market guidance, numerology, software, and essential services. We support clients across different needs, whether it is a one-time consultation or long-term guidance based on their goals.',
      card1Title: 'Increase Growth',
      card1Desc: 'Working with Ditya Group leads to better clarity, stronger decisions, and overall business and personal success.',
      card2Title: 'Save Time',
      card2Desc: 'With Ditya Group, you can rely on structured support systems that reduce your workload and help you focus on growth.',
      checklistTitle: 'We can support you with a variety of services, such as:',
      checklists: [
        'Coworking spaces and flexible seating',
        'Productivity and focused work zones',
        'Professional and collaborative environment',
        'Workspace management and support',
        'Stock market and live trading guidance',
        'Numerology and spiritual services',
        'Software and digital solutions',
        'Online doctor consultation access',
        'Math learning and academic support',
        'Customer and client support',
        'Business consulting and strategy',
        'Financial and growth planning',
      ],
      ctaTitle: 'Not Enough Time In The Day? Give Us A Call',
      ctaDesc: 'We are available 24/7 to help you with any questions or concerns that you have about our products or services. You can contact us anytime and we will be happy to assist you.',
      ctaBtnText: 'Get Started',
    },
  },
  'ditya-tech-house': {
    banner: {
      badge: 'Software Development • Automation • Systems Building',
      title: 'Ditya Tech House',
      subtitle:
        'What you build in technology matters deeply. How your systems and digital platforms perform can have a strong impact on your business growth and efficiency.',
    },
    details: {
      division: 'Ditya Quantum Code',
      heading: 'What You Build In Technology Matters Deeply',
      description:
        'What you build in technology matters deeply. How your systems and digital platforms perform can have a strong impact on your business growth and efficiency. With the right solutions under Ditya Quantum Code, you can understand systems, automation, and opportunities while maintaining control in your operations. The more aligned your technology is, the more likely you are to achieve consistency and growth. When your structure is strong, it improves your overall business journey.\n\nThis entire segment covers software development, automation, and digital solutions where we provide complete support, system building, and technical guidance for better performance.',
      overviewHeading: 'Overview Services',
      overviewDescription:
        'We are a multi-service company providing a variety of solutions including stock market guidance, numerology, software, and essential services. We support clients across different needs, whether it is a one-time consultation or long-term guidance based on their goals.',
      card1Title: 'Increase Growth',
      card1Desc: 'Working with Ditya Group leads to better clarity, stronger decisions, and overall business and personal success.',
      card2Title: 'Save Time',
      card2Desc: 'With Ditya Group, you can rely on structured support systems that reduce your workload and help you focus on growth.',
      checklistTitle: 'We can support you with a variety of services, such as:',
      checklists: [
        'Software development and system building',
        'Automation and technical support',
        'Website and application solutions',
        'Digital tools and business systems',
        'Stock market and live trading guidance',
        'Numerology and spiritual services',
        'Online doctor consultation access',
        'Math learning and academic support',
        'Coworking and productivity spaces',
        'Customer and client support',
        'Business consulting and strategy',
        'Financial and growth planning',
      ],
      ctaTitle: 'Not Enough Time In The Day? Give Us A Call',
      ctaDesc: 'We are available 24/7 to help you with any questions or concerns that you have about our products or services. You can contact us anytime and we will be happy to assist you.',
      ctaBtnText: 'Get Started',
    },
  },
  services: {
    banner: {
      badge: 'Integrated Solutions',
      title: 'Our Services & Houses',
      subtitle:
        'Explore our specialized Houses and bespoke service divisions designed to elevate your personal clarity, educational excellence, and business growth.',
    },
    intro: {
      heading: 'End-to-End Solutions Across Ancient Sciences & Modern Innovation',
      description:
        'Ditya Group unifies six core strategic Houses and specialized service sub-divisions. Browse our service lines below or schedule a private consultation.',
    },
  },
  'privacy-policy': {
    banner: {
      badge: 'Legal & Compliance',
      title: 'Privacy Policy',
      subtitle: 'Last Updated: September 2026 • Ditya Enterprises & Ditya Wealth Management PVT LTD',
    },
    content: {
      section1Title: '1. Introduction',
      section1Text:
        'Welcome to Ditya Group. We value your privacy and are committed to safeguarding the personal information you share with us through our website (dityagroup.com), service inquiries, consultation bookings, and communication channels.',
      section2Title: '2. Information We Collect',
      section2Text:
        'We collect personal identifiers including your full name, phone number, email address, city, service preferences, and message content when you request a free consultation, apply for GBN membership, enroll in trading or math programs, or subscribe to our newsletter.',
      section3Title: '3. How We Use Your Information',
      section3Text:
        'The information collected is used solely to provide consultation calls, tailor advisory sessions, deliver course access, process corporate inquiries, send critical security updates, and notify you about upcoming events and publications.',
      section4Title: '4. Data Protection & Confidentiality',
      section4Text:
        'We implement industry-standard encryption, secure HTTP-only cookies, and database access controls. We never sell, rent, or trade your personal information to third parties.',
      section5Title: '5. Contact Us Regarding Privacy',
      section5Text:
        'If you have questions regarding our privacy practices, please contact us at groupditya@gmail.com or visit our corporate headquarters in Jaipur, Rajasthan.',
    },
  },
  'terms-and-conditions': {
    banner: {
      badge: 'User Agreement',
      title: 'Terms & Conditions',
      subtitle: 'Please review the terms of service governing engagement with Ditya Group.',
    },
    content: {
      section1Title: '1. Acceptance of Terms',
      section1Text:
        'By accessing or using this website, submitting an inquiry, or engaging in services provided by Ditya Group and its subsidiaries, you acknowledge and agree to be bound by these Terms and Conditions.',
      section2Title: '2. Nature of Advisory Services',
      section2Text:
        'All consultations, including stock market education, numerology readings, business consulting, and mathematical coaching, are provided for educational, informational, and advisory purposes. Financial market decisions carry inherent risk.',
      section3Title: '3. Intellectual Property Rights',
      section3Text:
        'All curriculum materials, proprietary formulas, logos, branding, website graphics, and published articles are the exclusive intellectual property of Ditya Group. Reproduction without written consent is strictly prohibited.',
      section4Title: '4. User Conduct & Inquiries',
      section4Text:
        'Users agree to provide accurate, truthful contact information when requesting consultations or communicating with our advisory desk. Fraudulent or malicious submissions will result in immediate termination of access.',
      section5Title: '5. Governing Law & Jurisdiction',
      section5Text:
        'These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts of Jaipur, Rajasthan.',
    },
  },
};


