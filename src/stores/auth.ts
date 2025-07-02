import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

interface UserPublic {
  id: number
  email: string
}

interface AuthResponse {
  error?: string
  status?: string
  token?: string
  user?: UserPublic
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserPublic | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const error = ref<string | null>(null)

  if (token.value) {
    // Optionally, decode token or fetch user info
  }

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    error.value = null
    try {
      const res = await axios.post<AuthResponse>(
        '/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (res.data.token) {
        token.value = res.data.token
        user.value = res.data.user || null
        localStorage.setItem('token', res.data.token)
      } else {
        error.value = res.data.error || 'Login failed'
      }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Login failed'
    }
  }

  async function register(email: string, password: string) {
    error.value = null
    try {
      const res = await axios.post<AuthResponse>(
        '/auth/register',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (res.data.token) {
        token.value = res.data.token
        user.value = res.data.user || null
        localStorage.setItem('token', res.data.token)
      } else {
        error.value = res.data.error || 'Registration failed'
      }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Registration failed'
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  }
}) 