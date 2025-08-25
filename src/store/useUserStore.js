import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// user store

const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      setUser: (user) => set(() => ({ user: user })),
      logout: () => {
        set(() => ({ user: {} }));
      },
    }),

    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUserStore;
