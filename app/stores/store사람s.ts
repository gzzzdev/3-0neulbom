import { createCrudStore } from './_/storeFactory';
import type { i사람DB } from '~/types';
import { model사람 } from '../models/model사람';
import { use수강신청s } from './store수강신청s';
import { use수업s } from './store수업s';
import { API_BASE_URL } from './_';
// import { CACHE_TIME } from './_';

// export const는 안됨.
const use사람s = createCrudStore<i사람DB>(`${API_BASE_URL}/people`, model사람, 30, {
    loadAll: async () => {
        await Promise.all([
            use사람s().fetch(),
            use수업s().fetch(),
            use수강신청s().fetch(),
        ]);
    },
    load1: (id: string) => {
        //if (import.meta.client)
        //            return;
        use사람s().fetch();
        use수업s().fetch();
        use수강신청s().fetchbyUser(id);
    }
});

export { use사람s };
