<template>
    <HeaderComponent></HeaderComponent>
    <section class="bg-muted py-12 px-4 sm:px-8">
        <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h1 class="text-3xl sm:text-4xl font-bold mb-4">Kariyer Fırsatlarını Keşfet</h1>
                <p class="text-lg mb-6">
                    <span class="font-semibold text-primary">71.755</span> iş ilanı
                    <span class="font-semibold text-primary">on binlerce</span> şirket
                </p>

                <!-- Combobox Alanı -->
                <div class="flex flex-col sm:flex-row gap-3 mb-4">
                    <!-- Pozisyon -->
                    <Combobox v-model="selectedPosition" by="label">
                        <ComboboxAnchor>
                            <div class="relative w-full max-w-sm">
                                <ComboboxInput :display-value="val => val?.label ?? ''"
                                    placeholder="Pozisyon seçin..." />
                                <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
                                    <ChevronsUpDown class="size-4 text-muted-foreground" />
                                </ComboboxTrigger>
                            </div>
                        </ComboboxAnchor>

                        <ComboboxList>
                            <ComboboxEmpty>Sonuç yok.</ComboboxEmpty>
                            <ComboboxGroup>
                                <ComboboxItem v-for="item in positionOptions" :key="item.value" :value="item">
                                    {{ item.label }}
                                    <ComboboxItemIndicator>
                                        <Check class="ml-auto h-4 w-4" />
                                    </ComboboxItemIndicator>
                                </ComboboxItem>
                            </ComboboxGroup>
                        </ComboboxList>
                    </Combobox>

                    <!-- Şehir -->
                    <Combobox v-model="selectedCity" by="label">
                        <ComboboxAnchor>
                            <div class="relative w-full max-w-sm">
                                <ComboboxInput :display-value="val => val?.label ?? ''" placeholder="Şehir seçin..." />
                                <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
                                    <ChevronsUpDown class="size-4 text-muted-foreground" />
                                </ComboboxTrigger>
                            </div>
                        </ComboboxAnchor>

                        <ComboboxList>
                            <ComboboxEmpty>Sonuç yok.</ComboboxEmpty>
                            <ComboboxGroup>
                                <ComboboxItem v-for="item in cityOptions" :key="item.value" :value="item">
                                    {{ item.label }}
                                    <ComboboxItemIndicator>
                                        <Check class="ml-auto h-4 w-4" />
                                    </ComboboxItemIndicator>
                                </ComboboxItem>
                            </ComboboxGroup>
                        </ComboboxList>
                    </Combobox>

                    <!-- Arama Butonu -->
                    <Button class="w-full sm:w-auto cursor-pointer" @click="searchJobs">
                        <Search class="mr-2 h-4 w-4" />
                        İŞ BUL
                    </Button>
                </div>
            </div>
        </div>
    </section>
    <FeaturedJobs></FeaturedJobs>
</template>

<script setup lang="ts">
import {
    Combobox,
    ComboboxAnchor,
    ComboboxInput,
    ComboboxTrigger,
    ComboboxList,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxEmpty,
    ComboboxGroup
} from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown, Check, Search } from 'lucide-vue-next'
import { ref } from 'vue'
import FeaturedJobs from '@/components/FeaturedJobs.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const selectedPosition = ref<{ label: string; value: string } | null>(null)
const selectedCity = ref<{ label: string; value: string } | null>(null)

const positionOptions = [
    { label: 'Yazılım Uzmanı', value: 'yazilim' },
    { label: 'Proje Yöneticisi', value: 'pm' },
    { label: 'Pazarlama Uzmanı', value: 'marketing' },
    { label: 'Finans Uzmanı', value: 'finans' },
    { label: 'İK Uzmanı', value: 'ik' }
]

const cityOptions = [
    { label: 'İstanbul (Avrupa)', value: 'ist-avr' },
    { label: 'İstanbul (Asya)', value: 'ist-asy' },
    { label: 'Ankara', value: 'ankara' },
    { label: 'İzmir', value: 'izmir' },
    { label: 'Bursa', value: 'bursa' }
]

function searchJobs() {
    console.log('Pozisyon:', selectedPosition.value)
    console.log('Şehir:', selectedCity.value)
}
</script>
