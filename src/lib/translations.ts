export type Language = 'en' | 'ka';

export interface Translations {
  [key: string]: {
    en: string;
    ka: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    ka: 'მთავარი',
  },
  'nav.about': {
    en: 'About Us',
    ka: 'ჩვენს შესახებ',
  },
  'nav.services': {
    en: 'Services',
    ka: 'სერვისები',
  },
  'nav.contact': {
    en: 'Contact Us',
    ka: 'კონტაქტი',
  },
  'nav.blog': {
    en: 'Blog & Insights',
    ka: 'ბლოგი & სიახლეები',
  },
  'nav.gbn': {
    en: 'Global Business Network',
    ka: 'გლობალური ბიზნეს ქსელი',
  },
  'nav.houses_header': {
    en: 'Our Houses & Network',
    ka: 'ჩვენი ჰაუსები & ქსელი',
  },
  'nav.free_consultation': {
    en: 'Free Consultation',
    ka: 'უფასო კონსულტაცია',
  },
  'nav.consultation': {
    en: 'Consultation',
    ka: 'კონსულტაცია',
  },

  // Houses Names
  'house.wealth': {
    en: 'Ditya Wealth House',
    ka: 'დითია ველს ჰაუსი',
  },
  'house.astroverse': {
    en: 'Ditya Astroverse',
    ka: 'დითია ასტროვერსი',
  },
  'house.math': {
    en: 'Ditya Math House',
    ka: 'დითია მათემატიკის ჰაუსი',
  },
  'house.business': {
    en: 'Ditya Business House',
    ka: 'დითია ბიზნეს ჰაუსი',
  },
  'house.trading': {
    en: 'Ditya Trading House',
    ka: 'დითია თრეიდინგ ჰაუსი',
  },
  'house.tech': {
    en: 'Ditya Tech House',
    ka: 'დითია ტექ ჰაუსი',
  },
  'house.gbn': {
    en: 'Global Business Network',
    ka: 'გლობალური ბიზნეს ქსელი',
  },

  // TopBar
  'topbar.email': {
    en: 'groupditya@gmail.com',
    ka: 'groupditya@gmail.com',
  },
  'topbar.address': {
    en: '3rd floor, 261, Adarsh Nagar, Jaipur, Rajasthan',
    ka: 'მე-3 სართული, 261, ადარშ ნაგარი, ჯაიპური, რაჯასტანი',
  },

  // Common Actions
  'action.get_started': {
    en: 'Get Started',
    ka: 'დაწყება',
  },
  'action.explore_services': {
    en: 'Explore Our Services',
    ka: 'სერვისების დათვალიერება',
  },
  'action.learn_more': {
    en: 'Learn More',
    ka: 'გაიგეთ მეტი',
  },
  'action.send': {
    en: 'Send',
    ka: 'გაგზავნა',
  },
  'action.submit': {
    en: 'Submit Request',
    ka: 'მოთხოვნის გაგზავნა',
  },
  'action.book_call': {
    en: 'Book A Free Call',
    ka: 'უფასო ზარის დაჯავშნა',
  },
  'action.join_network': {
    en: 'Join the Network',
    ka: 'ქსელში გაწევრიანება',
  },
  'action.apply_now': {
    en: 'Apply Now',
    ka: 'განაცხადის შეტანა',
  },
  'action.subscribe': {
    en: 'Subscribe',
    ka: 'გამოწერა',
  },
  'action.back_to_top': {
    en: 'Back to top',
    ka: 'ზემოთ დაბრუნება',
  },

  // Consultation Modal
  'modal.title': {
    en: 'Book Your Free Consultation',
    ka: 'დაჯავშნეთ უფასო კონსულტაცია',
  },
  'modal.subtitle': {
    en: 'Connect directly with our senior advisors across trading, numerology, business scaling, or tech solutions.',
    ka: 'დაუკავშირდით ჩვენს უფროს მრჩევლებს თრეიდინგის, ნუმეროლოგიის, ბიზნესის ზრდის ან ტექნოლოგიური გადაწყვეტილებების საკითხებზე.',
  },
  'modal.full_name': {
    en: 'Full Name',
    ka: 'სრული სახელი',
  },
  'modal.full_name_placeholder': {
    en: 'e.g. Rahul Sharma / Giorgi Beridze',
    ka: 'მაგ. გიორგი ბერიძე',
  },
  'modal.phone': {
    en: 'Phone Number (with country code)',
    ka: 'ტელეფონის ნომერი (ქვეყნის კოდით)',
  },
  'modal.phone_placeholder': {
    en: '+91 93510 90301 / +995 555 433 091',
    ka: '+995 555 433 091 / +91 93510 90301',
  },
  'modal.email': {
    en: 'Email Address',
    ka: 'ელექტრონული ფოსტა',
  },
  'modal.email_placeholder': {
    en: 'you@example.com',
    ka: 'you@example.com',
  },
  'modal.service': {
    en: 'Select Interested House / Service',
    ka: 'აირჩიეთ სასურველი ჰაუსი / სერვისი',
  },
  'modal.service_default': {
    en: '-- Choose a service --',
    ka: '-- აირჩიეთ სერვისი --',
  },
  'modal.notes': {
    en: 'Additional Details (Optional)',
    ka: 'დამატებითი დეტალები (არასავალდებულო)',
  },
  'modal.notes_placeholder': {
    en: 'Tell us about your portfolio, goals, stuck trades, or questions...',
    ka: 'მოგვიყევით თქვენი მიზნების, პორტფელის ან შეკითხვების შესახებ...',
  },
  'modal.submitting': {
    en: 'Submitting Inquiry...',
    ka: 'იგზავნება მოთხოვნა...',
  },
  'modal.submit_btn': {
    en: 'Confirm & Schedule Discovery Call',
    ka: 'დადასტურება & ზარის დაგეგმვა',
  },
  'modal.success_title': {
    en: 'Consultation Request Received!',
    ka: 'კონსულტაციის მოთხოვნა მიღებულია!',
  },
  'modal.success_desc': {
    en: 'Thank you for connecting with Ditya Group. Our executive team will reach out via WhatsApp or phone call within 24 business hours.',
    ka: 'გმადლობთ Ditya Group-თან დაკავშირებისთვის. ჩვენი გუნდი დაგიკავშირდებათ WhatsApp-ით ან სატელეფონო ზარით 24 საათის განმავლობაში.',
  },

  // Contact Cards & Footer
  'footer.call_title': {
    en: 'Give Us A Call',
    ka: 'დაგვიკავშირდით',
  },
  'footer.india_hq': {
    en: 'India (HQ)',
    ka: 'ინდოეთი (სათაო ოფისი)',
  },
  'footer.georgia_office': {
    en: 'Georgia (Secondary)',
    ka: 'საქართველო (ფილიალი)',
  },
  'footer.hours': {
    en: 'Mon – Sat, 9:00 AM – 7:00 PM IST',
    ka: 'ორშ – შაბ, 9:00 - 19:00 IST',
  },
  'footer.email_title': {
    en: 'Drop Us A Line',
    ka: 'მოგვწერეთ',
  },
  'footer.email_response': {
    en: 'Direct Executive Response',
    ka: 'სწრაფი ოფიციალური პასუხი',
  },
  'footer.location_title': {
    en: 'Office Location',
    ka: 'ოფისის მისამართი',
  },
  'footer.location_city': {
    en: 'Jaipur, Rajasthan, India & Tbilisi, Georgia',
    ka: 'ჯაიპური, რაჯასტანი, ინდოეთი & თბილისი, საქართველო',
  },
  'footer.quick_links': {
    en: 'Quick Links',
    ka: 'სწრაფი ბმულები',
  },
  'footer.houses_network': {
    en: 'Houses & Network',
    ka: 'ჰაუსები & ქსელი',
  },
  'footer.newsletter': {
    en: 'Newsletter',
    ka: 'საინფორმაციო ბიულეტენი',
  },
  'footer.newsletter_placeholder': {
    en: 'Enter your email...',
    ka: 'შეიყვანეთ ელ.ფოსტა...',
  },
  'footer.privacy_policy': {
    en: 'Privacy Policy',
    ka: 'კონფიდენციალურობა',
  },
  'footer.terms': {
    en: 'Terms',
    ka: 'წესები & პირობები',
  },
  'footer.admin': {
    en: 'Admin',
    ka: 'ადმინი',
  },
  'footer.credo': {
    en: 'Ancient Wisdom & Modern Solutions',
    ka: 'უძველესი სიბრძნე & თანამედროვე გადაწყვეტილებები',
  },

  // Language & Theme Switcher Tooltips
  'switcher.language': {
    en: 'Change language to Georgian',
    ka: 'ენის შეცვლა ინგლისურად',
  },
  'switcher.theme_dark': {
    en: 'Switch to Dark Mode',
    ka: 'მუქი რეჟიმის ჩართვა',
  },
  'switcher.theme_light': {
    en: 'Switch to Light Mode',
    ka: 'ნათელი რეჟიმის ჩართვა',
  },
  'switcher.english': {
    en: 'English',
    ka: 'English',
  },
  'switcher.georgian': {
    en: 'ქართული',
    ka: 'ქართული',
  },
};

export function getTranslation(key: string, lang: Language, fallback?: string): string {
  const item = TRANSLATIONS[key];
  if (!item) return fallback || key;
  return item[lang] || item['en'] || fallback || key;
}

