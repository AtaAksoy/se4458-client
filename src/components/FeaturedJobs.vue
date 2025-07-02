<template>
    <section class="bg-muted py-10 px-4 sm:px-8">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl font-semibold mb-6 text-center">ÖNE ÇIKAN İLANLAR</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Card v-for="job in jobs" :key="job.id" class="text-center p-4">
                    <img :src="job.logo" alt="Company logo" class="h-12 mx-auto mb-4 object-contain" />
                    <h3 class="text-md font-semibold">{{ job.title }}</h3>
                    <p class="text-sm text-muted-foreground mb-1">{{ job.company }}</p>
                    <p class="text-sm text-muted-foreground">{{ job.location }}</p>
                </Card>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'

const jobs = [
    {
        id: 1,
        title: 'Mutfak Şefi',
        company: 'Dosso Dossi',
        location: 'İstanbul (Avr.)',
        logo: 'https://picsum.photos/200/300'
    },
    {
        id: 2,
        title: 'Birikim Güvence Danışmanı - İstanbul',
        company: 'Agesa',
        location: 'İstanbul (Tümü)',
        logo: 'https://picsum.photos/200/300'
    },
    {
        id: 3,
        title: 'Mağaza Müdürü',
        company: 'EDWARDS',
        location: 'İstanbul (Tümü)',
        logo: 'https://picsum.photos/200/300'
    },
    {
        id: 4,
        title: 'Sigorta Danışmanı',
        company: 'Sigortamnet',
        location: 'İstanbul (Tümü)',
        logo: 'https://picsum.photos/200/300'
    },
    {
        id: 5,
        title: 'Gişe Yetkilisi',
        company: 'Hsbc',
        location: 'İstanbul (Tümü)',
        logo: 'https://picsum.photos/200/300'
    }
]
</script>
