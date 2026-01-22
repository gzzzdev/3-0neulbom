<template>
    <div class="w-full h-screen flex flex-col md:flex-row bg-black">
        <template v-for="(item, index) in list" :key="index">
            <a :href="`https://${item.url}`"
                class="relative w-full md:w-1/3 h-[33vh] md:h-full group overflow-hidden cursor-pointer block">

                <!-- Background Image -->
                <div
                    class="absolute inset-0 w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                    <img :src="item.src" :alt="item.label" class="w-full h-full object-cover " />
                </div>

                <!-- Overlay -->
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500"></div>

                <!-- Content -->
                <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <div class="transform transition-all duration-500 group-hover:-translate-y-2">
                        <h2
                            class="text-white text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg leading-tight font-sans">
                            {{ item.label }}
                        </h2>
                        <div
                            class="w-12 h-1 bg-white/50 mx-auto rounded-full group-hover:w-24 transition-all duration-500">
                        </div>
                    </div>

                    <div
                        class="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <span
                            class="inline-flex items-center gap-2 text-white border border-white/50 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
                            <span class="text-sm font-medium">바로가기</span>
                            <span class="i-ph-arrow-right-bold w-4 h-4"></span>
                        </span>
                    </div>
                </div>
            </a>
        </template>
    </div>
</template>

<script setup lang="ts">
const global = useAppConfig().global;


const list = [
    { src: global.bg.src1, label: '경인교육대학교 라이즈사업단', url: 'ginrise.neulbom.org' },
    { src: global.bg.src2, label: 'i-RISE 늘봄 사업 ', url: 'i-rise.neulbom.org' },
    { src: global.bg.src3, label: '늘봄 강사 연수 ', url: 'training.neulbom.org' },
]
</script>