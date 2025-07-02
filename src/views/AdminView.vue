<template>
    <div class="p-8 max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Admin: Manage Jobs</h1>
        <Card class="mb-8">
            <CardHeader>
                <CardTitle>{{ editIndex === null ? 'Add Job' : 'Update Job' }}</CardTitle>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="onSubmit" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <Label>City</Label>
                            <Input v-model="form.city" required />
                        </div>
                        <div>
                            <Label>State</Label>
                            <Input v-model="form.state" required />
                        </div>
                        <div>
                            <Label>Position</Label>
                            <Input v-model="form.position" required />
                        </div>
                        <div>
                            <Label>Department</Label>
                            <Input v-model="form.department" required />
                        </div>
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input v-model="form.description" as="textarea" required class="min-h-[80px]" />
                    </div>
                    <div class="flex gap-2">
                        <Button type="submit">{{ editIndex === null ? 'Add Job' : 'Update Job' }}</Button>
                        <Button v-if="editIndex !== null" type="button" variant="outline"
                            @click="resetForm">Cancel</Button>
                    </div>
                </form>
            </CardContent>
        </Card>

        <h2 class="text-xl font-semibold mb-2">Jobs List</h2>
        <div v-if="jobs.length === 0" class="text-gray-500">No jobs added yet.</div>
        <div v-else class="space-y-4">
            <Card v-for="(job, idx) in jobs" :key="idx">
                <CardHeader class="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>{{ job.position }} ({{ job.department }})</CardTitle>
                        <CardDescription>{{ job.city }}, {{ job.state }}</CardDescription>
                    </div>
                    <div class="flex gap-2">
                        <Button size="sm" variant="outline" @click="editJob(idx)">Edit</Button>
                        <Button size="sm" variant="destructive" @click="deleteJob(idx)">Delete</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-sm text-gray-700">{{ job.description }}</div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Job {
    city: string
    state: string
    position: string
    department: string
    description: string
}

const jobs = ref<Job[]>([])
const form = ref<Job>({
    city: '',
    state: '',
    position: '',
    department: '',
    description: '',
})
const editIndex = ref<number | null>(null)

function onSubmit() {
    if (editIndex.value === null) {
        jobs.value.push({ ...form.value })
    } else {
        jobs.value[editIndex.value] = { ...form.value }
    }
    resetForm()
}

function editJob(idx: number) {
    form.value = { ...jobs.value[idx] }
    editIndex.value = idx
}

function deleteJob(idx: number) {
    jobs.value.splice(idx, 1)
    resetForm()
}

function resetForm() {
    form.value = { city: '', state: '', position: '', department: '', description: '' }
    editIndex.value = null
}
</script>

<style scoped></style>