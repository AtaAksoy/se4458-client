<template>
  <header class="bg-background border-b shadow-sm">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/" class="text-xl font-bold text-primary">Kariyer.net</RouterLink>

      <!-- Actions -->
      <div>
        <template v-if="isLoggedIn">
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" class="flex items-center gap-2 select-none">
                {{ userName }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" class="w-40 p-0">
              <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100">Çıkış Yap</button>
            </PopoverContent>
          </Popover>
        </template>
        <template v-else>
          <Button class="cursor-pointer" @click="goToLogin">Giriş Yap</Button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

const router = useRouter()
const auth = useAuthStore()

const isLoggedIn = computed(() => auth.isAuthenticated)
const userName = computed(() => auth.user?.name || 'Kullanıcı')

function goToLogin() {
  router.push('/sign-in')
}

function logout() {
  auth.logout()
  router.push('/')
}
</script>
