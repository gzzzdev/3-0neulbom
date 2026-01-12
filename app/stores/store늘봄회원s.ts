import { createCrudStore } from './_/storeFactory';
import type { i늘봄회원DB } from '~/types';
import { model늘봄회원 } from '../models/model늘봄회원';
import { use출결s } from './store출결s';
import { API_BASE_URL } from './_';

import { use수업s } from './store수업s';
import { use수강신청s } from './store수강신청s';

const apiUrl = `${API_BASE_URL}/n-users`;
// export const는 안됨.
const use늘봄회원s = createCrudStore<i늘봄회원DB>(apiUrl, model늘봄회원, 30, {
    loadSelf: async () => {
        await use늘봄회원s().fetch();
    },
    loadSelf1: async (id: string) => {
        await use늘봄회원s().fetch1(id);
    },
    loadAll: async () => {

        await Promise.all([
            use늘봄회원s().fetch(),
            use수업s().fetch(),
            use수강신청s().fetch(),
            use출결s().fetch(),
        ])

    },
    load1: (id: string) => {
        //if (import.meta.client)
        //            return;
        use늘봄회원s().fetch();
        use수업s().fetch();
        use수강신청s().fetchbyUser(id);
    },
    fetchbyUuid: async (uuid: string) => {

        console.log(uuid);
        // const _refs = useState(`state_${apiUrl}/uuid/${uuid}_fetch`, () => []);
        // const _outputs = useState(`output_${apiUrl}/uuid/${uuid}_fetch`, () => []);

        const _refs = useState(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);

        //예는 호환도면 안됨. 
        // const _outputs = useState(`output_${apiUrl}/uuid/${uuid}`, () => []);
        const _lastFetched = useState(`lastFetched_${apiUrl}/uuid/${uuid}`, () => 0);
        const now = Date.now();
        const seconds = 10;

        if (_outputs.value.length > 0 && _refs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
            console.log(`${apiUrl}/uuid/${uuid} 이미 조회됨`);

        }
        else {
            //강력 새로고침을 안하면 된다는 가설. 혹은 강력새로고침때 재로그인을 요청해야함. 
            //강력 새로고침으로 세션? jwt가 날라간다. // 그런 로그인 자체가 풀려야하는데. is만료체크가 제대로 되지 않은 것이다. 

            //이게 ssr 에서 사용할 수 없었는 듯. 
            const _data = await $fetch<i늘봄회원DB>(`${API_BASE_URL}/n-users/uuid/${uuid}`, { credentials: 'include' });
            const data = ref(_data);

            // console.log('data.value-console.log(_refs.value);');
            // console.log(_refs.value);
            // console.log(data.value);
            if (!_refs.value.find(x => x?.id == data.value?.id))
                _refs.value.push(reactive(data.value));
            _lastFetched.value = now;
            // console.log(`${apiUrl}/uuid/${uuid} db 조회됨`);
        }


        const found = _refs.value.find(x => String(x?.uuid) == String(uuid))
        //output 은 안만져도 됨. 
        _outputs.value = found == undefined ? [] : [found.id!];
        return found?.id ?? undefined;
        // _outputs.value = _refs.value.filter(x => String(x?.uuid) == String(uuid)).map(x => x.id) ?? [];//여기서 못찾는건 있을수 있음. 
        // return _outputs.value?.[0] ?? undefined;
        // console.log('_outputs.value');
        // console.log(_outputs.value);
    }
});
export { use늘봄회원s };
