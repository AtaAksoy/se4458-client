<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

const router = useRouter();
const authStore = useAuthStore()

const email = ref('')
const name = ref('')
const password = ref('')
const loading = ref(false)

const handleSignIn = () => {
  router.push({ name: 'sign-in' })
}

async function onSubmit(e: Event) {
  e.preventDefault()
  loading.value = true
  await authStore.register(email.value, name.value, password.value)
  loading.value = false
  if (authStore.isAuthenticated) {
    router.push({ name: 'homepage' })
  }
}

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          Welcome
        </CardTitle>
        <CardDescription>
          Sign Up with your credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <div class="grid gap-6">
            <div class="grid gap-6">
              <div class="grid gap-3">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required v-model="email" />
              </div>
              <div class="grid gap-3">
                <Label for="name">Name</Label>
                <Input id="name" type="text" placeholder="Your Name" required v-model="name" />
              </div>
              <div class="grid gap-3">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                </div>
                <Input id="password" type="password" required v-model="password" />
              </div>
              <Button type="submit" class="w-full" :disabled="loading">
                <span v-if="loading">Loading...</span>
                <span v-else>Sign Up</span>
              </Button>
              <div v-if="authStore.error" class="text-red-600 text-sm text-center">{{ authStore.error }}</div>
            </div>
            <div class="text-center text-sm">
              Have an account?
              <a @click="handleSignIn" class="underline underline-offset-4 cursor-pointer">
                Sign in
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
