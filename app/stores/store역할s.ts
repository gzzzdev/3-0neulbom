import { createCrudStore } from './_/storeFactory';
import type { i역할DB } from '~/types';
import { model역할 } from '../models/model역할';
import { API_BASE_URL } from './_';

const use역할s = createCrudStore<i역할DB>(`${API_BASE_URL}/roles`, model역할, 30, {
    loadSelf1: async (id: string) => {
        await use역할s().fetch1(id);
    },
    loadSelf: async () => {
        await use역할s().fetch();
    },
    loadAll: async () => {
        await Promise.all([
            use역할s().fetch(),
        ]);
    }
});

export { use역할s };
