import { createCrudStore } from './_/storeFactory';
import type { i출결DB, i수강신청DB } from '~/types';

import { use사람s } from './store사람s';
import { use수업s } from './store수업s';
import { use늘봄회원s } from './store늘봄회원s';
import { use수강신청s } from './store수강신청s';
import { API_BASE_URL } from './_';

import type { model강 } from '~/models/model강';
import type { model수강신청 } from '~/models/model수강신청';
import { model출결 } from '../models/model출결';
// export const는 안됨.
const apiUrl = `${API_BASE_URL}/attendances`;

const use출결s = createCrudStore<i출결DB>(apiUrl, model출결, 30, {

    loadAll: async () => {

        await Promise.all([

            use출결s().fetch(),
            use수강신청s().fetch(),
            use늘봄회원s().fetch(),
            use수업s().fetch(),

            // use출결s().fetch(),
        ]);
    },


    do연결: async (강: model강, 수강신청: model수강신청) => {

        const 출결 = new model출결();

        출결.do강의연결(강, 수강신청);

        await use출결s().add(출결);

        // const 수강신청 = use수강신청s().list.find(x => x.state?.person_id === 강사.id && x.state?.trainingId === 수업.id);
        // if (수강신청) {
        //     useAlert().show('이미 신청한 수업입니다. ');
        //     return;
        // }
        // {
        //     const 수강신청2 = new model수강신청();
        //     수강신청2.do늘봄연결(강사, 수업);
        //     await use수강신청s().add(수강신청2);
        //     useAlert().show(`${수업.제목}의 수강신청이 완료되었습니다.`);
        // }
        // else {
        //     useAlert().show('수업제목이 맞지 않습니다. ');
        // }

    },

    fetchbyNuserTrainings: async (enrollIds: string[]) => {

        const apiUrl2 = `${API_BASE_URL}/attendances/enrolls`;

        const _refs = useState<i출결DB[]>(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
        const _lastFetched = useState(`lastFetched_${apiUrl2}`, () => 0);
        const now = Date.now();
        const seconds = 10;
        if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
            console.log(`${apiUrl2} 이미 조회됨`);
        }
        else {
            console.log(enrollIds);

            try {
                const _data = await $fetch<i출결DB[]>(`${apiUrl2}`, { method: 'POST', body: { ids: enrollIds }, credentials: 'include' });
                console.log('출결 fetchbyNuserTraining');
                console.log(_data);
                const data = ref(_data);

                const newIds = data.value?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
                newIds.forEach(x => _refs.value.push(reactive(x)));
                _lastFetched.value = -9999999;

                console.log(`${apiUrl2} db 조회됨`);
            } catch (error) {
                console.error('출결 fetchbyNuserTraining 에러:', error);
                // 500 에러 등이 발생해도 계속 진행
                _lastFetched.value = -9999999;
            }
        }

        _outputs.value = _refs.value.filter(x => enrollIds.includes(x.enrollId)).map(x => x?.id) ?? [];
    },


    adds: async (models: model출결[]) => {
        const _refs = useState<i출결DB[]>(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
        // const _lastFetched = useState(`lastFetched_${apiUrl}/user/${userId}`, () => 0);

        const items = models.map(x => x.state);
        const data = await $fetch(`${API_BASE_URL}/attendances/bulk`, { method: 'POST', body: items, credentials: 'include' }) as i출결DB[];
        console.log(data);
        // model.state.id = parseInt(data.id);
        models.forEach((model, idx) => {
            model.state.id = data[idx].id;
            _refs.value.push(reactive(model.state));
            _outputs.value.push(model.state.id);
        });

        // _refs.value.push(model.state);
        // _outputs.value.push(model.state.id);
        console.log(`${apiUrl} 추가 완료`);
        return models;//반환해야 기준으로 생성함.. 
    },



});
export { use출결s };
