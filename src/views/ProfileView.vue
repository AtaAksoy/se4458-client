<template>
    <div>
        <HeaderComponent />

        <div class="mt-4 mx-100">
            <Card>
                <CardHeader class="text-center">
                    <CardTitle class="text-xl">
                        İş Alarmı Oluştur
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="grid gap-6">
                        <div class="grid gap-3">
                            <Label for="keywords">Anahtar Kelimeler</Label>
                            <div class="flex gap-2">
                                <Input id="keywords" type="text" placeholder="örn: Web Geliştirici"
                                    v-model="currentKeyword" @keyup.enter="addKeyword" />
                                <Button @click="addKeyword">Ekle</Button>
                            </div>
                            <div class="flex gap-2 mt-2">
                                <Badge v-for="(keyword, index) in keywords" :key="index" variant="secondary">
                                    {{ keyword }}
                                    <button @click="removeKeyword(index)"
                                        class="ml-2 text-white hover:text-gray-200">x</button>
                                </Badge>
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-3">
                            <div class="grid gap-3">
                                <Label for="country">Ülke</Label>
                                <Select v-model="selectedCountry">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Ülke seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="country in countries" :key="country.code"
                                            :value="country.code">
                                            {{ country.name }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid gap-3">
                                <Label for="city">Şehir</Label>
                                <Select v-model="selectedCity" :disabled="!selectedCountry">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Şehir seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="city in cities" :key="city" :value="city">
                                            {{ city }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid gap-3">
                                <Label for="district">İlçe</Label>
                                <Select v-model="selectedDistrict" :disabled="!selectedCity">
                                    <SelectTrigger>
                                        <SelectValue placeholder="İlçe seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="district in districts" :key="district" :value="district">
                                            {{ district }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit" class="w-full cursor-pointer">
                            Alarm Oluştur
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card class="mt-8">
                <CardHeader>
                    <CardTitle>Mevcut Alarmlar</CardTitle>
                </CardHeader>
                <CardContent>
                    <table class="w-full">
                        <thead>
                            <tr class="text-left">
                                <th class="pb-2">Anahtar Kelimeler</th>
                                <th class="pb-2">Lokasyon</th>
                                <th class="pb-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(alarm, index) in alarms" :key="index">
                                <td class="py-2">{{ alarm.keywords.join(', ') }}</td>
                                <td class="py-2">{{ alarm.location }}</td>
                                <td class="py-2 text-right">
                                    <Button variant="ghost" size="sm">Düzenle</Button>
                                    <Button variant="destructive" size="sm" class="ml-2">Sil</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const currentKeyword = ref('');
const keywords = ref(['Web Tasarım Uzmanı']);

const addKeyword = () => {
    if (currentKeyword.value.trim() && !keywords.value.includes(currentKeyword.value.trim())) {
        keywords.value.push(currentKeyword.value.trim());
        currentKeyword.value = '';
    }
};

const removeKeyword = (index: number) => {
    keywords.value.splice(index, 1);
};

const countries = ref([
    { name: 'Türkiye', code: 'TR' }
]);
const selectedCountry = ref('TR');

const citiesByCountry = {
    TR: ['İstanbul', 'Ankara', 'İzmir']
};

const districtsByCity = {
    'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli'],
    'Ankara': ['Çankaya', 'Kızılay', 'Yenimahalle'],
    'İzmir': ['Bornova', 'Karşıyaka', 'Konak']
};

const selectedCity = ref('');
const selectedDistrict = ref('');

const cities = computed(() => citiesByCountry[selectedCountry.value] || []);
const districts = computed(() => districtsByCity[selectedCity.value] || []);


const alarms = ref([
    { keywords: ['Yazılım Geliştirici'], location: 'Ankara, Çankaya' },
    { keywords: ['UI/UX Designer', 'Frontend'], location: 'İstanbul, Kadıköy' },
]);

</script>

<style scoped></style>