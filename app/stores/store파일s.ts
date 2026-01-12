import { createCrudStore } from './_/storeFactory';
import type { i파일DB } from '~/types';
import { model파일 } from '../models/model파일';
import { API_BASE_URL } from './_';


const apiUrl = `${API_BASE_URL}/files`;

const use파일s = createCrudStore<i파일DB>(`${apiUrl}`, model파일, 30, {

    fetchbyNuser: async (nUserId: string) => {
        const apiUrl2 = `${apiUrl}/n-users/${nUserId}`; //get 으로 id만 던져서. 
        const _refs = useState<i파일DB[]>(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
        const _lastFetched = useState(`lastFetched_${apiUrl2}`, () => 0);
        const now = Date.now();
        const seconds = 10;
        if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
            console.log(`${apiUrl2} 이미 조회됨`);
        }
        else {
            const _data = await $fetch<i파일DB[]>(`${apiUrl2}`, { method: 'GET', credentials: 'include' });
            const newIds = _data?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
            newIds.forEach(x => _refs.value.push(reactive(x)));
            // _lastFetched.value = now;
            _lastFetched.value = -9999999;
            console.log(`${apiUrl2} db 조회됨`);
        }
        _outputs.value = _refs.value.filter(x => '' + x.nUserId == nUserId).map(x => x?.id) ?? [];
        // console.log(use파일s().list);
    },

    // fetchby_nUser_ex: async (userId: string) => {

    //     let _refs: Ref<i파일DB[]> = ref([]);
    //     let _outputs: Ref<string[]> = ref([]);
    //     let _lastFetched: Ref<number> = ref(0);
    //     try {
    //         _refs = useState<i파일DB[]>(`state_${apiUrl}_fetch`, () => []);
    //         _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
    //         _lastFetched = useState(`lastFetched_${apiUrl}/n-users/${userId}`, () => 0);
    //     } catch (e) {
    //         throw createError({
    //             statusCode: 500,
    //             message: 'fetchbyUser (useState) 조회 실패',
    //         });
    //     }

    //     const now = Date.now();
    //     const seconds = 10;
    //     if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
    //         console.log(`${apiUrl}/user/${userId} 이미 조회됨`);
    //     }
    //     else {
    //         const _data = await $fetch<i파일DB[]>(`${apiUrl}/n-users/${userId}`, { method: 'get', credentials: 'include' });

    //         console.log('=== _data ===')
    //         console.log(_data);
    //         console.log(_data[0]);
    //         const data = ref(_data);


    //         const newIds = data.value?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
    //         newIds.forEach(x => _refs.value.push(reactive(x)));
    //         _lastFetched.value = now;


    //         // // _refs.value = _data.map((x: iDB) => reactive(x)) ?? [];
    //         // console.log('=== _data ===')
    //         // console.log(_data);
    //         // const idx = _refs.value.findIndex(x => x.id == userId);
    //         // if (idx != undefined && idx != -1)
    //         //     _refs.value[idx] = reactive(_data);
    //         // _refs.value.find(x => x.id == id)=
    //         // found = reactive(_data);
    //         // else
    //         //     _refs.value.push(reactive(_data));
    //         console.log('=== _refs.value ===')
    //         console.log(_refs.value);
    //     }


    //     try {
    //         console.log('===_outputs.value===');

    //         _outputs.value = _refs.value.filter(x => x.nUserId == userId).map(x => x?.id) ?? [];
    //         console.log(_outputs.value);

    //         console.log(use파일s().list);


    //     }
    //     catch (e) {
    //         throw createError({
    //             statusCode: 500,
    //             message: 'fetchbyUser (after _outputs) 조회 실패',
    //         });
    //     }
    // },

});
export { use파일s };
