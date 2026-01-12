import { createCrudStore } from './_/storeFactory';
import type { i게시글DB } from '~/types';
import { model게시글 } from '../models/model게시글';
import { API_BASE_URL } from './_';

const use게시글s = createCrudStore<i게시글DB>(`${API_BASE_URL}/boards`, model게시글, 30, {

});
export { use게시글s };
