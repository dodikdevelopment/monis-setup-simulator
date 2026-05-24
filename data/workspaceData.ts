import { Desk, Chair, Accessory, WorkspaceTheme } from '../types';

export const DESKS: Desk[] = [
  {
    id: 'desk-minimalist',
    name: 'Minimalist Bamboo Desk',
    description: 'Eco-friendly bamboo surface with clean white powder-coated steel legs. High durability and minimalist style.',
    monthlyPrice: 19,
    type: 'minimal',
    height: 74,
    colorOptions: [
      { name: 'Natural Bamboo', value: '#e6c280', textureClass: 'bg-amber-100/90' },
      { name: 'Soft Oak', value: '#d2b48c', textureClass: 'bg-orange-100/80' },
      { name: 'Matte White', value: '#ffffff', textureClass: 'bg-white border border-zinc-200' }
    ]
  },
  {
    id: 'desk-standing',
    name: 'Ergonomic Smart Standing Desk',
    description: 'Electric adjustable desk with dual motors, anti-collision sensor, and 4 programmable height presets.',
    monthlyPrice: 29,
    type: 'standing',
    height: 72,
    colorOptions: [
      { name: 'Dark Walnut', value: '#4a3b32', textureClass: 'bg-stone-800' },
      { name: 'Carbon Fiber', value: '#1a1a1a', textureClass: 'bg-zinc-900 border border-zinc-700' },
      { name: 'Classic Maple', value: '#f4dec9', textureClass: 'bg-amber-50' }
    ]
  },
  {
    id: 'desk-teak',
    name: 'Bali Live-Edge Teak Desk',
    description: 'Handcrafted solid Indonesian teak desk with live organic edges and heavy-duty industrial iron trapezoid legs.',
    monthlyPrice: 35,
    type: 'teak',
    height: 75,
    colorOptions: [
      { name: 'Golden Teak', value: '#c19a6b', textureClass: 'bg-amber-700/80' },
      { name: 'Raw Honey Teak', value: '#d4a373', textureClass: 'bg-amber-600/70' },
      { name: 'Charred Yakisugi', value: '#2b2d42', textureClass: 'bg-stone-900' }
    ]
  }
];

export const CHAIRS: Chair[] = [
  {
    id: 'chair-classic',
    name: 'Classic Ergonomic Chair',
    description: 'Breathable grey mesh backrest, adjustable armrests, lumbar support, and nylon base.',
    monthlyPrice: 15,
    type: 'ergonomic',
    colorOptions: [
      { name: 'Slate Grey', value: '#708090', colorClass: 'bg-slate-500' },
      { name: 'Nordic White', value: '#f5f5f5', colorClass: 'bg-zinc-200' }
    ]
  },
  {
    id: 'chair-executive',
    name: 'Premium Lumbar Executive Chair',
    description: 'Synchronous tilt, 4D armrests, adjustable seat depth, and structural aluminum frame with high-tensile mesh.',
    monthlyPrice: 25,
    type: 'executive',
    colorOptions: [
      { name: 'Obsidian Black', value: '#1a1a1a', colorClass: 'bg-zinc-800' },
      { name: 'Polar White/Silver', value: '#e2e8f0', colorClass: 'bg-slate-300' },
      { name: 'Ocean Teal', value: '#0f766e', colorClass: 'bg-teal-700' }
    ]
  },
  {
    id: 'chair-rattan',
    name: 'Cozy Bali Rattan Chair',
    description: 'Artisanal hand-woven natural rattan frame with a premium organic linen cushion. Brings warm coastal vibes.',
    monthlyPrice: 18,
    type: 'rattan',
    colorOptions: [
      { name: 'Natural Sand', value: '#dfc9a5', colorClass: 'bg-amber-200/60' },
      { name: 'Burnt Ochre', value: '#a0522d', colorClass: 'bg-amber-800' }
    ]
  }
];

export const ACCESSORIES: Accessory[] = [
  {
    id: 'acc-curved-monitor',
    name: '34" Curved Ultrawide Monitor',
    description: 'Immersive 1440p curved display with custom screen overlay options and dynamic backlight.',
    monthlyPrice: 18,
    category: 'tech',
    defaultSlot: 'monitor_slot',
    allowedSlots: ['monitor_slot']
  },
  {
    id: 'acc-dual-monitor',
    name: '27" Dual Studio Monitors',
    description: 'Dual side-by-side thin-bezel displays mounted on a heavy-duty mechanical gas spring arm.',
    monthlyPrice: 28,
    category: 'tech',
    defaultSlot: 'monitor_slot',
    allowedSlots: ['monitor_slot']
  },
  {
    id: 'acc-lamp',
    name: 'Aesthetic Warm Brass Lamp',
    description: 'Minimalist dome lamp providing warm workspace glow. Activates Lighting Layer in Dark Mode.',
    monthlyPrice: 5,
    category: 'decor',
    defaultSlot: 'left_desk_slot',
    allowedSlots: ['left_desk_slot', 'right_desk_slot']
  },
  {
    id: 'acc-plant',
    name: 'Potted Monstera Deliciosa',
    description: 'Fresh organic green Monstera in a white clay pot. Promotes creativity and reduces stress.',
    monthlyPrice: 4,
    category: 'decor',
    defaultSlot: 'right_desk_slot',
    allowedSlots: ['right_desk_slot', 'floor_left_slot', 'floor_right_slot']
  },
  {
    id: 'acc-keyboard',
    name: 'Custom Mechanical Keyboard',
    description: '75% layout premium keyboard with walnut wood casing, tactile brown switches, and custom keycaps.',
    monthlyPrice: 6,
    category: 'tech',
    defaultSlot: 'keyboard_slot',
    allowedSlots: ['keyboard_slot']
  },
  {
    id: 'acc-mouse',
    name: 'Precision Wireless Mouse',
    description: 'Ergonomic shape, hyper-fast scrolling wheel, and high-accuracy optical tracking sensor.',
    monthlyPrice: 4,
    category: 'tech',
    defaultSlot: 'keyboard_slot',
    allowedSlots: ['keyboard_slot']
  },
  {
    id: 'acc-laptop-stand',
    name: 'Premium Aluminum Laptop Stand',
    description: 'Ergonomic laptop riser crafted from a single piece of anodized aluminum. Keeps laptop at eye level.',
    monthlyPrice: 5,
    category: 'tech',
    defaultSlot: 'left_desk_slot',
    allowedSlots: ['left_desk_slot', 'right_desk_slot']
  },
  {
    id: 'acc-coffee',
    name: 'Espresso Capsule Coffee Machine',
    description: 'Sleek compact design with dynamic steam particles and custom hot-drink visual indicator.',
    monthlyPrice: 12,
    category: 'utility',
    defaultSlot: 'right_desk_slot',
    allowedSlots: ['right_desk_slot', 'left_desk_slot']
  },
  {
    id: 'acc-beanbag',
    name: 'Cozy Organic Linen Bean Bag',
    description: 'Over-sized ultra soft bean bag for cozy chill breaks and offline reading session comfort.',
    monthlyPrice: 8,
    category: 'comfort',
    defaultSlot: 'floor_left_slot',
    allowedSlots: ['floor_left_slot', 'floor_right_slot']
  },
  {
    id: 'acc-whiteboard',
    name: 'Magnetic Dry-Erase Whiteboard',
    description: 'Wooden framed dry-erase board hanging on the wall with custom markers and mock sketches.',
    monthlyPrice: 7,
    category: 'utility',
    defaultSlot: 'wall_slot',
    allowedSlots: ['wall_slot']
  }
];

export const THEMES: WorkspaceTheme[] = [
  {
    id: 'theme-minimalist',
    name: 'Minimalist Studio',
    description: 'Clean line layouts, monochrome tones, natural bamboo accents, and gentle warm backlight.',
    deskId: 'desk-minimalist',
    chairId: 'chair-classic',
    accessories: [
      { id: 'acc-curved-monitor', quantity: 1, slot: 'monitor_slot' },
      { id: 'acc-keyboard', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-mouse', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-laptop-stand', quantity: 1, slot: 'left_desk_slot' },
      { id: 'acc-plant', quantity: 1, slot: 'right_desk_slot' }
    ],
    bgClass: 'bg-gradient-to-tr from-stone-50 via-zinc-100 to-slate-200 dark:from-zinc-950 dark:via-neutral-900 dark:to-zinc-900',
    lightingClass: 'shadow-[inset_0_0_100px_rgba(255,255,255,0.3)]',
    accentClass: 'border-zinc-300 ring-zinc-500'
  },
  {
    id: 'theme-gamer',
    name: 'Cyberpunk Battlestation',
    description: 'Dark mode setup with glowing RGB neon backlights, dual monitors, high-performance gears, and intense atmosphere.',
    deskId: 'desk-standing',
    chairId: 'chair-executive',
    accessories: [
      { id: 'acc-dual-monitor', quantity: 1, slot: 'monitor_slot' },
      { id: 'acc-keyboard', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-mouse', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-lamp', quantity: 1, slot: 'left_desk_slot' },
      { id: 'acc-coffee', quantity: 1, slot: 'right_desk_slot' }
    ],
    bgClass: 'bg-gradient-to-tr from-indigo-950 via-zinc-950 to-purple-950',
    lightingClass: 'shadow-[0_0_50px_rgba(168,85,247,0.15)]',
    accentClass: 'border-purple-500 ring-purple-600'
  },
  {
    id: 'theme-bali',
    name: 'Tropical Bali Retreat',
    description: 'Cozy rustic teak wood, relaxing rattan weaving, ambient sunset lighting shadow overlays, and tropical plants.',
    deskId: 'desk-teak',
    chairId: 'chair-rattan',
    accessories: [
      { id: 'acc-curved-monitor', quantity: 1, slot: 'monitor_slot' },
      { id: 'acc-keyboard', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-mouse', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-plant', quantity: 1, slot: 'right_desk_slot' },
      { id: 'acc-beanbag', quantity: 1, slot: 'floor_left_slot' }
    ],
    bgClass: 'bg-gradient-to-tr from-amber-50/50 via-orange-100/40 to-yellow-100/50 dark:from-stone-950 dark:via-amber-950/30 dark:to-orange-950/20',
    lightingClass: 'shadow-[inset_0_0_100px_rgba(251,146,60,0.15)]',
    accentClass: 'border-amber-600 ring-orange-500'
  },
  {
    id: 'theme-startup',
    name: 'Fast-paced Startup Office',
    description: 'Highly dynamic setup featuring smart standing desk, ergonomic support, whiteboard ideas, and coffee machine fuel.',
    deskId: 'desk-standing',
    chairId: 'chair-executive',
    accessories: [
      { id: 'acc-dual-monitor', quantity: 1, slot: 'monitor_slot' },
      { id: 'acc-keyboard', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-mouse', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-coffee', quantity: 1, slot: 'right_desk_slot' },
      { id: 'acc-whiteboard', quantity: 1, slot: 'wall_slot' }
    ],
    bgClass: 'bg-gradient-to-tr from-blue-50 via-indigo-50/80 to-slate-100 dark:from-slate-950 dark:via-blue-950/20 dark:to-zinc-900',
    lightingClass: 'shadow-[inset_0_0_80px_rgba(59,130,246,0.1)]',
    accentClass: 'border-blue-500 ring-blue-600'
  },
  {
    id: 'theme-creator',
    name: 'Cinematic Creator Studio',
    description: 'Moody accent lighting, premium aluminum stand, warm lamp glow, custom mechanical sounds, and dark aesthetic.',
    deskId: 'desk-teak',
    chairId: 'chair-executive',
    accessories: [
      { id: 'acc-curved-monitor', quantity: 1, slot: 'monitor_slot' },
      { id: 'acc-keyboard', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-mouse', quantity: 1, slot: 'keyboard_slot' },
      { id: 'acc-lamp', quantity: 1, slot: 'left_desk_slot' },
      { id: 'acc-laptop-stand', quantity: 1, slot: 'right_desk_slot' }
    ],
    bgClass: 'bg-gradient-to-tr from-neutral-900 via-stone-950 to-zinc-900',
    lightingClass: 'shadow-[0_0_60px_rgba(245,158,11,0.1)]',
    accentClass: 'border-amber-500 ring-amber-600'
  }
];

export const RENTAL_DISCOUNTS: { [months: number]: number } = {
  1: 0,
  3: 5,   // 5% discount
  6: 10,  // 10% discount
  12: 20  // 20% discount
};
