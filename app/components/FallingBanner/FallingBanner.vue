<template>
    <div ref="el">
        <div class="h-10">
            <template v-for="item in items" :key="item">
                <UButton :style="{ backgroundColor: item.color }" variant="solid" :to="item.to"
                    @click.stop="() => doOpen(item)" class="text-white text-md h-full px-2 md:px-4">
                    <template #trailing>
                        <UIcon class="h-5 w-5" :name="item.icon" :class="item.class" />
                    </template>
                    {{ item.label }}
                </UButton>
            </template>
        </div>

        <transition>
            <div v-if="onoff" class="absolute left-0 w-full z-1" :style="{ backgroundColor: selectedItem.color }">
                <div class="max-w-7xl mx-auto p-5">
                    <div class="text-white text-2xl">{{ selectedItem.label }}</div>
                </div>
                <div class="flex flex-wrap justify-between max-w-7xl mx-auto  p-5 md:px-10">
                    <template v-for="children in selectedItem.childrens" :key="children">
                        <div class="flex flex-col min-w-15">
                            <template v-for="item in children" :key="item">
                                <UButton :to="item.to" variant="link" class="text-white">
                                    {{ item.label }}
                                </UButton>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </transition>
    </div>

</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
interface Item {
    label: string, color: string, icon: string, class: string, to: string,
}
interface Props {
    items: Item[],
}
const props = withDefaults(defineProps<Props>(), {
    items: () => [],
});

const el = useTemplateRef<HTMLElement>('el');

onClickOutside(el, (e: any) => {
    onoff.value = false;
    selectedItem.value = null;
})


const onoff = ref(false);
const selectedItem = ref<any>(null);


const doOpen = (item: any) => {
    if (item.to)
        return;
    if (onoff.value && selectedItem.value.label == item.label) {
        onoff.value = false;
        selectedItem.value = null;
        // return;
    }
    else {
        onoff.value = true;
        selectedItem.value = item;
    }
}

</script>

<style>
.v-enter-active,
.v-leave-active {
    transition:
        clip-path 0.4s cubic-bezier(0.22, 0.61, 0.36, 1),
        opacity 0.4s ease-out;
}

.v-enter-from,
.v-leave-to {
    clip-path: inset(0 0 100% 0);
    opacity: 0;
}

.v-enter-to,
.v-leave-from {
    clip-path: inset(0 0 0 0);
    opacity: 1;
}
</style>