<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
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

const router = useRouter();

const handleSignIn = () => {
  router.push({ name: 'sign-in' })
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
        <form>
          <div class="grid gap-6">
            <div class="grid gap-6">
              <div class="grid gap-3">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div class="grid gap-3">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" class="w-full">
                Sign Up
              </Button>
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
