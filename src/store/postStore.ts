import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserSchema } from '@/components/data-table/columns';

interface UserStore {
  newPosts: User[];
  addPost: (user: User) => void;
  updatePost: (user: User) => void;
  removePost: (id: number) => void;
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
      updatePost: (user) => {
        try {
          const validatedUser = UserSchema.parse(user);
          set((state) => ({
            newPosts: state.newPosts.map((p) => (p.id === validatedUser.id ? validatedUser : p)),
          }));
        } catch (error) {
          console.error('Invalid user data for update:', error);
        }
      },
      removePost: (id) => {
        set((state) => ({ newPosts: state.newPosts.filter((p) => p.id !== id) }));
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
