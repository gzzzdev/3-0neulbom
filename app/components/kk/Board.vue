<template>
  <div class="w-full  lg:px-4 flex flex-col h-full">
    <!-- 상단 제목/설명은 edu.vue에서만 표시 -->
    <!-- 카테고리 탭 -->
    <div class="flex flex-wrap gap-2 mb-6" v-if="categories">
      <template v-for="cat in categories">
        <button v-if="cat != ''" @click="selectedCategory = cat" :class="[
          'px-4 py-2 rounded-full text-sm font-medium border transition',
          selectedCategory === cat
            ? 'bg-slate-700 text-white border-slate-700'
            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
        ]">
          {{ cat }}
        </button>
      </template>
    </div>

    <!-- 자료 리스트 -->
    <div class="grow overflow-x-auto bg-white rounded-lg shadow ">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">번호</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">제목</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">분류</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">등록일</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(item, idx) in pagedData" :key="item.id" class="hover:bg-slate-50"
            :class="{ 'opacity-50': item.disabled }">
            <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ itemNo(idx) }}</td> -->

            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ idx + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">



              <div @click="() => (item.disabled ?? false) ? null :
                (item.type === 'content') ? do상세페이지(item.id.toString()) :
                  (item.doAction) ? item.doAction() : (item.link) && _do링크(item.link)">
                {{ item.title }}
              </div>

            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.category }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{{ item.date }}</td>

          </tr>
          <tr v-if="pagedData.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-400">자료가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="w-full flex flex-row justify-between mt-4">
      <div></div>
      <div class="w-50 flex flex-row items-center gap-2">
        <!-- <mButton icon="i-ph-caret-right-light" @click="prevPage" :disabled="page === 1">이전</mButton> -->
        <mButton variant="ghost" icon="i-ph-caret-right-light rotate-180" @click="prevPage" :disabled="page === 1" />

        <div class="text-gray-700 text-sm">{{ page + ' ' }} / {{ ' ' + totalPages }}</div>
        <!-- <mButton icon="i-ph-caret-right-light" @click="nextPage" :disabled="page === totalPages">다음</mButton> -->
        <mButton variant="ghost" icon="i-ph-caret-right-light" @click="nextPage" :disabled="page === totalPages" />
      </div>
      <div>
        <slot name="bot_right">
          <button v-if="props.do새글 && false" variant="solid" @click="() => props.do새글()" :class="[
            'px-4 py-2 rounded-full text-sm font-medium border transition',
            'bg-slate-700 text-white border-slate-700 cursor-pointer'
          ]">글쓰기</button>
        </slot>
      </div>

    </div>

    <!-- 페이지네이션 -->



  </div>
</template>

<script lang="ts">
import type { i게시글타입 } from '~/types/type기타';
export interface iItem {
  id: number;
  title: string;
  category: string;
  date: string;
  link?: string;
  type?: i게시글타입;
  disabled?: boolean;
  doAction?: () => void;

}
</script>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { defineProps } from 'vue';

const props = defineProps<{
  allData: iItem[];
  categories?: string[];
  do새글?: () => void;
}>();

const selectedCategory = ref(props.categories[0] || '전체');
const page = ref(1);
const pageSize = 10;

const filteredData = computed(() => {
  if (selectedCategory.value === '전체') return props.allData;
  return props.allData.filter(item => item.category === selectedCategory.value);
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredData.value.length / pageSize)));

const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredData.value.slice(start, start + pageSize);
});

function prevPage() {
  if (page.value > 1) page.value--;
}
function nextPage() {
  if (page.value < totalPages.value) page.value++;
}
function itemNo(idx: number) {
  return filteredData.value.length - ((page.value - 1) * pageSize + idx);
}

watch(selectedCategory, () => {
  page.value = 1;
});

const do상세페이지 = (id: string) => {
  navigateTo(`/boards/${id}`);
}
const _do링크 = (link: string) => {

  if (link.startsWith('/'))
    navigateTo(link);
  else
    window.open(link, '_blank');

}
</script>
