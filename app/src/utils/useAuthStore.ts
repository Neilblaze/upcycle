import { UserModel } from '@/models/UserModel'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
    user: UserModel | null
    setUser: (user: UserModel) => void
}

export const useAuthStore = create<AuthState>()(
    devtools(
            (set) => ({
                user: null,
                setUser: (user) => set((state) => ({ user }))
            }),
            {
                name: 'bear-storage',
            }
    )
)
