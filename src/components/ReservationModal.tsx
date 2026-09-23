import { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowUpRight,
  Check,
  MessageSquare,
  Clock,
  MapPin,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { BRAND_INFO, MENU_ITEMS } from '../data/content';
import { MenuItem } from '../types/steakholders';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: { item: MenuItem; quantity: number }[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClear: () => void;
  initialDoneness?: 'Rare' | 'Medium Rare' | 'Medium' | 'Well Done';
  initialSauce?: string;
}

const TIME_SLOTS = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00'
];

export default function ReservationModal({
  isOpen,
  onClose,
  selectedItems,
  onUpdateQuantity,
  onRemoveItem,
  onClear,
  initialDoneness = 'Medium Rare',
  initialSauce = 'Peppercorn sauce'
}: ReservationModalProps) {
  const [day, setDay] = useState<'friday' | 'saturday' | 'sunday'>('saturday');
  const [timeSlot, setTimeSlot] = useState<string>('18:00');
  const [doneness, setDoneness] = useState<'Rare' | 'Medium Rare' | 'Medium' | 'Well Done'>(initialDoneness);
  const [sauce, setSauce] = useState<string>(initialSauce);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('SH-7821');
  const [copiedRef, setCopiedRef] = useState(false);

  // Sync initial preferences whenever they update
  useEffect(() => {
    if (initialDoneness) setDoneness(initialDoneness);
  }, [initialDoneness]);

  useEffect(() => {
    if (initialSauce) setSauce(initialSauce);
  }, [initialSauce]);

  if (!isOpen) return null;

  const subtotal = selectedItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `SH-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderRef(newRef);
    setIsSubmitted(true);
  };

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(orderRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const appropriateJotform = BRAND_INFO.jotformBirmingham || BRAND_INFO.jotformReserve;

  // Build pre-filled WhatsApp message for direct concierge follow-up
  const orderItemsSummary = selectedItems
    .map(i => `• ${i.quantity}x ${i.item.name} (£${(i.item.price * i.quantity).toFixed(2)})`)
    .join('\n');

  const waMessageText = [
    `*Steakholders Weekend Order Request*`,
    `Ref: #${orderRef}`,
    `Customer: ${guestName || 'Steakholder Guest'}`,
    `WhatsApp: ${guestPhone || 'Not provided'}`,
    `Collection Day: ${day.toUpperCase()} (${timeSlot})`,
    `Location: ${BRAND_INFO.fullAddress}`,
    `Doneness: ${doneness}`,
    `Sauce: ${sauce}`,
    specialNotes ? `Notes: ${specialNotes}` : null,
    `\n*Order Manifest:*`,
    orderItemsSummary,
    `\n*Estimated Total: £${subtotal.toFixed(2)}*`,
    `\nPlease confirm my hot collection slot via WhatsApp.`
  ]
    .filter(Boolean)
    .join('\n');

  const waDirectUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessageText)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-2xl bg-stone-950 border border-stone-800 shadow-2xl p-4 sm:p-8 md:p-10 space-y-5 sm:space-y-6 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-mono">
              <span>Concierge Desk</span>
              <span>·</span>
              <span>Weekend Service</span>
            </div>
            <h3 className="text-2xl font-serif text-[#f5f2eb] font-light mt-1">
              {isSubmitted ? 'Order Submission Status' : 'Reserve Box · Finalise Order'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* ========================================================================= */
          /* CONFIRMATION STATE - PROMINENT AWAIT WHATSAPP CONFIRMATION STATUS         */
          /* ========================================================================= */
          <div className="space-y-6 py-2 text-left">
            {/* Primary Status Banner */}
            <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-stone-900 to-stone-950 border-2 border-emerald-500/70 shadow-2xl space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono tracking-widest uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span>Order Data Captured</span>
                </div>

                <button
                  onClick={handleCopyRef}
                  className="flex items-center gap-1.5 text-xs text-stone-300 font-mono bg-stone-900/80 px-2.5 py-1 border border-stone-700 hover:border-[#c5a880] transition-colors"
                >
                  <span>Ref: #{orderRef}</span>
                  {copiedRef ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase font-mono tracking-[0.2em] text-emerald-400">
                  Status Notification
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-snug">
                  Please await confirmation via WhatsApp
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                  Thank you, <strong className="text-white font-medium">{guestName || 'Steakholder'}</strong>. All customer details and custom order specifications have been captured.
                </p>
                <div className="p-3.5 bg-stone-900/90 border border-emerald-500/30 text-xs text-stone-200 font-light space-y-1">
                  <div className="text-emerald-300 font-medium flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp Verification in Progress:</span>
                  </div>
                  <p className="text-stone-300 text-[11px] pl-5">
                    Our kitchen concierge is reviewing today's fresh batch allocation and will send an official confirmation message directly to <strong className="text-emerald-400 font-mono">{guestPhone}</strong> with your collection slot and pickup instructions.
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Quick Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={waDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp to Confirm</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={BRAND_INFO.whatsappCommunity}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-medium text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>VIP Channel</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Captured Order Summary Manifest */}
            <div className="bg-stone-900/60 border border-stone-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-[11px] uppercase font-mono tracking-widest text-[#c5a880]">
                  Captured Order Manifest
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {day.toUpperCase()} · Slot {timeSlot}
                </span>
              </div>

              <div className="space-y-2 text-xs font-light divide-y divide-stone-800/60">
                {selectedItems.map(({ item, quantity }) => (
                  <div key={item.id} className="pt-2 first:pt-0 flex justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-stone-100 font-medium">
                        {quantity}x {item.name}
                      </div>
                      {item.details && item.details.length > 0 && (
                        <div className="text-[11px] text-stone-400 mt-0.5 font-light">
                          {item.details.join(' · ')}
                        </div>
                      )}
                    </div>
                    <div className="text-[#c5a880] font-mono shrink-0 tabular-nums">
                      £{(item.price * quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-800 space-y-2 text-xs text-stone-300 font-light">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-stone-400 text-[10px] uppercase tracking-wider">
                      Collection Location:
                    </div>
                    <div className="text-stone-100 font-medium">{BRAND_INFO.fullAddress}</div>
                    <div className="text-[#c5a880] text-[11px] font-mono">{BRAND_INFO.shortAddress}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Clock className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase tracking-wider">Service Timing: </span>
                    <span className="text-stone-200">{BRAND_INFO.openingHours}</span>
                  </div>
                </div>

                {specialNotes && (
                  <div className="pt-1 text-[11px] text-stone-400">
                    <span className="text-stone-500 uppercase tracking-wider">Notes: </span>
                    <span>{specialNotes}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-stone-800 text-sm">
                <span className="text-stone-400 font-light">Total (Due on Collection):</span>
                <span className="text-[#c5a880] font-mono text-base font-bold tabular-nums">
                  £{subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Secondary Option: Official JotForm Backup & Modal Close */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={appropriateJotform}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Also View in JotForm</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] text-xs font-medium uppercase tracking-[0.18em] transition-colors"
              >
                Return to Carte
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* ORDER INTAKE FORM & MANIFEST READY FOR FINALISE                           */
          /* ========================================================================= */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selected Items Manifest */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="uppercase tracking-widest text-[11px] font-mono text-[#c5a880]">
                  Order Items Ready to Finalise ({selectedItems.reduce((acc, c) => acc + c.quantity, 0)})
                </span>
                {selectedItems.length > 0 && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="text-[11px] text-stone-500 hover:text-red-400 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {selectedItems.length === 0 ? (
                <div className="p-6 bg-stone-900/40 border border-stone-800 text-center space-y-3">
                  <p className="text-stone-400 text-xs font-light">
                    Your box is currently empty. Use the Box Builder or choose an offering to begin.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    {MENU_ITEMS.slice(0, 2).map(item => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-3 py-1.5 text-xs bg-stone-900 hover:bg-[#c5a880] hover:text-black border border-stone-700 text-stone-300 transition-colors"
                      >
                        + Add {item.name} (£{item.price.toFixed(2)})
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {selectedItems.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-stone-900/60 border border-stone-800 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover border border-stone-800 shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-stone-100 truncate">{item.name}</div>
                          {item.details && item.details.length > 0 && (
                            <div className="text-[10px] text-stone-400 truncate mt-0.5">
                              {item.details.join(' · ')}
                            </div>
                          )}
                          <div className="text-[11px] text-[#c5a880] font-mono tabular-nums mt-0.5">
                            £{item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center border border-stone-700 bg-stone-950">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-mono text-stone-200 tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Collection Location Card */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
                Collection Location
              </label>
              <div className="p-3.5 bg-stone-900/80 border border-[#c5a880]/60 flex items-center justify-between">
                <div>
                  <div className="font-serif text-sm text-stone-100">{BRAND_INFO.shortAddress}</div>
                  <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                    {BRAND_INFO.fullAddress}
                  </div>
                  <div className="text-[10px] text-[#c5a880] font-mono mt-0.5">
                    {BRAND_INFO.openingHours}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a880] border border-[#c5a880]/40 px-2.5 py-0.5">
                  Est. London
                </span>
              </div>
            </div>

            {/* Weekend Day & Timeslot Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
                  Service Day
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['friday', 'saturday', 'sunday'] as const).map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setDay(d)}
                      className={`py-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                        day === d
                          ? 'bg-[#c5a880] border-[#c5a880] text-[#09090a]'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
                  Collection Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a880]"
                >
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t}>
                      {t} (Service 17:00 – 22:30)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Culinary Preferences: Doneness & Sauce */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
                  Steak Doneness
                </label>
                <select
                  value={doneness}
                  onChange={e => setDoneness(e.target.value as any)}
                  className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="Rare">Rare (Warm red center)</option>
                  <option value="Medium Rare">Medium Rare (Chef Standard)</option>
                  <option value="Medium">Medium (Warm pink throughout)</option>
                  <option value="Well Done">Well Done (Thoroughly cooked)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
                  Sauce Selection
                </label>
                <select
                  value={sauce}
                  onChange={e => setSauce(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="Peppercorn sauce">Peppercorn sauce</option>
                  <option value="Mushroom sauce">Mushroom sauce</option>
                  <option value="No Sauce">No Sauce</option>
                </select>
              </div>
            </div>

            {/* Customer Details: Captured for WhatsApp Confirmation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-stone-400">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder="e.g. Tariq Khan"
                  className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-stone-400">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={e => setGuestPhone(e.target.value)}
                  placeholder="e.g. 07123 456789"
                  className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a880]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-stone-400">
                Special Requests / Dietary Notes (Optional)
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={e => setSpecialNotes(e.target.value)}
                placeholder="e.g. Extra crunch garnish, collect at 18:15 sharp"
                className="w-full bg-stone-900 border border-stone-800 p-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a880]"
              />
            </div>

            {/* Subtotal & Action */}
            <div className="pt-4 border-t border-stone-800 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-stone-400 font-light block">Estimated Total:</span>
                  <span className="text-[11px] text-stone-500 font-light">Payable on hot collection</span>
                </div>
                <span className="text-2xl font-mono text-[#c5a880] font-semibold tabular-nums">
                  £{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={selectedItems.length === 0}
                  className="w-full py-4 bg-[#c5a880] hover:bg-[#d6bc96] disabled:opacity-40 disabled:cursor-not-allowed text-[#09090a] font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#c5a880]/15"
                >
                  <span>Confirm &amp; Finalise Order (£{subtotal.toFixed(2)})</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-emerald-400 font-light text-center flex items-center justify-center gap-1.5 pt-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Upon confirmation, you will receive message status to await confirmation via WhatsApp.</span>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
