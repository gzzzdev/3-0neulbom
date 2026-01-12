import { createCrudStore } from './_/storeFactory';
import type { i프로그램DB } from '~/types';
import { model프로그램 } from '../models/model프로그램';
import { API_BASE_URL } from './_';


const use프로그램s = createCrudStore<i프로그램DB>(`${API_BASE_URL}/programs`, model프로그램, 30, {

    loadSelf1: async (id: string) => {
        await use프로그램s().fetch1(id);
    },
    loadSelf: async () => {
        await Promise.all([
            use프로그램s().fetch()
        ])
    },
    // load1: (id: string) => {

    // }

});
export { use프로그램s };
