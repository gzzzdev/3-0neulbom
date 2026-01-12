import { reactive } from 'vue';
import { createCrudStore } from './_/storeFactory';
import type { i수강신청DB, i출결DB } from '~/types';


import { API_BASE_URL } from './_';

//
import { model수강신청 } from '../models/model수강신청';
import { model사람 } from '../models/model사람';
import { model수업 } from '../models/model수업';
import type { model늘봄회원 } from '../models/model늘봄회원';


// import { use늘봄회원s } from './store늘봄회원s';
// import { use수업s } from './store수업s';
// import { use출결s } from './store출결s';




const apiUrl = `${API_BASE_URL}/enrolls`;
// export const는 안됨.
// const use수강신청s = createCrudStore<i수강신청DB>('/api/enrolls', model수강신청);
// Nuxt에서 환경변수 접근하는 올바른 방법



const use수강신청s = createCrudStore<i수강신청DB>(apiUrl, model수강신청, 30, {


    // 수업s: ()=>{
    //     const list = use수강신청s().list.filter(x=>true);
    //     return use수업s();
    // },




    do새연결: async (사람: model사람, 수업: model수업) => {

        const 수강신청 = use수강신청s().list.find(x => x.state?.nUserId === 사람.id && x.state?.enrollableId === 수업.state.enrollableId);
        if (수강신청) {
            useAlert().show('이미 신청한 수업입니다. ');
            return;
        }

        const 수강신청2 = new model수강신청();
        수강신청2.do새연결(사람, 수업);
        await use수강신청s().add(수강신청2);

    },

    // do늘봄연결: async (강사: model늘봄회원, 수업: model수업) => {
    //     // alert(1);

    //     // const 수강신청 = use수강신청s().list.find(x => x.state?.nUserId === 강사.id && x.state?.enrollableId === 수업.state.enrollableId);
    //     // if (수강신청) {
    //     //     useAlert().show('이미 신청한 수업입니다. ');
    //     //     return;
    //     // }

    //     // {
    //     //     const 수강신청2 = new model수강신청();
    //     //     수강신청2.do늘봄연결(강사, 수업);
    //     //     await use수강신청s().add(수강신청2, ['registrationDate']);
    //     //     useAlert().show(`${수업.제목}의 수강신청이 완료되었습니다.`);
    //     // }
    //     // else {
    //     //     useAlert().show('수업제목이 맞지 않습니다. ');
    //     // }

    // },


    do연결취소: async (수강신청: model수강신청) => {
        if (confirm(`정말 수강신청을 취소할까요?`)) {
            await use수강신청s().remove(수강신청.id);
            useAlert().show('수강신청이 취소되었습니다.');
        }
    },
    loadSelf: async () => {
        await use수강신청s().fetch();
    },
    // loadAll: async () => {
    //     //참조가 필요함.
    //     await Promise.all([
    //         use수강신청s().fetch(),
    //         use늘봄회원s().fetch(),
    //         use수업s().fetch(),
    //         use출결s().fetch(),
    //     ]);
    // },
    // load_byUser: async (userId: string) => {
    //     await Promise.all([
    //         use늘봄회원s().loadSelf1(userId),
    //         use수강신청s().fetchbyUser(userId),
    //         use수업s()?.loadSelf?.(),
    //         use출결s().fetch(),
    //     ])
    // },
    // load_byUser: async (userId: string) => {
    //     const a = async (userId: string) => {
    //         const _refs = useState(`state_${apiUrl}_fetch`, () => []);
    //         const _outputs = useState(`output_${apiUrl}_fetch`, () => []);
    //         const _lastFetched = useState(`lastFetched_${apiUrl}/user/${userId}`, () => 0);
    //         const now = Date.now();
    //         const seconds = 10;
    //         if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
    //             console.log(`${apiUrl}/user/${userId} 이미 조회됨`);
    //         }
    //         else {
    //             const { data } = await useFetch<i수강신청DB[]>(`/api/enrolls/user/${userId}`, { credentials: 'include' });
    //             const newIds = data.value?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
    //             newIds.forEach(x => _refs.value.push(reactive(x)));
    //             _lastFetched.value = now;
    //             console.log(`${apiUrl}/user/${userId} db 조회됨`);
    //         }

    //         _outputs.value = _refs.value.filter(x => x.person_id === userId).map(x => x.id) ?? [];
    //     };
    //     await Promise.all([
    //         a(userId),
    //         use수업s().fetch(),
    //         use출결s().fetch(),
    //     ])
    // },
    // load_byTraining: async (trainingId: string) => {
    //     await Promise.all([
    //         use수강신청s().fetchbyTraining(trainingId),
    //         use늘봄회원s().fetch(),
    //         use출결s().fetch(),
    //     ]);
    // },

    fetchbyUser: async (userId: string) => {

        let _refs: Ref<i수강신청DB[]> = ref([]);
        let _outputs: Ref<string[]> = ref([]);
        let _lastFetched: Ref<number> = ref(0);
        try {
            _refs = useState<i수강신청DB[]>(`state_${apiUrl}_fetch`, () => []);
            _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
            _lastFetched = useState(`lastFetched_${apiUrl}/user/${userId}`, () => 0);
        } catch (e) {
            throw createError({
                statusCode: 500,
                message: 'fetchbyUser (useState) 조회 실패',
            });
        }

        const now = Date.now();
        const seconds = 10;
        if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
            console.log(`${apiUrl}/user/${userId} 이미 조회됨`);
        }
        else {
            const _data = await $fetch<i수강신청DB[]>(`${API_BASE_URL}/enrolls/n-users/${userId}`, { method: 'get', credentials: 'include' });

            const data = ref(_data);

            try {
                const newIds = data.value?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
                newIds.forEach(x => _refs.value.push(reactive(x)));
                // _lastFetched.value = now;
                _lastFetched.value = -9999999;
                console.log(`${apiUrl}/user/${userId} db 조회됨`);
            }
            catch (e) {
                throw createError({
                    statusCode: 500,
                    message: 'fetchbyUser (after useFetch) 조회 실패',
                });
            }
        }

        console.log(_refs.value);
        console.log('_refs.value');
        try {
            _outputs.value = _refs.value.filter(x => x.nUserId === userId).map(x => x?.id) ?? [];
        }
        catch (e) {
            throw createError({
                statusCode: 500,
                message: 'fetchbyUser (after _outputs) 조회 실패',
            });
        }
    },
    // fetchbyTraining: async (trainingId: string) => {
    //     const sub = 'trainings';
        
    //     try {
    //         const _refs = useState<i수강신청DB[]>(`state_${apiUrl}_fetch`, () => []);
    //         const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
    //         const _lastFetched = useState(`lastFetched_${apiUrl}/${sub}/${trainingId}`, () => 0);
    //         const now = Date.now();
    //         const seconds = 10;
    //         if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
    //             console.log(`${apiUrl}/${sub}/${trainingId} 이미 조회됨`);
    //         }
    //         else {
                
                
                
    //             const _data = await $fetch<i수강신청DB[]>(`${API_BASE_URL}/enrolls/${sub}/${trainingId}`, { credentials: 'include' });
    //             console.log(`${API_BASE_URL}/enrolls/${sub}/${trainingId}!!!`);
    //             console.log(_data);
    //             const data = ref(_data);

    //             const newIds = data.value?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
    //             newIds.forEach(x => _refs.value.push(reactive(x)));
    //             _lastFetched.value = now;
    //             // console.log(`${apiUrl}/training/${trainingId} db 조회됨`);
    //         }
    //         _outputs.value = _refs.value.filter(x => (x.entityType == 'TRAINING') && x.sub == entityId).map(x => x.id) ?? [];
    //         // console.log(_outputs.value);
    //     } catch (e) {
    //         throw createError({
    //             statusCode: 500,
    //             message: 'fetchbyTraining +(useState) 조회 실패',
    //         });
    //     }
    // },

    fetchbyEnrollable: async (enrollableId: number) => {
        // const entityType = `${_entityType}s`;
        // const entityType = 'trainings';
        
        try {
            const _refs = useState<i수강신청DB[]>(`state_${apiUrl}_fetch`, () => []);
            const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
            const _lastFetched = useState(`lastFetched_${apiUrl}/enrollables/${enrollableId}`, () => 0);
            const now = Date.now();
            const seconds = 10;
            if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
                console.log(`${apiUrl}/enrollables/${enrollableId} 이미 조회됨`);
            }
            else {
                
                
                
                const _data = await $fetch<i수강신청DB[]>(`${API_BASE_URL}/enrolls/enrollables/${enrollableId}`, { credentials: 'include' });
                console.log(`${API_BASE_URL}/enrolls/enrollables/${enrollableId}!!!`);
                console.log(_data);
                const data = ref(_data);

                const newIds = data.value?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
                newIds.forEach(x => _refs.value.push(reactive(x)));
                // _lastFetched.value = now;
                _lastFetched.value = -9999999;
                // console.log(`${apiUrl}/training/${trainingId} db 조회됨`);
            }
            // console.log(_refs.value);

            // _outputs.value = _refs.value.map(x => x.id) ?? [];
            _outputs.value = _refs.value.filter(x => x.enrollableId == enrollableId).map(x => x.id) ?? [];
            // console.log(_outputs.value);
        } catch (e) {
            throw createError({
                statusCode: 500,
                message: 'fetchbyTraining +(useState) 조회 실패',
            });
        }
    },
    // fetchbyUser: async (userId: string) => {
    //     const list = use수강신청s().list
    //     list.splice(0, list.length);
    //     const _list = await $fetch('/api/enrolls/user/' + userId, { credentials: 'include' }) as i수강신청DB[];
    //     console.log(`fetchbyUser 조회 완료`);
    //     _list.forEach(x => list.find(y => y.id == x.id) == undefined && list.push(new model수강신청(x)));
    // },
    // fetchbyTraining: async (trainingId: string) => {
    //     const list = use수강신청s().list
    //     list.splice(0, list.length);
    //     const _list = await $fetch('/api/enrolls/training/' + trainingId, { credentials: 'include' }) as i수강신청DB[];
    //     console.log(`fetchbyUser 조회 완료`);
    //     _list.forEach(x => list.find(y => y.id == x.id) == undefined && list.push(new model수강신청(x)));
    // }

    adds: async (models: model수강신청[]) => {
        

        const _refs = useState<i수강신청DB[]>(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
        // const _lastFetched = useState(`lastFetched_${apiUrl}/user/${userId}`, () => 0);

        const items = models.map(x => x.state);
        const data = await $fetch(`${API_BASE_URL}/enrolls/bulk`, { method: 'POST', body: items, credentials: 'include' }) as i수강신청DB[];
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

// use수강신청s.do새연결 = () => {
//     console.log('do새연결');
//     // const 수강신청 = new model수강신청();
//     // 수강신청.do새연결(사람id, 수업);
//     // use수강신청s.add(수강신청.state);
// }
// use수강신청s.fetchedlist = () => {
//     if (use수강신청s.list.length > 0) {
//         return use수강신청s.fetch();
//     }
//     return use수강신청s.list;
// }


export { use수강신청s };
