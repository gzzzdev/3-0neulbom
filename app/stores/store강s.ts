import { createCrudStore } from './_/storeFactory';
import type { i강DB } from '~/types';
import { model강 } from '../models/model강';
import { use수강신청s } from './store수강신청s';
import { use수업s } from './store수업s';
import { API_BASE_URL } from './_';
// import { CACHE_TIME } from './_';

// export const는 안됨.
const apiUrl = `${API_BASE_URL}/lectures`;

const use강s = createCrudStore<i강DB>(apiUrl, model강, 30, {
    loadSelf1: async (id: string) => {
        await use강s().fetch1(id);
        // _outputs.value = _refs.value.map(x => x.id) ?? [];
    },
    loadSelf: async () => {
        await use강s().fetch();
    },
    loadAll: async () => {
        //흐음.. 
        await Promise.all([
            use수업s().fetch(),
            use강s().fetch(),
        ]);
    },

    fetchbyTraining: async (id: string) => {
        const apiUrl2 = `${apiUrl}/trainings/${id}`; //get 으로 id만 던져서. 
        const _refs = useState<i강DB[]>(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
        const _lastFetched = useState(`lastFetched_${apiUrl2}`, () => 0);
        const now = Date.now();
        const seconds = 10;
        if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
            console.log(`${apiUrl2} 이미 조회됨`);
        }
        else {
            const _data = await $fetch<i강DB[]>(`${apiUrl2}`, { method: 'GET', credentials: 'include' });
            const newIds = _data?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
            newIds.forEach(x => _refs.value.push(reactive(x)));
            // _lastFetched.value = now;
            _lastFetched.value = -9999999;
            console.log(`${apiUrl2} db 조회됨`);
        }
        _outputs.value = _refs.value.filter(x => x.trainingId == id).map(x => x?.id) ?? [];
    },

    fetchbyTrainings: async (ids: string[]) => {
        const apiUrl2 = `${apiUrl}/trainings`; // 이건 post로 ids를 던져서. 
        const _refs = useState<i강DB[]>(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
        const _lastFetched = useState(`lastFetched_${apiUrl2}`, () => 0);
        const now = Date.now();
        const seconds = 10;
        if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
            console.log(`${apiUrl2} 이미 조회됨`);
        }
        else {
            const _data = await $fetch<i강DB[]>(`${apiUrl2}`, { method: 'POST', body: { ids: ids }, credentials: 'include' });
            const newIds = _data?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
            newIds.forEach(x => _refs.value.push(reactive(x)));
            // _lastFetched.value = now;
            _lastFetched.value = -9999999;
            console.log(`${apiUrl2} db 조회됨`);
        }
        _outputs.value = _refs.value.filter(x => ids.includes(x.trainingId)).map(x => x?.id) ?? [];
    }

});

export { use강s };
