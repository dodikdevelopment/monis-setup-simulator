import { create } from 'zustand';
import { WorkspaceStore, SelectedAccessory } from '../types';
import { DESKS, CHAIRS, ACCESSORIES, THEMES } from '../data/workspaceData';

// Initial state helpers
const defaultTheme = THEMES[0]; // Minimalist Studio

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  selectedDeskId: defaultTheme.deskId,
  selectedDeskColor: DESKS.find(d => d.id === defaultTheme.deskId)?.colorOptions[0].name || '',
  selectedChairId: defaultTheme.chairId,
  selectedChairColor: CHAIRS.find(c => c.id === defaultTheme.chairId)?.colorOptions[0].name || '',
  deskHeight: 74, // starting cm height
  accessories: defaultTheme.accessories.reduce((acc, curr) => {
    acc[curr.id] = { id: curr.id, quantity: curr.quantity, slot: curr.slot };
    return acc;
  }, {} as { [id: string]: SelectedAccessory }),
  selectedThemeId: defaultTheme.id,
  rentalDuration: 6, // 6 months default
  isRoomLightsOn: true,

  setDesk: (deskId) => set((state) => {
    const desk = DESKS.find(d => d.id === deskId);
    if (!desk) return {};
    
    // Check if the desk has height bounds. If it's a standing desk, set to default 72. Otherwise 74 or 75.
    return {
      selectedDeskId: deskId,
      selectedDeskColor: desk.colorOptions[0].name,
      deskHeight: desk.height,
      selectedThemeId: 'custom' // mark theme as custom since user altered it
    };
  }),

  setDeskColor: (colorName) => set({ selectedDeskColor: colorName }),

  setChair: (chairId) => set((state) => {
    const chair = CHAIRS.find(c => c.id === chairId);
    if (!chair) return {};
    return {
      selectedChairId: chairId,
      selectedChairColor: chair.colorOptions[0].name,
      selectedThemeId: 'custom'
    };
  }),

  setChairColor: (colorName) => set({ selectedChairColor: colorName }),

  setDeskHeight: (height) => set({ deskHeight: height }),

  addAccessory: (accessoryId, slot) => set((state) => {
    const accessory = ACCESSORIES.find(a => a.id === accessoryId);
    if (!accessory) return {};

    const targetSlot = slot || accessory.defaultSlot;
    const newAccessories = { ...state.accessories };

    // Resolve slot conflicts (except keyboard which allows multiple items: keyboard and mouse)
    if (targetSlot !== 'keyboard_slot') {
      Object.keys(newAccessories).forEach((accId) => {
        if (newAccessories[accId].slot === targetSlot) {
          // If a screen is being replaced, check if it's monitor slot
          if (targetSlot === 'monitor_slot' && (accessoryId === 'acc-curved-monitor' || accessoryId === 'acc-dual-monitor')) {
            delete newAccessories[accId];
          } else {
            // Swap or remove conflicting item in the same slot
            delete newAccessories[accId];
          }
        }
      });
    } else {
      // Keyboard slot: If user adds Curved/Dual monitor here, prevent it.
      // But keyboard and mouse can coexist. Ensure no duplicate keyboard or duplicate mouse.
      if (accessoryId === 'acc-keyboard') {
        delete newAccessories['acc-keyboard'];
      }
      if (accessoryId === 'acc-mouse') {
        delete newAccessories['acc-mouse'];
      }
    }

    newAccessories[accessoryId] = {
      id: accessoryId,
      quantity: 1,
      slot: targetSlot
    };

    return {
      accessories: newAccessories,
      selectedThemeId: 'custom'
    };
  }),

  removeAccessory: (accessoryId) => set((state) => {
    const newAccessories = { ...state.accessories };
    delete newAccessories[accessoryId];
    return {
      accessories: newAccessories,
      selectedThemeId: 'custom'
    };
  }),

  updateQuantity: (accessoryId, quantity) => set((state) => {
    if (quantity <= 0) {
      const newAccessories = { ...state.accessories };
      delete newAccessories[accessoryId];
      return { accessories: newAccessories, selectedThemeId: 'custom' };
    }

    return {
      accessories: {
        ...state.accessories,
        [accessoryId]: {
          ...state.accessories[accessoryId],
          quantity
        }
      },
      selectedThemeId: 'custom'
    };
  }),

  moveAccessory: (accessoryId, slot) => set((state) => {
    const accessory = ACCESSORIES.find(a => a.id === accessoryId);
    if (!accessory || !state.accessories[accessoryId]) return {};

    // Validate if the accessory is allowed in this slot
    if (!accessory.allowedSlots.includes(slot)) return {};

    const newAccessories = { ...state.accessories };

    // Resolve slot conflicts (except keyboard which allows multiple items)
    if (slot !== 'keyboard_slot') {
      Object.keys(newAccessories).forEach((accId) => {
        if (newAccessories[accId].slot === slot && accId !== accessoryId) {
          // If we are placing something on an occupied slot, we swap it back to the dragged accessory's old slot
          const currentOccupant = newAccessories[accId];
          const oldSlotOfDragged = state.accessories[accessoryId].slot;

          const occupantAcc = ACCESSORIES.find(a => a.id === accId);
          if (occupantAcc && occupantAcc.allowedSlots.includes(oldSlotOfDragged)) {
            // Swap slots!
            newAccessories[accId] = { ...currentOccupant, slot: oldSlotOfDragged };
          } else {
            // Cannot swap, remove occupant
            delete newAccessories[accId];
          }
        }
      });
    }

    newAccessories[accessoryId] = {
      ...newAccessories[accessoryId],
      slot
    };

    return {
      accessories: newAccessories,
      selectedThemeId: 'custom'
    };
  }),

  setTheme: (themeId) => set((state) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return {};

    const desk = DESKS.find(d => d.id === theme.deskId);
    const chair = CHAIRS.find(c => c.id === theme.chairId);

    const themeAccessories = theme.accessories.reduce((acc, curr) => {
      acc[curr.id] = { id: curr.id, quantity: curr.quantity, slot: curr.slot };
      return acc;
    }, {} as { [id: string]: SelectedAccessory });

    return {
      selectedThemeId: themeId,
      selectedDeskId: theme.deskId,
      selectedDeskColor: desk?.colorOptions[0].name || '',
      deskHeight: desk?.height || 74,
      selectedChairId: theme.chairId,
      selectedChairColor: chair?.colorOptions[0].name || '',
      accessories: themeAccessories
    };
  }),

  setRentalDuration: (months) => set({ rentalDuration: months }),

  toggleRoomLights: () => set((state) => ({ isRoomLightsOn: !state.isRoomLightsOn })),

  resetWorkspace: () => set({
    selectedThemeId: defaultTheme.id,
    selectedDeskId: defaultTheme.deskId,
    selectedDeskColor: DESKS.find(d => d.id === defaultTheme.deskId)?.colorOptions[0].name || '',
    deskHeight: 74,
    selectedChairId: defaultTheme.chairId,
    selectedChairColor: CHAIRS.find(c => c.id === defaultTheme.chairId)?.colorOptions[0].name || '',
    accessories: defaultTheme.accessories.reduce((acc, curr) => {
      acc[curr.id] = { id: curr.id, quantity: curr.quantity, slot: curr.slot };
      return acc;
    }, {} as { [id: string]: SelectedAccessory }),
    isRoomLightsOn: true,
    rentalDuration: 6
  })
}));
