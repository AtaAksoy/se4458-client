<template>
  <header class="bg-background border-b shadow-sm">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/" class="text-xl font-bold text-primary">Kariyer.net</RouterLink>

      <!-- Actions -->
      <div>
        <template v-if="isLoggedIn">
          <Button variant="outline" @click="goToDashboard">Panel</Button>
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
import { ref } from 'vue'

const router = useRouter()

const isLoggedIn = ref(false)

function goToLogin() {
  router.push('/sign-in')
}

function goToDashboard() {
  router.push('/')
}
</script>
