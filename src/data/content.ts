import { MenuItem, ButcherCut, ReviewItem, VideoItem } from '../types/steakholders';

export const BRAND_INFO = {
  name: 'Steakholders',
  tagline: 'The people’s Steak-away',
  badge: 'Specialist Steak & Chips',
  story: 'Established in London, now in Birmingham. We serve some of the best reviewed steak & chips meals in the UK. Specialist Steak & Chips — cooked, assembled and served with love. A family-run business.',
  origin: 'Established in London, now in Birmingham',
  currentHub: 'Steakholders - Unit 7, 133 Weston Lane, Tyseley, Birmingham, B11 3RR',
  fullAddress: 'Steakholders - Unit 7, 133 Weston Lane, Tyseley, Birmingham, B11 3RR',
  shortAddress: 'Steakholders - B11 3RR',
  birminghamPostcode: 'B11 3RR',
  email: 'elsteakholder@gmail.com',
  instagram: 'https://www.instagram.com/steakholders_/',
  instagramHandle: '@steakholders_',
  whatsappCommunity: 'https://chat.whatsapp.com/GaV7aQPDpT7HF5zBqg0U62?mode=gi_t',
  jotformReserve: 'https://form.jotform.com/262075120404040',
  jotformBirmingham: 'https://form.jotform.com/261725428536058',
  jotformShop: 'https://form.jotform.com/262075959022056',
  googleBusinessLink: 'https://share.google/yYiMISc22yNglwFAt',
  googleRating: 4.9,
  googleReviewCount: 33,
  openingHours: 'Every Weekend 17:00 - 22:30',
  serviceTiming: 'Every Weekend 17:00 - 22:30',
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'box-sirloin',
    name: 'The Signature Sirloin Box',
    badge: 'Best Seller',
    cutType: 'sirloin',
    description: 'Perfectly tender 28-day aged British Angus Sirloin, seared over screaming high heat, carved into thick pink medallions over hand-cut golden crunch chips. Finished with fresh house chimichurri and the secret Steakholders savory crunch garnish.',
    price: 15.00,
    image: 'https://i.ibb.co/VY6XcMtn/steakmain.jpg',
    details: [
      'Prime Angus Sirloin (200g)',
      'Double-cooked crispy exterior, fluffy interior chips',
      'Freshly whisked herb chimichurri drizzle',
      'Signature secret Steakholders Garnish topping'
    ]
  },
  {
    id: 'box-ribeye',
    name: 'Prime Ribeye Experience Box',
    badge: 'Chef Upgrade',
    cutType: 'ribeye',
    description: 'Upgrade your box to ultra-marbled Prime Ribeye. Exceptional intramuscular fat melting into the crust for the ultimate rich, melt-in-your-mouth Steakholder experience.',
    price: 19.00,
    image: '/assets/steakholders/steak_close_up.jpg',
    details: [
      'Prime Angus Ribeye with intense marbling (220g)',
      'Hand-crafted chips tossed in artisanal seasoning',
      'Signature Chimichurri & aromatic butter glaze',
      'Steakholders secret texture garnish'
    ]
  },
  {
    id: 'collab-matcha',
    name: 'Mis-Matcha x Steakholders Collab Latte',
    badge: 'Limited Collab',
    cutType: 'beverage',
    description: 'Exclusive partnership with Mis-Matcha: Pure first-harvest ceremonial Japanese stone-ground matcha layered over velvety chilled milk. Earthy, silky, and the ideal vibrant palate cleanser.',
    price: 5.00,
    image: 'https://i.ibb.co/DDc47n4C/matcha.jpg',
    details: [
      'Ceremonial stone-ground green tea leaves',
      'Velvety cold whole or oat milk base',
      'Subtle natural sweetness with zero artificial syrups',
      'Crafted in limited weekend batches'
    ]
  },
  {
    id: 'iced-mojito',
    name: 'Steakholders Iced Mint Mojito',
    badge: 'House Refreshment',
    cutType: 'beverage',
    description: 'Freshly muddled garden mint, freshly squeezed Persian lime juice, and fine cane sugar over crushed ice, topped with sparkling botanical soda. Ultra refreshing alongside hot rich steak.',
    price: 4.50,
    image: 'https://i.ibb.co/fdbdrctc/mojitohome.jpg',
    details: [
      'Hand-muddled fresh English mint leaves',
      'Cold-pressed zesty lime juice',
      'Crisp effervescent finish',
      'Zero alcohol, 100% natural rejuvenation'
    ]
  },
  {
    id: 'extra-steak',
    name: 'Double Steak Portion Addition',
    cutType: 'addon',
    description: 'Add an extra 150g portion of carved tender Angus steak to your box, doused in extra chimichurri.',
    price: 7.00,
    image: '/assets/steakholders/steak_close_up.jpg',
    details: ['Extra 150g sliced steak', 'Extra chimichurri & crunch garnish']
  }
];

export const BUTCHER_CUTS: ButcherCut[] = [
  {
    id: 'raw-ribeye-prime',
    title: 'Ribeye | HMC Prime (Raw Cut)',
    weight: '~300-350g thick cut',
    price: 18.00,
    cert: '100% HMC Certified Halal',
    description: 'Price is per kg. Each cut is around 300-350g, nicely thick cut. Final price based on exact weight (maybe +/-100g). Vacuum packed & sealed for longer life.',
    marblingScore: 'Prime Intramuscular Marbling',
    recommendedCooking: 'Smoking hot cast iron, render fat-cap first, 2.5 min each side, rest 6 min.',
    image: 'https://www.jotform.com/uploads/Thesteakholders/form_files/1000289842_d8aa4bc25a943fda3bf82f90504a9255.jpg'
  },
  {
    id: 'preseasoned-ribeye-prime',
    title: 'Pre-seasoned Ribeye | HMC Prime',
    weight: '~300-350g thick cut',
    price: 19.00,
    cert: '100% HMC Certified Halal',
    description: 'Price is per kg. Each cut is around 300-350g, nicely thick cut. Final price based on exact weight (maybe +/-100g). Vacuum packed & sealed for longer life.',
    marblingScore: 'Chef Marinated · Prime Marbled',
    recommendedCooking: 'Sear untouched 2.5 min each side on screaming iron, baste with foaming butter, rest 5 min.',
    image: 'https://www.jotform.com/uploads/Thesteakholders/form_files/whatsapp_image_2026_03_23_at_10_19_06_d301229a75102a6d67963489c4388d16.jpeg'
  },
  {
    id: 'raw-sirloin-angus',
    title: 'Sirloin | HMC Angus (Raw Cut)',
    weight: '~300-350g thick cut',
    price: 14.00,
    cert: '100% HMC Certified Halal',
    description: 'Price is per kg. Each cut is around 300-350g, nicely thick cut. Final price based on exact weight (maybe +/-100g). Vacuum packed & sealed for longer life.',
    marblingScore: '28-Day Dry Aged · Angus Grade A+',
    recommendedCooking: 'Pan sear in screaming hot iron: 2-3 min each side with butter & garlic baste, rest 4 min.',
    image: 'https://www.jotform.com/uploads/Thesteakholders/form_files/whatsapp_image_2026_03_23_at_10_19_07_c60d52f56a3eb00fc430d0a8d75d9b50.jpeg'
  },
  {
    id: 'preseasoned-sirloin-angus',
    title: 'Pre-seasoned Sirloin | HMC Angus',
    weight: '~300-350g thick cut',
    price: 15.00,
    cert: '100% HMC Certified Halal',
    description: 'Price is per kg. Each cut is around 300-350g, nicely thick cut. Final price based on exact weight (maybe +/-100g). Vacuum packed & sealed for longer life.',
    marblingScore: 'Chef Marinated · Angus Grade A+',
    recommendedCooking: 'Screaming hot iron sear: 2.5 min each side, rest 4 min on a warm board before carving.',
    image: 'https://www.jotform.com/uploads/Thesteakholders/form_files/whatsapp_image_2026_03_23_at_10_19_06_1_45c333698cf9e680afdf7799e9c1a976.jpeg'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'g-rev-1',
    image: '/assets/steakholders/review_quote_bg_1.jpg',
    quote: 'Literally the best steak and chips in Birmingham! Got the Ribeye box cooked medium rare and it was melt-in-the-mouth tender. The chimichurri adds such a vibrant fresh kick and the seasoning crunch on the chips is unbeatable. Collected piping hot from Unit 7. 10/10.',
    author: 'Hamza Khan',
    badge: 'Local Guide · 24 reviews',
    date: '3 weeks ago',
    orderType: 'Takeaway · Prime Angus Ribeye Box',
    location: 'Birmingham',
    rating: 5,
    highlight: 'Melt-in-the-mouth Ribeye',
    initials: 'HK',
    avatarBg: '#8b5cf6',
    dishRecommended: 'The Prime Ribeye Box, Chimichurri & Crunch Garnish'
  },
  {
    id: 'g-rev-2',
    image: '/assets/steakholders/review_quote_bg_2.jpg',
    quote: 'We drove up from London having followed them since they first started. The Angus beef quality has stayed remarkable — proper high-grade HMC steak with that screaming hot sear. The iced Mis-Matcha drink was a brilliant pairing. Abdullah and the team run this with pure passion.',
    author: 'Zainab Patel',
    badge: 'Local Guide · 18 reviews',
    date: '1 month ago',
    orderType: 'Collection · Sirloin Box & Mis-Matcha Collab',
    location: 'Visited from London',
    rating: 5,
    highlight: 'London to Birmingham',
    initials: 'ZP',
    avatarBg: '#ec4899',
    dishRecommended: 'Signature Sirloin Box & Matcha Collab'
  },
  {
    id: 'g-rev-3',
    image: '/assets/steakholders/review_quote_bg_3.jpg',
    quote: '“A truly unique steak experience you genuinely will never forget”. Finding restaurant quality steak cooked to this precision in a takeaway box is virtually impossible anywhere else. Double-fried chips stay crisp, garlic glaze is rich, and the chimichurri is authentic.',
    author: 'Tariq Mahmood',
    badge: 'Verified Google Reviewer',
    date: '2 weeks ago',
    orderType: 'Takeaway · Double Steakholder Box',
    location: 'Birmingham',
    rating: 5,
    highlight: 'Flawless Precision',
    initials: 'TM',
    avatarBg: '#3b82f6',
    dishRecommended: 'Double Steakholder Box (Sirloin & Ribeye)'
  },
  {
    id: 'g-rev-4',
    image: '/assets/steakholders/review_quote_bg_4.jpg',
    quote: '10/10 consistency every weekend. Meat is juicy, deeply caramelized on the crust, and seasoned with real craftsmanship. Super organized collection process at the Weston Lane unit. So proud to have this in the Midlands.',
    author: 'Bilal Hussain',
    badge: 'Local Guide · 31 reviews',
    date: '2 months ago',
    orderType: 'Weekend Collection · Angus Sirloin Box',
    location: 'Tyseley Regular',
    rating: 5,
    highlight: '10/10 Consistency',
    initials: 'BH',
    avatarBg: '#10b981',
    dishRecommended: 'The Signature Sirloin Box'
  },
  {
    id: 'g-rev-5',
    image: '/assets/steakholders/review_quote_bg_5.jpg',
    quote: 'Ordered boxes for family dinner and picked up raw Angus ribeyes from their butcher counter to sear at home on Sunday. The marbling is phenomenal. Premium HMC halal beef at honest prices. Family owned and it truly shows in the warmth.',
    author: 'Aisha Malik',
    badge: 'Verified Google Reviewer',
    date: 'Last month',
    orderType: 'Dine / Takeaway · Butcher Shop Cuts & Box',
    location: 'Birmingham',
    rating: 5,
    highlight: 'Exceptional Angus Marbling',
    initials: 'AM',
    avatarBg: '#f59e0b',
    dishRecommended: 'Raw Angus Ribeye (Butcher Cut) & Box'
  },
  {
    id: 'g-rev-6',
    image: '/assets/steakholders/review_quote_bg_6.jpg',
    quote: 'Unbelievable flavour profile! The house crunch garnish sprinkled over the hot chips with the chimichurri sauce is an absolute game-changer. You cannot compare this to standard takeout — this is gourmet culinary craft.',
    author: 'Farhan D.',
    badge: 'Local Guide · 15 reviews',
    date: '3 months ago',
    orderType: 'Takeaway Collection · Ribeye Special',
    location: 'Birmingham',
    rating: 5,
    highlight: 'House Crunch Game-Changer',
    initials: 'FD',
    avatarBg: '#06b6d4',
    dishRecommended: 'The Signature Crunch Garnish & Ribeye'
  }
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'reel-sizzle',
    title: 'The Art of the Sear & Sizzle',
    subtitle: 'From smoking hot iron to the golden box',
    src: '/assets/steakholders/steak_reel_2.mp4',
    description: 'Watch the high heat sear, torch finish, and precise carving of our signature Angus steaks.'
  },
  {
    id: 'reel-plating',
    title: 'The Chimichurri Pour',
    subtitle: 'Fresh herbs, crunchy chips, tender beef',
    src: '/assets/steakholders/steak_reel_1.mp4',
    description: 'Every box is cooked, assembled and served with love right in front of your eyes.'
  }
];
