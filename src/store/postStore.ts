import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserSchema } from '@/components/payments/columns';

interface UserStore {
  newPosts: User[];
  addPost: (user: User) => void;
  clearPosts: () => void;
}

export const usePostStore = create<UserStore>()(
  persist(
    (set) => ({
      newPosts: [],
      addPost: (user) => {
        try {
          const validatedUser = UserSchema.parse(user);
          set((state) => ({
            newPosts: [...state.newPosts, validatedUser],
          }));
        } catch (error) {
          console.error('Invalid user data:', error);
        }
      },
      clearPosts: () => set({ newPosts: [] }),
    }),
    {
      name: 'new-users-storage',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
