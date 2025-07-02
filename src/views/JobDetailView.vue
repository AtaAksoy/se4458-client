<template>
    <HeaderComponent></HeaderComponent>
    <div class="p-8 max-w-5xl mx-auto">
        <div v-if="jobsStore.loading" class="text-center py-8 text-gray-500">Yükleniyor...</div>
        <div v-else-if="jobsStore.error" class="text-center py-8 text-red-500">{{ jobsStore.error }}</div>
        <div v-else-if="jobsStore.currentJob" class="space-y-6">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h1 class="text-2xl font-bold">{{ jobsStore.currentJob.title }}</h1>
                    <div class="text-lg text-muted-foreground font-medium">{{ jobsStore.currentJob.company }}</div>
                    <div class="flex gap-2 text-sm text-gray-600 mt-1">
                        <span>{{ jobsStore.currentJob.city }}{{ jobsStore.currentJob.state ? `
                            (${jobsStore.currentJob.state})` : '' }}</span>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Button variant="default">Başvur</Button>
                    <Button variant="outline">Kaydet</Button>
                </div>
            </div>
            <div class="flex gap-8">
                <div class="flex-1">
                    <Card class="mb-4">
                        <CardContent class="p-4">
                            <div class="grid grid-cols-2 gap-4 text-center text-sm font-medium">
                                <div>
                                    <div class="text-muted-foreground">Şirket</div>
                                    <div class="font-semibold">{{ jobsStore.currentJob.company }}</div>
                                </div>
                                <div>
                                    <div class="text-muted-foreground">Konum</div>
                                    <div class="font-semibold">{{ jobsStore.currentJob.city }}{{
                                        jobsStore.currentJob.state ? `, ${jobsStore.currentJob.state}` : '' }}</div>
                                </div>
                                <div>
                                    <div class="text-muted-foreground">Durum</div>
                                    <div class="font-semibold">{{ jobsStore.currentJob.status ? 'Aktif' : 'Pasif' }}
                                    </div>
                                </div>
                                <div>
                                    <div class="text-muted-foreground">Oluşturulma</div>
                                    <div class="font-semibold">{{ formatDate(jobsStore.currentJob.created_at) }}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card class="mb-4">
                        <CardHeader>
                            <CardTitle>{{ jobsStore.currentJob.title }}</CardTitle>
                            <CardDescription>{{ jobsStore.currentJob.company }}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="prose max-w-none">
                                <p class="text-sm text-gray-800 whitespace-pre-wrap">{{ jobsStore.currentJob.description
                                }}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div class="w-80 shrink-0">
                    <div class="text-sm font-semibold mb-2">İlgini Çekebilecek İlanlar</div>
                    <Card class="mb-2">
                        <CardContent class="p-3">
                            <div class="font-medium">Backend Developer - Node.Js</div>
                            <div class="text-xs text-gray-600">VIGO TEKNOLOJİ VE LOJİSTİK</div>
                            <div class="text-xs text-gray-500">İstanbul(Asya) • Hibrit</div>
                            <div class="text-xs text-gray-500">Tam zamanlı</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent class="p-3">
                            <div class="font-medium">Yazılım Uzmanı</div>
                            <div class="text-xs text-gray-600">DATA SİSTEM İŞE ALIM HİZMETLERİ</div>
                            <div class="text-xs text-gray-500">İstanbul(Avr) • Hibrit</div>
                            <div class="text-xs text-gray-500">Tam zamanlı</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div class="text-xs text-gray-400 mt-6">{{ formatDate(jobsStore.currentJob.created_at) }} güncellendi</div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">İş ilanı bulunamadı</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useJobsStore } from '@/stores/jobs'
import HeaderComponent from '@/components/HeaderComponent.vue'

const route = useRoute()
const jobsStore = useJobsStore()

function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

onMounted(async () => {
    const jobId = parseInt(route.params.id as string)
    if (jobId) {
        await jobsStore.fetchJobById(jobId)
    }
})
</script>

<style scoped></style>