import { user } from '@prisma/client'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
    user: user | null
    isLoading: boolean
    error: string | null
    setUser: (user: user | null, isLoading: boolean, error?: string | null) => void
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            user: null,
            isLoading: true,
            error: null,
            setUser: (user, isLoading, error = null) => set((state) => ({ user, isLoading, error }))
        }),
        {
            name: 'bear-storage',
        }
    )
)
