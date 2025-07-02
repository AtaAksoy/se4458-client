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
                            <Label>Title</Label>
                            <Input v-model="form.title" required />
                        </div>
                        <div>
                            <Label>Company</Label>
                            <Input v-model="form.company" required />
                        </div>
                        <div>
                            <Label>City</Label>
                            <Input v-model="form.city" required />
                        </div>
                        <div>
                            <Label>State</Label>
                            <Input v-model="form.state" required />
                        </div>
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input v-model="form.description" as="textarea" required class="min-h-[80px]" />
                    </div>
                    <div class="flex gap-2">
                        <Button type="submit" :disabled="jobsStore.loading">
                            <span v-if="jobsStore.loading">Loading...</span>
                            <span v-else>{{ editIndex === null ? 'Add Job' : 'Update Job' }}</span>
                        </Button>
                        <Button v-if="editIndex !== null" type="button" variant="outline"
                            @click="resetForm">Cancel</Button>
                    </div>
                    <div v-if="jobsStore.error" class="text-red-600 text-sm">{{ jobsStore.error }}</div>
                </form>
            </CardContent>
        </Card>

        <h2 class="text-xl font-semibold mb-2">Jobs List</h2>
        <div v-if="jobsStore.loading" class="text-center py-8 text-gray-500">Yükleniyor...</div>
        <div v-else-if="jobsStore.error" class="text-center py-8 text-red-500">{{ jobsStore.error }}</div>
        <div v-else-if="jobsStore.jobs.length === 0" class="text-gray-500">No jobs added yet.</div>
        <div v-else class="space-y-4">
            <Card v-for="job in jobsStore.jobs" :key="job.id">
                <CardHeader class="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>{{ job.title }}</CardTitle>
                        <CardDescription>{{ job.company }}</CardDescription>
                    </div>
                    <div class="flex gap-2">
                        <Button size="sm" variant="outline" @click="editJob(job)">Edit</Button>
                        <Button size="sm" variant="destructive" @click="deleteJob(job.id)">Delete</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-sm text-gray-700">
                        <div><strong>Location:</strong> {{ job.city }}{{ job.state ? `, ${job.state}` : '' }}</div>
                        <div><strong>Status:</strong> {{ job.status ? 'Active' : 'Inactive' }}</div>
                        <div><strong>Description:</strong> {{ job.description.slice(0, 100) }}...</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Job, CreateJobRequest } from '@/stores/jobs'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()

const form = ref<CreateJobRequest>({
    title: '',
    company: '',
    city: '',
    state: '',
    description: '',
})
const editIndex = ref<number | null>(null)

async function onSubmit() {
    try {
        if (editIndex.value === null) {
            await jobsStore.createJob(form.value)
        } else {
            await jobsStore.updateJob(editIndex.value, form.value)
        }
        resetForm()
    } catch (error) {
    }
}

function editJob(job: Job) {
    form.value = {
        title: job.title,
        company: job.company,
        city: job.city,
        state: job.state,
        description: job.description,
    }
    editIndex.value = job.id
}

async function deleteJob(jobId: number) {
    if (confirm('Are you sure you want to delete this job?')) {
        try {
            await jobsStore.deleteJob(jobId)
        } catch (error) {
        }
    }
}

function resetForm() {
    form.value = {
        title: '',
        company: '',
        city: '',
        state: '',
        description: '',
    }
    editIndex.value = null
}

onMounted(() => {
    jobsStore.fetchJobs(1, 50)
})
</script>

<style scoped></style>