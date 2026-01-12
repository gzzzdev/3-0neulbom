import { createCrudStore } from './_/storeFactory';
import type { i회원역할DB } from '~/types';

import { API_BASE_URL } from './_';
import { model회원역할 } from '~/models';

const apiUrl = `${API_BASE_URL}/n-user-roles`;
const use회원역할s = createCrudStore<i회원역할DB>(apiUrl, model회원역할, 30, {
    loadSelf1: async (id: string) => {
        await use회원역할s().fetch1(id);
    },
    loadSelf: async () => {
        await use회원역할s().fetch();
    },
    loadAll: async () => {
        await Promise.all([
            use회원역할s().fetch(),
        ]);
    },
    fetchbyUser: async (userId: string, force = false) => {

        const _refs = useState<i회원역할DB[]>(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
        const _lastFetched = useState(`lastFetched_${apiUrl}/user/${userId}`, () => 0);



        const now = Date.now();
        const seconds = 10;
        if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000 && !force) {
            console.log(`${apiUrl}/user/${userId} 이미 조회됨`);
        }
        else {
            if (force)
                _refs.value = [];//.clear();

            const _data = await $fetch<i회원역할DB[]>(`${apiUrl}/n-users/${userId}`, { credentials: 'include' });
            const data = ref(_data);


            const newIds = data.value?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
            newIds.forEach(x => _refs.value.push(reactive(x)));
            // _lastFetched.value = now;
            _lastFetched.value = -9999999;
            console.log(`${apiUrl}/user/${userId} db 조회됨`);
        }
        _outputs.value = _refs.value.filter(x => x.nUserId === userId).map(x => x?.id) ?? [];
    }

});

export { use회원역할s };
