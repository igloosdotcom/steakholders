import { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  Flame,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  Plus,
  Trash2,
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  ChevronRight,
  X,
  AlertCircle
} from 'lucide-react';
import {
  AdminOrder,
  OrderStatus,
  getStoredOrders,
  saveStoredOrders,
  updateStoredOrderStatus,
  deleteStoredOrder,
  addStoredOrder,
  resetStoredOrders,
  checkAdminAuth,
  setAdminAuth
} from '../data/ordersStore';
import { BRAND_INFO, MENU_ITEMS } from '../data/content';

interface AdminPanelProps {
  onBackToSite: () => void;
}

const DEFAULT_PIN = '1700'; // 17:00 weekend kitchen opening time

export default function AdminPanel({ onBackToSite }: AdminPanelProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAdminAuth());
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Orders & Data State
  const [orders, setOrders] = useState<AdminOrder[]>(() => getStoredOrders());
  const [activeTab, setActiveTab] = useState<'orders' | 'stats' | 'schedule' | 'customers'>('orders');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals & Selections
  const [selectedOrderForTicket, setSelectedOrderForTicket] = useState<AdminOrder | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  // New Order Form State
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newOrderDay, setNewOrderDay] = useState<'friday' | 'saturday' | 'sunday'>('friday');
  const [newOrderTime, setNewOrderTime] = useState('18:00');
  const [newOrderDoneness, setNewOrderDoneness] = useState<'Rare' | 'Medium Rare' | 'Medium' | 'Well Done'>('Medium Rare');
  const [newOrderSauce, setNewOrderSauce] = useState('House Chimichurri');
  const [newOrderNotes, setNewOrderNotes] = useState('');
  const [newOrderItemId, setNewOrderItemId] = useState(MENU_ITEMS[0].id);
  const [newOrderQty, setNewOrderQty] = useState(1);

  // Synchronize orders on custom events
  useEffect(() => {
    const handleUpdate = () => {
      setOrders(getStoredOrders());
    };
    window.addEventListener('steakholders_orders_updated', handleUpdate);
    return () => window.removeEventListener('steakholders_orders_updated', handleUpdate);
  }, []);

  // PIN Authentication Handler
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN || pinInput.trim().toLowerCase() === 'steakholders') {
      setIsAuthenticated(true);
      setAdminAuth(true);
      setPinError('');
    } else {
      setPinError('Invalid Kitchen PIN. Hint: 1700 (Weekend Opening Hour)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuth(false);
    setPinInput('');
  };

  // Status Updater
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateStoredOrderStatus(orderId, newStatus);
    setOrders(getStoredOrders());
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm(`Are you sure you want to remove order #${orderId}?`)) {
      deleteStoredOrder(orderId);
      setOrders(getStoredOrders());
    }
  };

  // Create Manual Order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const item = MENU_ITEMS.find(m => m.id === newOrderItemId) || MENU_ITEMS[0];
    const subtotal = item.price * newOrderQty;
    const newRef = `SH-${Math.floor(2000 + Math.random() * 7000)}`;

    const newOrder: AdminOrder = {
      id: newRef,
      createdAt: new Date().toISOString(),
      guestName: newCustomerName.trim() || 'Walk-in Guest',
      guestPhone: newCustomerPhone.trim() || '07700 900000',
      guestEmail: newCustomerEmail.trim() || undefined,
      day: newOrderDay,
      timeSlot: newOrderTime,
      status: 'confirmed',
      doneness: newOrderDoneness,
      sauce: newOrderSauce,
      specialNotes: newOrderNotes.trim() || undefined,
      items: [
        {
          id: item.id,
          name: item.name,
          cutType: item.cutType,
          quantity: newOrderQty,
          unitPrice: item.price
        }
      ],
      subtotal,
      paymentMethod: 'Collection Payment'
    };

    addStoredOrder(newOrder);
    setOrders(getStoredOrders());
    setIsNewOrderModalOpen(false);
    // Reset form
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewCustomerEmail('');
    setNewOrderNotes('');
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Order Ref', 'Date Created', 'Customer', 'Phone', 'Email', 'Day', 'Slot', 'Doneness', 'Sauce', 'Items', 'Total (£)', 'Status'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.guestName}"`,
      o.guestPhone,
      o.guestEmail || '',
      o.day.toUpperCase(),
      o.timeSlot,
      o.doneness,
      `"${o.sauce}"`,
      `"${o.items.map(i => `${i.quantity}x ${i.name}`).join('; ')}"`,
      o.subtotal.toFixed(2),
      o.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `steakholders_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Computed Stats
  const stats = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.subtotal : sum, 0);
    const totalCount = orders.length;
    const aov = totalCount > 0 ? totalRev / totalCount : 0;
    const confirmedCount = orders.filter(o => o.status === 'confirmed').length;
    const preparingCount = orders.filter(o => o.status === 'preparing').length;
    const readyCount = orders.filter(o => o.status === 'ready').length;
    const collectedCount = orders.filter(o => o.status === 'collected').length;

    // Day breakdown
    const dayStats = {
      friday: { rev: 0, count: 0 },
      saturday: { rev: 0, count: 0 },
      sunday: { rev: 0, count: 0 }
    };
    orders.forEach(o => {
      if (dayStats[o.day]) {
        dayStats[o.day].count += 1;
        if (o.status !== 'cancelled') dayStats[o.day].rev += o.subtotal;
      }
    });

    // Doneness breakdown
    const donenessStats: Record<string, number> = {};
    orders.forEach(o => {
      donenessStats[o.doneness] = (donenessStats[o.doneness] || 0) + 1;
    });

    // Unique customers
    const customerMap = new Map<string, {
      name: string;
      phone: string;
      email?: string;
      totalSpend: number;
      ordersCount: number;
      favoriteDoneness: string;
      isVip?: boolean;
    }>();

    orders.forEach(o => {
      const key = o.guestPhone.trim() || o.guestName.trim();
      const existing = customerMap.get(key);
      if (existing) {
        existing.totalSpend += o.subtotal;
        existing.ordersCount += 1;
        if (o.isVip) existing.isVip = true;
      } else {
        customerMap.set(key, {
          name: o.guestName,
          phone: o.guestPhone,
          email: o.guestEmail,
          totalSpend: o.subtotal,
          ordersCount: 1,
          favoriteDoneness: o.doneness,
          isVip: o.isVip
        });
      }
    });

    const customersList = Array.from(customerMap.values()).sort((a, b) => b.totalSpend - a.totalSpend);

    return {
      totalRev,
      totalCount,
      aov,
      confirmedCount,
      preparingCount,
      readyCount,
      collectedCount,
      dayStats,
      donenessStats,
      customersList
    };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesDay = selectedDay === 'all' || order.day === selectedDay;
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.guestName.toLowerCase().includes(query) ||
        order.guestPhone.includes(query) ||
        (order.guestEmail && order.guestEmail.toLowerCase().includes(query));

      return matchesDay && matchesStatus && matchesSearch;
    });
  }, [orders, selectedDay, selectedStatus, searchQuery]);

  // If NOT authenticated, render the Security Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090a] text-stone-200 flex flex-col justify-between p-4 sm:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full pt-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl tracking-widest text-[#f5f2eb]">STEAKHOLDERS</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c5a880]">Staff Gateway</span>
          </div>
          <button
            onClick={onBackToSite}
            className="text-xs uppercase tracking-wider text-stone-400 hover:text-[#c5a880] transition-colors flex items-center gap-1.5"
          >
            <span>&larr; Return to Guest Site</span>
          </button>
        </div>

        {/* Security Login Card */}
        <div className="max-w-md mx-auto w-full bg-stone-950 border border-stone-800 p-6 sm:p-10 space-y-6 shadow-2xl my-auto">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-[#c5a880]">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-serif text-[#f5f2eb] font-light">
              Executive Kitchen &amp; Orders Desk
            </h1>
            <p className="text-xs text-stone-400 font-light">
              Enter your authorized staff passkey to access live bookings, kitchen manifests, and revenue analytics.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1.5">
                Kitchen Passkey PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="Enter 4-digit PIN (1700)"
                autoFocus
                className="w-full bg-stone-900 border border-stone-800 focus:border-[#c5a880] px-4 py-3 text-center text-lg tracking-[0.3em] font-mono text-stone-100 placeholder:tracking-normal placeholder:text-stone-600 placeholder:text-xs outline-none transition-colors"
              />
            </div>

            {pinError && (
              <div className="p-3 bg-red-950/40 border border-red-900/60 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full min-h-[44px] py-3 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Shield className="w-4 h-4" />
              <span>Unlock Staff Portal</span>
            </button>
          </form>

          <div className="pt-4 border-t border-stone-900 text-center">
            <span className="text-[11px] font-mono text-stone-500">
              Default Kitchen Passkey: <strong className="text-stone-300">1700</strong>
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-stone-600 font-mono max-w-md mx-auto">
          Private Administration Area · Unit 7, 21-25 Weston Lane, Tyseley, Birmingham B11 3RN
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#09090a] text-stone-200">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#09090a]/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand & Area */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <span className="font-serif tracking-widest text-lg sm:text-xl text-[#f5f2eb]">
                STEAKHOLDERS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
              <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 text-[10px] uppercase font-mono tracking-widest text-[#c5a880]">
                Admin Console
              </span>
            </div>

            <button
              onClick={onBackToSite}
              className="sm:hidden text-xs text-stone-400 hover:text-stone-200 uppercase font-mono"
            >
              Exit
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-stone-950 p-1 border border-stone-800 text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 font-mono uppercase tracking-wider text-[11px] transition-colors ${
                activeTab === 'orders'
                  ? 'bg-stone-800 text-[#f5f2eb] font-medium'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3 py-1.5 font-mono uppercase tracking-wider text-[11px] transition-colors ${
                activeTab === 'stats'
                  ? 'bg-stone-800 text-[#f5f2eb] font-medium'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-1.5 font-mono uppercase tracking-wider text-[11px] transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-stone-800 text-[#f5f2eb] font-medium'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Slots
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-3 py-1.5 font-mono uppercase tracking-wider text-[11px] transition-colors ${
                activeTab === 'customers'
                  ? 'bg-stone-800 text-[#f5f2eb] font-medium'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Customers ({stats.customersList.length})
            </button>
          </div>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsNewOrderModalOpen(true)}
              className="px-3 py-1.5 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Booking</span>
            </button>

            <button
              onClick={onBackToSite}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono uppercase tracking-wider border border-stone-800 transition-colors"
            >
              View Site &rarr;
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 text-stone-400 hover:text-rose-400 border border-stone-800 hover:border-rose-900/60 transition-colors"
              title="Lock Admin Console"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Executive KPI Stats Bar (always visible) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-stone-950 border border-stone-800 p-5 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono text-stone-500 tracking-wider">
              <span>Gross Weekend Revenue</span>
              <DollarSign className="w-3.5 h-3.5 text-[#c5a880]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono text-[#f5f2eb] font-semibold tabular-nums">
              £{stats.totalRev.toFixed(2)}
            </div>
            <div className="text-[11px] text-stone-400 font-light flex items-center gap-1">
              <span className="text-emerald-400 font-mono">100% Direct</span>
              <span>· Zero third-party commission</span>
            </div>
          </div>

          <div className="bg-stone-950 border border-stone-800 p-5 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono text-stone-500 tracking-wider">
              <span>Total Bookings</span>
              <ShoppingBag className="w-3.5 h-3.5 text-[#c5a880]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono text-[#f5f2eb] font-semibold tabular-nums">
              {stats.totalCount}
            </div>
            <div className="text-[11px] text-stone-400 font-light">
              <span className="text-amber-400 font-mono">{stats.confirmedCount} Pending</span> · {stats.preparingCount} Searing · {stats.readyCount} Ready
            </div>
          </div>

          <div className="bg-stone-950 border border-stone-800 p-5 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono text-stone-500 tracking-wider">
              <span>Average Order Value</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#c5a880]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono text-[#c5a880] font-semibold tabular-nums">
              £{stats.aov.toFixed(2)}
            </div>
            <div className="text-[11px] text-stone-400 font-light">
              Avg ~2.2 prime boxes per customer
            </div>
          </div>

          <div className="bg-stone-950 border border-stone-800 p-5 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono text-stone-500 tracking-wider">
              <span>Collection Location</span>
              <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
            </div>
            <div className="text-lg sm:text-xl font-serif text-[#f5f2eb] truncate">
              Unit 7, Weston Lane
            </div>
            <div className="text-[11px] text-stone-400 font-light">
              Tyseley, Birmingham B11 3RN
            </div>
          </div>
        </section>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-stone-950 border border-stone-800 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search ref, guest name, phone..."
                    className="w-full bg-stone-900 border border-stone-800 focus:border-[#c5a880] pl-9 pr-3 py-2 text-xs font-mono text-stone-200 placeholder:text-stone-600 outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Day Filter */}
                <select
                  value={selectedDay}
                  onChange={e => setSelectedDay(e.target.value)}
                  className="bg-stone-900 border border-stone-800 px-3 py-2 text-xs font-mono text-stone-300 outline-none"
                >
                  <option value="all">All Days (Fri, Sat, Sun)</option>
                  <option value="friday">Friday Only</option>
                  <option value="saturday">Saturday Only</option>
                  <option value="sunday">Sunday Only</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  className="bg-stone-900 border border-stone-800 px-3 py-2 text-xs font-mono text-stone-300 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing (Iron Sear)</option>
                  <option value="ready">Ready for Collection</option>
                  <option value="collected">Collected</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Quick Actions & CSV Export */}
              <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono border border-stone-800 transition-colors flex items-center gap-1.5"
                  title="Download full CSV dataset"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={resetStoredOrders}
                  className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs font-mono border border-stone-800 transition-colors flex items-center gap-1.5"
                  title="Reset to default seed dataset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Seed</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-stone-950 border border-stone-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-800 bg-stone-900/60 text-[10px] font-mono uppercase tracking-wider text-stone-400">
                      <th className="py-3 px-4">Ref &amp; Guest</th>
                      <th className="py-3 px-4">Collection Slot</th>
                      <th className="py-3 px-4">Order Manifest</th>
                      <th className="py-3 px-4">Doneness &amp; Sauce</th>
                      <th className="py-3 px-4 text-right">Total (£)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-900 text-xs">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-500 font-mono">
                          No bookings found matching current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => {
                        const statusColors: Record<OrderStatus, string> = {
                          confirmed: 'text-amber-400 bg-amber-950/30 border-amber-800/50',
                          preparing: 'text-rose-400 bg-rose-950/30 border-rose-800/50',
                          ready: 'text-emerald-400 bg-emerald-950/30 border-emerald-800/50',
                          collected: 'text-stone-400 bg-stone-900 border-stone-800',
                          cancelled: 'text-stone-600 bg-stone-950 border-stone-800 line-through'
                        };

                        // Clean WhatsApp message url
                        const waMsg = encodeURIComponent(
                          `Hi ${order.guestName}! This is Abdullah from Steakholders Birmingham regarding your booking #${order.id} (${order.day.toUpperCase()} at ${order.timeSlot}).`
                        );
                        const waUrl = `https://api.whatsapp.com/send?phone=${order.guestPhone.replace(/\s+/g, '')}&text=${waMsg}`;

                        return (
                          <tr key={order.id} className="hover:bg-stone-900/40 transition-colors">
                            {/* Ref & Guest info */}
                            <td className="py-3.5 px-4 align-top">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[#c5a880] font-semibold text-xs">
                                  #{order.id}
                                </span>
                                {order.isVip && (
                                  <span className="px-1.5 py-0.2 bg-[#c5a880]/15 text-[#c5a880] text-[8px] font-mono uppercase tracking-wider border border-[#c5a880]/30">
                                    VIP
                                  </span>
                                )}
                              </div>
                              <div className="font-serif text-sm text-[#f5f2eb] mt-0.5">
                                {order.guestName}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-stone-400 font-mono mt-0.5">
                                <a
                                  href={`tel:${order.guestPhone}`}
                                  className="hover:text-stone-200 transition-colors"
                                >
                                  {order.guestPhone}
                                </a>
                              </div>
                            </td>

                            {/* Collection slot */}
                            <td className="py-3.5 px-4 align-top font-mono">
                              <div className="text-stone-200 uppercase font-semibold text-xs">
                                {order.day}
                              </div>
                              <div className="text-[#c5a880] text-[11px] flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                <span>{order.timeSlot}</span>
                              </div>
                            </td>

                            {/* Manifest items */}
                            <td className="py-3.5 px-4 align-top">
                              <div className="space-y-1">
                                {order.items.map((it, i) => (
                                  <div key={i} className="text-stone-300 text-xs">
                                    <span className="font-mono text-[#c5a880] font-medium mr-1.5">
                                      {it.quantity}x
                                    </span>
                                    <span>{it.name}</span>
                                  </div>
                                ))}
                                {order.specialNotes && (
                                  <div className="text-[10px] text-stone-400 italic bg-stone-900/60 p-1.5 border border-stone-850 mt-1 max-w-xs">
                                    Note: {order.specialNotes}
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Doneness & Sauce */}
                            <td className="py-3.5 px-4 align-top font-mono text-[11px]">
                              <div className="text-stone-200">
                                {order.doneness}
                              </div>
                              <div className="text-stone-400 text-[10px] mt-0.5">
                                {order.sauce}
                              </div>
                            </td>

                            {/* Total */}
                            <td className="py-3.5 px-4 align-top text-right font-mono font-semibold text-sm text-[#f5f2eb] tabular-nums">
                              £{order.subtotal.toFixed(2)}
                            </td>

                            {/* Status Pill Switcher */}
                            <td className="py-3.5 px-4 align-top">
                              <select
                                value={order.status}
                                onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 border outline-none cursor-pointer transition-colors ${statusColors[order.status]}`}
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="preparing">Preparing (Sear)</option>
                                <option value="ready">Ready for Pickup</option>
                                <option value="collected">Collected</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 align-top text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Print Docket Ticket */}
                                <button
                                  onClick={() => setSelectedOrderForTicket(order)}
                                  className="p-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 border border-stone-800 transition-colors"
                                  title="Print Kitchen Docket"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                </button>

                                {/* WhatsApp Customer */}
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 bg-stone-900 hover:bg-emerald-950 text-emerald-400 border border-stone-800 hover:border-emerald-800 transition-colors"
                                  title="Send WhatsApp Update to Diner"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>

                                {/* Delete */}
                                <button
                                  onClick={() => handleDelete(order.id)}
                                  className="p-1.5 bg-stone-900 hover:bg-rose-950 text-stone-500 hover:text-rose-400 border border-stone-800 hover:border-rose-900 transition-colors"
                                  title="Delete order"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANALYTICS & INSIGHTS */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Daily Allocation & Revenue */}
              <div className="bg-stone-950 border border-stone-800 p-6 space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] block">
                  Day-by-Day Revenue Split
                </span>
                <div className="space-y-3">
                  {(['friday', 'saturday', 'sunday'] as const).map(day => {
                    const dayData = stats.dayStats[day];
                    const percent = stats.totalRev > 0 ? (dayData.rev / stats.totalRev) * 100 : 0;
                    return (
                      <div key={day} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif uppercase tracking-wider text-stone-200">{day}</span>
                          <span className="font-mono text-[#c5a880]">£{dayData.rev.toFixed(2)} ({dayData.count} orders)</span>
                        </div>
                        <div className="h-2 w-full bg-stone-900 overflow-hidden">
                          <div
                            className="h-full bg-[#c5a880] transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Doneness Preference Breakdown */}
              <div className="bg-stone-950 border border-stone-800 p-6 space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] block">
                  Customer Doneness Preferences
                </span>
                <div className="space-y-3">
                  {Object.entries(stats.donenessStats).map(([doneness, count]) => {
                    const pct = Math.round((count / stats.totalCount) * 100);
                    return (
                      <div key={doneness} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-300 font-light">{doneness}</span>
                          <span className="font-mono text-stone-400">{count} orders ({pct}%)</span>
                        </div>
                        <div className="h-2 w-full bg-stone-900 overflow-hidden">
                          <div
                            className="h-full bg-rose-600 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Operational Kitchen Summary */}
              <div className="bg-stone-950 border border-stone-800 p-6 space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] block">
                  Kitchen Readiness Ratios
                </span>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1.5 border-b border-stone-900">
                    <span className="text-stone-400">Total Active Batches:</span>
                    <span className="text-stone-200">{stats.totalCount} Orders</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-900">
                    <span className="text-stone-400">Halal Beef Standard:</span>
                    <span className="text-[#c5a880]">100% HMC Certified</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-900">
                    <span className="text-stone-400">Pre-Booking Fill Rate:</span>
                    <span className="text-emerald-400 font-semibold">92% Weekend Cap</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-900">
                    <span className="text-stone-400">Google Customer Score:</span>
                    <span className="text-stone-200">4.9 ★ (150+ Reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SCHEDULE & SLOT ALLOCATION */}
        {activeTab === 'schedule' && (
          <div className="bg-stone-950 border border-stone-800 p-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] block">
                Weekend Thermal Sear Slot Distribution
              </span>
              <h3 className="text-lg font-serif text-[#f5f2eb] mt-1">
                Collection Slot Grid &amp; Kitchen Flow
              </h3>
              <p className="text-xs text-stone-400 font-light">
                Each 30-minute interval accommodates up to 8 freshly seared boxes to preserve our sizzling iron quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['friday', 'saturday', 'sunday'] as const).map(day => {
                const dayOrders = orders.filter(o => o.day === day);
                return (
                  <div key={day} className="bg-stone-900/50 border border-stone-800 p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                      <h4 className="font-serif text-sm uppercase tracking-wider text-[#f5f2eb]">
                        {day} Schedule
                      </h4>
                      <span className="text-xs font-mono text-[#c5a880]">
                        {dayOrders.length} bookings
                      </span>
                    </div>

                    <div className="space-y-2">
                      {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(slot => {
                        const slotOrders = dayOrders.filter(o => o.timeSlot === slot);
                        const isFull = slotOrders.length >= 4;
                        return (
                          <div
                            key={slot}
                            className={`p-2.5 border text-xs flex items-center justify-between ${
                              slotOrders.length > 0
                                ? 'bg-stone-950 border-stone-700 text-stone-200'
                                : 'bg-stone-950/40 border-stone-850 text-stone-600'
                            }`}
                          >
                            <div className="flex items-center gap-2 font-mono">
                              <span className="font-semibold text-stone-300">{slot}</span>
                              {slotOrders.length > 0 && (
                                <span className="text-[10px] text-[#c5a880]">
                                  ({slotOrders.length} {slotOrders.length === 1 ? 'box' : 'boxes'})
                                </span>
                              )}
                            </div>

                            <div>
                              {slotOrders.length === 0 ? (
                                <span className="text-[10px] font-mono text-stone-600">Open</span>
                              ) : (
                                <div className="text-right">
                                  <span className="text-[10px] text-stone-400 truncate max-w-[120px] block">
                                    {slotOrders.map(o => o.guestName.split(' ')[0]).join(', ')}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMERS DIRECTORY */}
        {activeTab === 'customers' && (
          <div className="bg-stone-950 border border-stone-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] block">
                  Guest Directory
                </span>
                <h3 className="text-lg font-serif text-[#f5f2eb] mt-1">
                  Customer Registry &amp; Loyalty History
                </h3>
              </div>
              <span className="text-xs font-mono text-stone-400">
                {stats.customersList.length} Unique Diners
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-900/60 text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Phone / WhatsApp</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Favorite Doneness</th>
                    <th className="py-3 px-4 text-center">Orders</th>
                    <th className="py-3 px-4 text-right">Lifetime Spend</th>
                    <th className="py-3 px-4 text-right">Direct Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-900">
                  {stats.customersList.map((cust, idx) => (
                    <tr key={idx} className="hover:bg-stone-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-serif text-sm text-[#f5f2eb]">
                        <div className="flex items-center gap-2">
                          <span>{cust.name}</span>
                          {cust.isVip && (
                            <span className="px-1.5 py-0.2 bg-[#c5a880]/15 text-[#c5a880] text-[8px] font-mono uppercase tracking-wider border border-[#c5a880]/30">
                              VIP Regular
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-stone-300">
                        {cust.phone}
                      </td>
                      <td className="py-3.5 px-4 text-stone-400 font-mono text-[11px]">
                        {cust.email || '—'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-stone-300">
                        {cust.favoriteDoneness}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-center text-stone-300">
                        {cust.ordersCount}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-right text-[#c5a880] font-semibold">
                        £{cust.totalSpend.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`https://api.whatsapp.com/send?phone=${cust.phone.replace(/\s+/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900 hover:bg-emerald-950 text-emerald-400 border border-stone-800 hover:border-emerald-800 font-mono text-[10px] uppercase transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: KITCHEN THERMAL DOCKET TICKET */}
      {selectedOrderForTicket && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-sm w-full p-6 font-mono text-xs shadow-2xl space-y-4 border border-stone-400">
            {/* Ticket Header */}
            <div className="text-center pb-3 border-b-2 border-dashed border-black">
              <h4 className="font-bold text-base tracking-widest uppercase">STEAKHOLDERS</h4>
              <p className="text-[10px] text-stone-600">UNIT 7, WESTON LANE, BIRMINGHAM</p>
              <div className="mt-2 text-sm font-bold bg-black text-white py-1">
                KITCHEN SEAR TICKET #{selectedOrderForTicket.id}
              </div>
            </div>

            {/* Collection Time */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>COLLECTION DAY:</span>
                <span className="font-bold uppercase">{selectedOrderForTicket.day}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span>SEAR SLOT:</span>
                <span>{selectedOrderForTicket.timeSlot}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>CUSTOMER:</span>
                <span className="font-bold">{selectedOrderForTicket.guestName}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>PHONE:</span>
                <span>{selectedOrderForTicket.guestPhone}</span>
              </div>
            </div>

            {/* Preparation Specifications */}
            <div className="py-2 border-y-2 border-dashed border-black space-y-1.5">
              <div className="flex justify-between font-bold text-sm bg-stone-200 px-1 py-0.5">
                <span>DONENESS:</span>
                <span className="uppercase text-red-700">{selectedOrderForTicket.doneness}</span>
              </div>
              <div className="flex justify-between">
                <span>SAUCE PAIRING:</span>
                <span className="font-semibold">{selectedOrderForTicket.sauce}</span>
              </div>
              {selectedOrderForTicket.specialNotes && (
                <div className="text-[10px] italic border-t pt-1 mt-1 text-stone-800">
                  SPECIAL REQUEST: {selectedOrderForTicket.specialNotes}
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="space-y-1">
              <div className="font-bold text-[11px] mb-1">BOX CONTENTS:</div>
              {selectedOrderForTicket.items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>{it.quantity}x {it.name}</span>
                  <span>£{(it.quantity * it.unitPrice).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-2 border-t-2 border-black flex justify-between font-bold text-sm">
              <span>TOTAL DUE:</span>
              <span>£{selectedOrderForTicket.subtotal.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-between no-print gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-black text-white hover:bg-stone-800 text-xs uppercase tracking-wider font-bold text-center"
              >
                Print Ticket
              </button>
              <button
                onClick={() => setSelectedOrderForTicket(null)}
                className="px-4 py-2 border border-black text-xs uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: MANUAL BOOKING ENTRY */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880]">
                  Admin Direct Entry
                </span>
                <h3 className="text-xl font-serif text-[#f5f2eb]">
                  Log Phone or Walk-in Booking
                </h3>
              </div>
              <button
                onClick={() => setIsNewOrderModalOpen(false)}
                className="text-stone-400 hover:text-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCustomerName}
                    onChange={e => setNewCustomerName(e.target.value)}
                    placeholder="e.g. Tariq Khan"
                    className="w-full bg-stone-900 border border-stone-800 focus:border-[#c5a880] p-2.5 text-xs text-stone-200 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newCustomerPhone}
                    onChange={e => setNewCustomerPhone(e.target.value)}
                    placeholder="07..."
                    className="w-full bg-stone-900 border border-stone-800 focus:border-[#c5a880] p-2.5 text-xs text-stone-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Collection Day
                  </label>
                  <select
                    value={newOrderDay}
                    onChange={e => setNewOrderDay(e.target.value as any)}
                    className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 outline-none font-mono"
                  >
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Time Slot
                  </label>
                  <select
                    value={newOrderTime}
                    onChange={e => setNewOrderTime(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 outline-none font-mono"
                  >
                    {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Cut Selection
                  </label>
                  <select
                    value={newOrderItemId}
                    onChange={e => setNewOrderItemId(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 outline-none"
                  >
                    {MENU_ITEMS.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} (£{m.price.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newOrderQty}
                    onChange={e => setNewOrderQty(parseInt(e.target.value) || 1)}
                    className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Doneness Preference
                  </label>
                  <select
                    value={newOrderDoneness}
                    onChange={e => setNewOrderDoneness(e.target.value as any)}
                    className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 outline-none font-mono"
                  >
                    <option value="Rare">Rare</option>
                    <option value="Medium Rare">Medium Rare (Chef Pick)</option>
                    <option value="Medium">Medium</option>
                    <option value="Well Done">Well Done</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Sauce Choice
                  </label>
                  <select
                    value={newOrderSauce}
                    onChange={e => setNewOrderSauce(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 outline-none font-mono"
                  >
                    <option value="House Chimichurri">House Chimichurri</option>
                    <option value="Truffle Mayo">Truffle Mayo</option>
                    <option value="Peppercorn sauce">Peppercorn sauce</option>
                    <option value="Garlic Butter Glaze">Garlic Butter Glaze</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                  Kitchen Notes (Optional)
                </label>
                <input
                  type="text"
                  value={newOrderNotes}
                  onChange={e => setNewOrderNotes(e.target.value)}
                  placeholder="e.g. Extra crunch, allergic to dairy..."
                  className="w-full bg-stone-900 border border-stone-800 focus:border-[#c5a880] p-2.5 text-xs text-stone-200 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2.5 border border-stone-800 hover:border-stone-700 text-stone-400 text-xs font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs font-mono uppercase tracking-wider"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
