/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Tree } from "../models/Tree";

interface StoreGraph {
  data: string;
  derivativeStrings: any[];
  tree: Tree | null;
  setData: (data: string) => void;
  clearData: () => void;
  setDeritiveStrings: (derivativeStrings: []) => void;
  setTree: (tree: Tree) => void;
  clearTree: () => void;
}
export const useStore = create<StoreGraph>((set) => ({
  data: "",
  derivativeStrings: [],
  tree: null,
  setData: (data) => set(() => ({ data })),
  clearData: () => set(() => ({ data: "" })),
  setDeritiveStrings: (derivativeStrings) => set(() => ({ derivativeStrings })),
  setTree: (tree) => set(() => ({ tree })),
  clearTree: () => set(() => ({ tree: null })),
}));
