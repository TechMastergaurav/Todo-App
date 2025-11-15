import {create} from "zustand";

type State = { token: string | null; setToken: (t: string | null) => void; logout: () => void; };
export const useAuth = create<State>((set) => ({
  token: localStorage.getItem("token"),
  setToken: (t) => { if (t) localStorage.setItem("token", t); else localStorage.removeItem("token"); set({ token: t }); },
  logout: () => { localStorage.removeItem("token"); set({ token: null }); }
}));

export const getToken = () => localStorage.getItem("token");
