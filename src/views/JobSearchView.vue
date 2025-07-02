<template>
    <div class="p-8 max-w-5xl mx-auto">
        <div class="flex gap-2 mb-6">
            <Input v-model="searchTitle" placeholder="Yazılım Uzmanı" class="w-1/3" />
            <Input v-model="searchCity" placeholder="İzmir" class="w-1/4" />
            <Button @click="onSearch" class="h-10">İş Ara</Button>
        </div>
        <div class="flex gap-8">
            <!-- Filters -->
            <Card class="w-64 shrink-0">
                <CardHeader>
                    <CardTitle>Ülke / Şehir / İlçe</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="mb-4">
                        <Label>Ülke</Label>
                        <Select v-model="filters.country">
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Ülke seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Türkiye">Türkiye</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="mb-4">
                        <Label>Şehir</Label>
                        <Select v-model="filters.city">
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Şehir seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="city in cities" :key="city" :value="city">{{ city }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="mb-4">
                        <Label>İlçe</Label>
                        <Select v-model="filters.district">
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="İlçe seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="district in districts" :key="district" :value="district">{{ district
                                }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="mb-4">
                        <Label>Çalışma Tercihi</Label>
                        <div class="flex flex-col gap-1 mt-1">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" v-model="filters.workTypes" value="Tam zamanlı" /> Tam zamanlı
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" v-model="filters.workTypes" value="Uzaktan / Remote" /> Uzaktan /
                                Remote
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" v-model="filters.workTypes" value="Hibrit" /> Hibrit
                            </label>
                        </div>
                    </div>
                    <Button class="w-full mt-2" @click="onApplyFilters">Uygula</Button>
                </CardContent>
            </Card>
            <!-- Main Content -->
            <div class="flex-1">
                <div class="mb-4 flex items-center gap-2">
                    <span class="text-lg font-semibold">{{ jobsStore.total }} iş ilanı</span>
                </div>
                <div class="mb-2 flex flex-wrap gap-2 items-center">
                    <span v-for="filter in selectedFilters" :key="filter"
                        class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                        {{ filter }}
                        <Button size="sm" variant="ghost" class="p-0 h-4 w-4" @click="removeFilter(filter)">×</Button>
                    </span>
                    <Button v-if="selectedFilters.length" size="sm" variant="link" @click="clearFilters">Filtreleri
                        Temizle</Button>
                </div>
                <div v-if="jobsStore.loading" class="text-center py-8 text-gray-500">Yükleniyor...</div>
                <div v-else-if="jobsStore.error" class="text-center py-8 text-red-500">{{ jobsStore.error }}</div>
                <div v-else class="space-y-4">
                    <Card v-for="job in filteredJobs" :key="job.id"
                        class="cursor-pointer hover:shadow-md transition-shadow" @click="goToJobDetail(job.id)">
                        <CardHeader class="flex flex-row items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div>
                                    <CardTitle>{{ job.title }}</CardTitle>
                                    <CardDescription>{{ job.company }}</CardDescription>
                                </div>
                            </div>
                            <div class="text-xs text-gray-500">{{ job.city }}</div>
                        </CardHeader>
                        <CardContent>
                            <div class="flex items-center gap-4 text-sm">
                                <span>{{ job.city }}</span>
                                <span v-if="job.state">{{ job.state }}</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded text-xs">{{ job.description.slice(0, 60)
                                }}...</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import type { Job } from '@/stores/jobs'
import { useJobsStore } from '@/stores/jobs'

const router = useRouter()
const jobsStore = useJobsStore()

const searchTitle = ref('')
const searchCity = ref('')

const filters = ref({
    country: 'Türkiye',
    city: '',
    district: '',
    workTypes: [] as string[],
})

const cities = ['İzmir', 'İstanbul', 'Ankara']
const districts = computed(() => {
    if (filters.value.city === 'İzmir') return ['Bornova', 'Konak', 'Karşıyaka']
    if (filters.value.city === 'İstanbul') return ['Kadıköy', 'Beşiktaş', 'Şişli']
    if (filters.value.city === 'Ankara') return ['Çankaya', 'Keçiören', 'Yenimahalle']
    return []
})

const selectedFilters = computed(() => {
    const arr: string[] = []
    if (filters.value.country) arr.push(filters.value.country)
    if (filters.value.city) arr.push(filters.value.city)
    if (filters.value.district) arr.push(filters.value.district)
    for (const wt of filters.value.workTypes) arr.push(wt)
    if (searchTitle.value) arr.unshift(searchTitle.value)
    if (searchCity.value) arr.unshift(searchCity.value)
    return arr
})

const filteredJobs = computed<Job[]>(() => {
    let jobs = jobsStore.jobs
    if (filters.value.city) jobs = jobs.filter(j => j.city === filters.value.city)
    return jobs
})

function goToJobDetail(jobId: number) {
    router.push({ name: 'job-detail', params: { id: jobId } })
}

function onSearch() {
    let q = searchTitle.value
    if (searchCity.value) q += ' ' + searchCity.value
    const query = q.trim()

    if (query) {
        jobsStore.searchJobs(query, 1, 10)
    } else {
        jobsStore.fetchJobs(1, 10)
    }
    filters.value.city = searchCity.value
}

function onApplyFilters() {
    onSearch()
}

function removeFilter(filter: string) {
    if (filters.value.country === filter) filters.value.country = ''
    if (filters.value.city === filter) filters.value.city = ''
    if (filters.value.district === filter) filters.value.district = ''
    filters.value.workTypes = filters.value.workTypes.filter(wt => wt !== filter)
    if (searchTitle.value === filter) searchTitle.value = ''
    if (searchCity.value === filter) searchCity.value = ''
    onSearch()
}

function clearFilters() {
    filters.value.country = 'Türkiye'
    filters.value.city = ''
    filters.value.district = ''
    filters.value.workTypes = []
    searchTitle.value = ''
    searchCity.value = ''
    jobsStore.fetchJobs(1, 10)
}

onMounted(() => {
    jobsStore.fetchJobs(1, 10)
})
</script>

<style scoped>
.input {}
</style>