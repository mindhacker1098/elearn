import { create } from "zustand";

interface LoadingState {
  Loading: boolean;
  setLoading: (loading: boolean) => void;
};

const loadingStore = create<LoadingState>((set) => ({
  Loading: false,
  setLoading: (loading) => set({ Loading: loading }),
}));

export default loadingStore;
