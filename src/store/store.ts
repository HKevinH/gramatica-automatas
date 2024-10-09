/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface StoreGraph {
  data: string;
  derivativeStrings: any[];
  setData: (data: string) => void;
  clearData: () => void;
  setDeritiveStrings: (derivativeStrings: []) => void;
}

export const useStore = create<StoreGraph>((set) => ({
  data: "",
  derivativeStrings: [],
  setData: (data) => set(() => ({ data })),
  clearData: () => set(() => ({ data: "" })),
  setDeritiveStrings: (derivativeStrings) => set(() => ({ derivativeStrings })),
}));
