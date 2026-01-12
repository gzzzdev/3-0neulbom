
// useRuntimeConfig() 는 nuxt <script setup>이후에 사용할 수 있으나
// 현재 store초기화는 이전에 실행되므로 사용할 수 없음. 하드코딩으로 처리.
// 향후 store모델명()의 초기화를 runtime 이후로 처리하거나, 
// store모델명()의 apiurl주입시점을 늦춘다면 env파일에서 통일할 수 있음. 그전까지는 하드코딩으로 처리.

// export const is수파베이스 = true;
export const is수파베이스 = !true;
const _urls = {
    auth: is수파베이스 ? '/auth' : 'https://api.neulbom.org/auth',
    api: is수파베이스 ? '/api' : 'https://api.neulbom.org/api/v1',
}

export const AUTH_BASE_URL = _urls.auth;
export const API_BASE_URL = _urls.api;




// ------------------------------------------------------------ //






