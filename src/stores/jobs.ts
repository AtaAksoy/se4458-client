import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export interface Job {
  id: number
  title: string
  company: string
  city: string
  state: string
  description: string
  created_at: number
  status: boolean
}

export interface JobListResponse {
  jobs: Job[]
  total: number
  page: number
  limit: number
}

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])
  const currentJob = ref<Job | null>(null)
  const total = ref(0)
  const page = ref(1)
  const limit = ref(10)
  const loading = ref(false)
  const error = ref<string | null>(null)

  function parseJobListResponse(res: any) {
    if (Array.isArray(res)) return { jobs: res, total: res.length, page: 1, limit: res.length }
    if (res.jobs) return { jobs: res.jobs, total: res.total || res.jobs.length, page: res.page || 1, limit: res.limit || res.jobs.length }
    if (res.data) return { jobs: res.data, total: res.total || res.data.length, page: res.page || 1, limit: res.limit || res.data.length }
    return { jobs: [], total: 0, page: 1, limit: 10 }
  }

  async function fetchJobs(p = 1, l = 10) {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('http://localhost:8080/jobs/api/v1/jobs', {
        params: { page: p, limit: l },
      })
      const parsed = parseJobListResponse(res.data)
      jobs.value = parsed.jobs
      total.value = parsed.total
      page.value = parsed.page
      limit.value = parsed.limit
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Failed to fetch jobs'
    } finally {
      loading.value = false
    }
  }

  async function searchJobs(q: string, p = 1, l = 10) {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('http://localhost:8080/jobs/api/v1/jobs/search', {
        params: { q, page: p, limit: l },
      })
      const parsed = parseJobListResponse(res.data)
      jobs.value = parsed.jobs
      total.value = parsed.total
      page.value = parsed.page
      limit.value = parsed.limit
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Failed to search jobs'
    } finally {
      loading.value = false
    }
  }

  async function fetchJobById(id: number) {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(`http://localhost:8080/jobs/api/v1/jobs/${id}`)
      currentJob.value = res.data
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Failed to fetch job'
      currentJob.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    jobs,
    currentJob,
    total,
    page,
    limit,
    loading,
    error,
    fetchJobs,
    searchJobs,
    fetchJobById,
  }
}) 