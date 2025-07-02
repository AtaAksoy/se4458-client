<template>
    <div class="p-8 max-w-5xl mx-auto">
        <div class="flex justify-between items-start mb-6">
            <div>
                <h1 class="text-2xl font-bold">Yazılım Uzmanı</h1>
                <div class="text-lg text-muted-foreground font-medium">Alfemo</div>
                <div class="flex gap-2 text-sm text-gray-600 mt-1">
                    <span>İzmir (Torbalı)</span>
                    <span>•</span>
                    <span>İş Yerinde</span>
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
                        <div class="grid grid-cols-4 gap-4 text-center text-sm font-medium">
                            <div>
                                <div class="text-muted-foreground">Çalışma Şekli</div>
                                <div class="font-semibold">Tam Zamanlı</div>
                            </div>
                            <div>
                                <div class="text-muted-foreground">Pozisyon Seviyesi</div>
                                <div class="font-semibold">Uzman</div>
                            </div>
                            <div>
                                <div class="text-muted-foreground">Departman</div>
                                <div class="font-semibold">Bilgi Teknolojileri / IT</div>
                            </div>
                            <div>
                                <div class="text-muted-foreground">Başvuru Sayısı</div>
                                <div class="font-semibold">282 başvuru</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card class="mb-4">
                    <CardHeader>
                        <CardTitle>Yazılım Uzmanı</CardTitle>
                        <CardDescription>Alfemo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul class="list-disc pl-6 space-y-1 text-sm text-gray-800">
                            <li>Üniversitelerin ilgili bölümlerinden mezun (Bilgisayar Mühendisliği, Yazılım
                                Mühendisliği veya Bilgisayar Programcılığı).</li>
                            <li>Html5, Css3, Bootstrap, Javascript, Jquery, Ajax, Json, Xml bilgisine sahip.</li>
                            <li>Microsoft .NET platformu, C#, ASP.NET MVC ile uygulama geliştirme konusunda bilgi ve
                                tecrübe sahibi.</li>
                            <li>Tercihen MS SQL Server konusunda bilgi sahibi,</li>
                            <li>Birimler arası entegrasyon süreçleri hakkında bilgi sahibi,</li>
                            <li>Daha fazla bilgi için <Button variant="link" size="sm" @click="showMore = !showMore">{{
                                showMore ? 'Daha Az Göster' : 'Daha Fazla Gör' }}</Button></li>
                        </ul>
                        <div v-if="showMore" class="mt-2 text-sm text-gray-700">
                            <ul class="list-disc pl-6 space-y-1">
                                <li>Takım çalışmasına yatkın, iletişimi kuvvetli,</li>
                                <li>Analitik düşünme ve problem çözme yeteneğine sahip,</li>
                                <li>Erkek adaylar için askerlik görevini tamamlamış veya muaf.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Aday Kriterleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="mb-2 text-sm"><span class="font-semibold">Tecrübe:</span> En az 2 yıl tecrübeli
                        </div>
                        <div class="mb-2 text-sm"><span class="font-semibold">Eğitim Seviyesi:</span> Üniversite(Mezun),
                            Yüksek Lisans(Öğrenci), Yüksek Lisans(Mezun)</div>
                        <div class="mb-2 text-sm"><span class="font-semibold">Askerlik Durumu:</span> Yapıldı, Muaf
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
        <div class="text-xs text-gray-400 mt-6">Bugün güncellendi</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const showMore = ref(false)
</script>

<style scoped></style>