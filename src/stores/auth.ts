import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

interface UserPublic {
  id: number
  email: string
  name: string
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
  }

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    error.value = null
    try {
      const res = await axios.post<AuthResponse>(
        'http://localhost:8080/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } },
      )
      if (res.data.token) {
        token.value = res.data.token
        user.value = res.data.user || null
        localStorage.setItem('token', res.data.token)
        if (user.value) {
          localStorage.setItem('user', JSON.stringify(user.value))
        }
      } else {
        error.value = res.data.error || 'Login failed'
      }
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Login failed'
    }
  }

  async function register(email: string, name: string, password: string) {
    error.value = null
    try {
      const res = await axios.post<AuthResponse>(
        'http://localhost:8080/auth/register',
        { email, name, password },
        { headers: { 'Content-Type': 'application/json' } },
      )
      if (res.data.token) {
        token.value = res.data.token
        user.value = res.data.user || null
        localStorage.setItem('token', res.data.token)
        if (user.value) {
          localStorage.setItem('user', JSON.stringify(user.value))
        }
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
    localStorage.removeItem('user')
  }

  if (!user.value) {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        user.value = JSON.parse(userStr)
      } catch {}
    }
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
