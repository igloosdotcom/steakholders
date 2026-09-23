export interface MenuItem {
  id: string;
  name: string;
  badge?: string;
  cutType: 'sirloin' | 'ribeye' | 'beverage' | 'addon';
  description: string;
  price: number;
  image: string;
  details: string[];
}

export interface ButcherCut {
  id: string;
  title: string;
  weight: string;
  price: number;
  cert: string;
  description: string;
  marblingScore: string;
  recommendedCooking: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  image?: string;
  quote: string;
  author: string;
  location?: string;
  badge?: string;
  date?: string;
  orderType?: string;
  rating: number;
  highlight: string;
  likes?: number;
  initials?: string;
  avatarBg?: string;
  dishRecommended?: string;
}

export interface OrderItem {
  itemId: string;
  name: string;
  cutType: string;
  doneness: 'Rare' | 'Medium Rare' | 'Medium' | 'Well Done';
  quantity: number;
  unitPrice: number;
  sauce: string;
  extraSteak: boolean;
  selectedDrinks: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle?: string;
  src: string;
  description: string;
  isInstagram?: boolean;
  instagramUrl?: string;
}

