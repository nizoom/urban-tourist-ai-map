import { create } from "zustand";

export const useTouristStore = create((set) => ({
  preferences: {
    Nightlife: false,
    Music: false,
    Shopping: false,
    Museums: false,
    Foodie: false,
    Parks: false,
    Landmarks: false,
    Hotels: false,
  },
  togglePreference: (key) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        [key]: !state.preferences[key],
      },
    })),

  drawerState: false,
  toggleDrawer: () =>
    set((state) => ({
      drawerState: !state.drawerState,
    })),
  loadingState: false,
  toggleLoadingState: () =>
    set((state) => ({
      loadingState: !state.loadingState,
    })),
  // 🔹 new state for fetched data
  data: null, // will store { location, info, recommendation, schedule, image }
  error: null,
  setData: (payload) => set({ data: payload, error: null }),
  setError: (payload) => set({ error: payload, data: null }),

  clearData: () => set({ data: null, error: null }),
}));
