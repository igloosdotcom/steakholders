export type OrderStatus = 'confirmed' | 'preparing' | 'ready' | 'collected' | 'cancelled';

export interface OrderItemEntry {
  id: string;
  name: string;
  cutType?: string;
  quantity: number;
  unitPrice: number;
}

export interface AdminOrder {
  id: string; // e.g. "SH-8421"
  createdAt: string; // ISO date
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  day: 'friday' | 'saturday' | 'sunday';
  timeSlot: string; // e.g. "18:30"
  status: OrderStatus;
  doneness: 'Rare' | 'Medium Rare' | 'Medium' | 'Well Done';
  sauce: string;
  specialNotes?: string;
  items: OrderItemEntry[];
  subtotal: number;
  paymentMethod: 'Collection Payment' | 'Pre-paid Card' | 'Bank Transfer';
  isVip?: boolean;
}

const STORAGE_KEY = 'steakholders_orders_db_v1';
const AUTH_KEY = 'steakholders_admin_auth_v1';

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'SH-8421',
    createdAt: '2026-09-29T14:15:00.000Z',
    guestName: 'Hamza Khan',
    guestPhone: '07412 889234',
    guestEmail: 'hamza.k@gmail.com',
    day: 'friday',
    timeSlot: '17:30',
    status: 'ready',
    doneness: 'Medium Rare',
    sauce: 'House Chimichurri',
    specialNotes: 'Extra crispy house crunch on the chips please.',
    items: [
      { id: 'sig-sirloin', name: 'The Signature Sirloin Box', cutType: 'sirloin', quantity: 2, unitPrice: 15.00 },
      { id: 'matcha-collab', name: 'Mis-Matcha Iced Latte Collab', cutType: 'beverage', quantity: 2, unitPrice: 5.00 }
    ],
    subtotal: 40.00,
    paymentMethod: 'Collection Payment',
    isVip: true
  },
  {
    id: 'SH-8422',
    createdAt: '2026-09-29T14:30:00.000Z',
    guestName: 'Zainab Ahmed',
    guestPhone: '07891 234567',
    guestEmail: 'zainab.a@outlook.com',
    day: 'friday',
    timeSlot: '18:00',
    status: 'preparing',
    doneness: 'Medium Rare',
    sauce: 'Truffle Mayo',
    specialNotes: 'Traveling from Solihull, will collect promptly at 18:00.',
    items: [
      { id: 'prime-ribeye', name: 'The Prime Ribeye Box', cutType: 'ribeye', quantity: 2, unitPrice: 19.00 },
      { id: 'sh-mojito', name: 'Steakholders Fresh Mint Mojito', cutType: 'beverage', quantity: 1, unitPrice: 4.50 }
    ],
    subtotal: 42.50,
    paymentMethod: 'Pre-paid Card',
    isVip: true
  },
  {
    id: 'SH-8423',
    createdAt: '2026-09-29T15:00:00.000Z',
    guestName: 'Bilal Hussain',
    guestPhone: '07722 456789',
    guestEmail: 'bilal.h@tyseley.co.uk',
    day: 'friday',
    timeSlot: '18:30',
    status: 'confirmed',
    doneness: 'Medium',
    sauce: 'Peppercorn sauce',
    specialNotes: 'Weston Lane local regular.',
    items: [
      { id: 'double-box', name: 'The Double Steakholder Box', cutType: 'sirloin', quantity: 1, unitPrice: 28.00 }
    ],
    subtotal: 28.00,
    paymentMethod: 'Collection Payment'
  },
  {
    id: 'SH-8424',
    createdAt: '2026-09-29T15:20:00.000Z',
    guestName: 'Aisha Malik',
    guestPhone: '07543 987654',
    guestEmail: 'aisha.m@gmail.com',
    day: 'saturday',
    timeSlot: '17:00',
    status: 'confirmed',
    doneness: 'Medium Rare',
    sauce: 'House Chimichurri',
    specialNotes: 'Family dinner booking. Also picking up butcher cut for Sunday.',
    items: [
      { id: 'prime-ribeye', name: 'The Prime Ribeye Box', cutType: 'ribeye', quantity: 3, unitPrice: 19.00 },
      { id: 'raw-ribeye-angus', name: 'Ribeye | HMC Angus (Raw Cut)', cutType: 'addon', quantity: 2, unitPrice: 18.00 }
    ],
    subtotal: 93.00,
    paymentMethod: 'Collection Payment',
    isVip: true
  },
  {
    id: 'SH-8425',
    createdAt: '2026-09-29T15:45:00.000Z',
    guestName: 'David Fletcher',
    guestPhone: '07987 654321',
    guestEmail: 'dave.fletcher@gmail.com',
    day: 'saturday',
    timeSlot: '19:00',
    status: 'confirmed',
    doneness: 'Rare',
    sauce: 'House Chimichurri',
    specialNotes: 'First time trying Steakholders after watching the TikTok reel.',
    items: [
      { id: 'sig-sirloin', name: 'The Signature Sirloin Box', cutType: 'sirloin', quantity: 1, unitPrice: 15.00 },
      { id: 'prime-ribeye', name: 'The Prime Ribeye Box', cutType: 'ribeye', quantity: 1, unitPrice: 19.00 }
    ],
    subtotal: 34.00,
    paymentMethod: 'Collection Payment'
  },
  {
    id: 'SH-8426',
    createdAt: '2026-09-29T16:00:00.000Z',
    guestName: 'Mohammed Qureshi',
    guestPhone: '07432 112233',
    guestEmail: 'm.qureshi@bham.ac.uk',
    day: 'saturday',
    timeSlot: '19:30',
    status: 'confirmed',
    doneness: 'Well Done',
    sauce: 'Garlic Butter Glaze',
    specialNotes: 'Please slice thinner medallions for well done as per chef standard.',
    items: [
      { id: 'sig-sirloin', name: 'The Signature Sirloin Box', cutType: 'sirloin', quantity: 2, unitPrice: 15.00 }
    ],
    subtotal: 30.00,
    paymentMethod: 'Collection Payment'
  },
  {
    id: 'SH-8427',
    createdAt: '2026-09-29T16:10:00.000Z',
    guestName: 'Farhan Din',
    guestPhone: '07876 543210',
    guestEmail: 'farhan.din@sky.com',
    day: 'sunday',
    timeSlot: '17:30',
    status: 'confirmed',
    doneness: 'Medium Rare',
    sauce: 'House Chimichurri',
    specialNotes: 'Sundays with family. Bringing 2 guests.',
    items: [
      { id: 'prime-ribeye', name: 'The Prime Ribeye Box', cutType: 'ribeye', quantity: 2, unitPrice: 19.00 },
      { id: 'sig-sirloin', name: 'The Signature Sirloin Box', cutType: 'sirloin', quantity: 1, unitPrice: 15.00 },
      { id: 'matcha-collab', name: 'Mis-Matcha Iced Latte Collab', cutType: 'beverage', quantity: 3, unitPrice: 5.00 }
    ],
    subtotal: 68.00,
    paymentMethod: 'Collection Payment',
    isVip: true
  },
  {
    id: 'SH-8428',
    createdAt: '2026-09-29T16:25:00.000Z',
    guestName: 'Usman Tariq',
    guestPhone: '07555 123456',
    guestEmail: 'usman.t@icloud.com',
    day: 'sunday',
    timeSlot: '18:00',
    status: 'confirmed',
    doneness: 'Medium Rare',
    sauce: 'Truffle Mayo',
    specialNotes: '',
    items: [
      { id: 'double-box', name: 'The Double Steakholder Box', cutType: 'sirloin', quantity: 1, unitPrice: 28.00 },
      { id: 'sh-mojito', name: 'Steakholders Fresh Mint Mojito', cutType: 'beverage', quantity: 2, unitPrice: 4.50 }
    ],
    subtotal: 37.00,
    paymentMethod: 'Collection Payment'
  },
  {
    id: 'SH-8420',
    createdAt: '2026-09-29T13:40:00.000Z',
    guestName: 'Yusuf Patel',
    guestPhone: '07333 444555',
    guestEmail: 'yusuf.p@gmail.com',
    day: 'friday',
    timeSlot: '17:00',
    status: 'collected',
    doneness: 'Medium Rare',
    sauce: 'House Chimichurri',
    specialNotes: 'Collected hot at 17:05.',
    items: [
      { id: 'sig-sirloin', name: 'The Signature Sirloin Box', cutType: 'sirloin', quantity: 1, unitPrice: 15.00 }
    ],
    subtotal: 15.00,
    paymentMethod: 'Collection Payment'
  }
];

export const getStoredOrders = (): AdminOrder[] => {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_ORDERS;
  }
};

export const saveStoredOrders = (orders: AdminOrder[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('steakholders_orders_updated'));
  } catch (e) {
    console.error('Failed to save orders:', e);
  }
};

export const addStoredOrder = (order: AdminOrder): void => {
  const current = getStoredOrders();
  const updated = [order, ...current];
  saveStoredOrders(updated);
};

export const updateStoredOrderStatus = (orderId: string, status: OrderStatus): void => {
  const current = getStoredOrders();
  const updated = current.map(o => o.id === orderId ? { ...o, status } : o);
  saveStoredOrders(updated);
};

export const deleteStoredOrder = (orderId: string): void => {
  const current = getStoredOrders();
  const updated = current.filter(o => o.id !== orderId);
  saveStoredOrders(updated);
};

export const resetStoredOrders = (): void => {
  saveStoredOrders(INITIAL_ORDERS);
};

export const checkAdminAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'authenticated';
};

export const setAdminAuth = (auth: boolean): void => {
  if (typeof window === 'undefined') return;
  if (auth) {
    sessionStorage.setItem(AUTH_KEY, 'authenticated');
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
};
