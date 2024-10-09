import { create } from "zustand";

interface StoreGraph {
  data: string;
  setData: (data: string) => void;
  clearData: () => void;
}

export const useStore = create<StoreGraph>((set) => ({
  data: "",
  setData: (data) => set(() => ({ data })),
  clearData: () => set(() => ({ data: "" })),
}));
