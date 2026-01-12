<template>
    <img :src="img" class="h-6 w-auto m-0 p-0" />
</template>
<script setup lang="ts">
// import img from '/img/logo/circle.png';
// import img from '/img/logo/half2.png';

interface Props {
    type?: 'base' | 'half'
}
const props = withDefaults(defineProps<Props>(), {
    type: 'base'
});

const global = useAppConfig().global;

const img = computed(() => {
    return props.type === 'base' ? global.logo.base : global.logo.half;
});
</script>