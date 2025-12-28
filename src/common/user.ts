import { create } from "zustand";

export interface User {
  username: string;
}

export const userStore = create<User | undefined>(() => ({
  username: ""
}))
