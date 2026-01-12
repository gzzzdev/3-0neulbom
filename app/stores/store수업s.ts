import { createCrudStore } from './_/storeFactory';
import type { i수업DB } from '~/types';
import { model수업 } from '../models/model수업';
import { use사람s } from './store사람s';
import { use늘봄회원s } from './store늘봄회원s';
import { use수강신청s } from './store수강신청s';
import { use강s } from './store강s';
import { API_BASE_URL } from './_';
// import { CACHE_TIME } from './_';
// export const는 안됨.

import { use신청가능s } from '~/stores/store신청가능s';
const use수업s = createCrudStore<i수업DB>(`${API_BASE_URL}/trainings`, model수업, 30, {


    fetch_with:async()=>{//무한루프 돌지는 않을지..
        await use신청가능s().fetch();
        await use수업s().fetch();
    },
    // fetch1_with: async (id: string) => {
    //     await use수업s().fetch1(id);
    //     await use신청가능s().fetch1();
    // },

    loadSelf1: async (id: string) => {
        await use수업s().fetch1(id);
        // _outputs.value = _refs.value.map(x => x.id) ?? [];
    },
    loadAll: async () => {

        await Promise.all([

            use수업s().fetch(),
            use늘봄회원s().fetch(),
            use사람s().fetch(),
            use수강신청s().fetch(),
            use강s().fetch(),
        ]);
    },

});
export { use수업s };
