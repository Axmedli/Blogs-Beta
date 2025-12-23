import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTokens = create(persist(
    (set) => ({
        accessToken: "",
        refreshToken: "",
        email: "",
        loading: false,
        setLoading: (loadingState) => set((state) => ({ ...state, loading: loadingState })),
        setAccessToken: (token) => set((state) => ({ ...state, accessToken: token })),
        setRefreshToken: (token) => set((state) => ({ ...state, refreshToken: token })),
        setEmail: (email) => set((state) => ({ ...state, email: email })),
        clearTokens: () => set((state) => ({ ...state, accessToken: "", refreshToken: "" , email: "" })),
    }), { name: "tokens" }
))