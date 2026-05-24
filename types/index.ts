export interface Desk {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  type: 'minimal' | 'standing' | 'teak';
  height: number; // default height in cm (e.g. 72 to 120)
  colorOptions: { name: string; value: string; textureClass: string }[];
}

export interface Chair {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  type: 'ergonomic' | 'executive' | 'rattan';
  colorOptions: { name: string; value: string; colorClass: string }[];
}

export interface Accessory {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  category: 'tech' | 'decor' | 'comfort' | 'utility';
  defaultSlot: string;
  allowedSlots: string[];
}

export interface SelectedAccessory {
  id: string;
  quantity: number;
  slot: string;
}

export interface WorkspaceTheme {
  id: string;
  name: string;
  description: string;
  deskId: string;
  chairId: string;
  accessories: { id: string; quantity: number; slot: string }[];
  bgClass: string;
  lightingClass: string;
  accentClass: string;
}

export interface WorkspaceStore {
  selectedDeskId: string;
  selectedDeskColor: string; // active color option name
  selectedChairId: string;
  selectedChairColor: string; // active color option name
  deskHeight: number; // custom height slider (e.g. 72 to 120 px or percentage)
  accessories: { [id: string]: SelectedAccessory };
  selectedThemeId: string;
  rentalDuration: number; // 1, 3, 6, 12 months
  isRoomLightsOn: boolean;
  
  // Actions
  setDesk: (deskId: string) => void;
  setDeskColor: (colorName: string) => void;
  setChair: (chairId: string) => void;
  setChairColor: (colorName: string) => void;
  setDeskHeight: (height: number) => void;
  addAccessory: (accessoryId: string, slot?: string) => void;
  removeAccessory: (accessoryId: string) => void;
  updateQuantity: (accessoryId: string, quantity: number) => void;
  moveAccessory: (accessoryId: string, slot: string) => void;
  setTheme: (themeId: string) => void;
  setRentalDuration: (months: number) => void;
  toggleRoomLights: () => void;
  resetWorkspace: () => void;
}
