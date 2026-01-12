// import { createCrudStore } from './_/storeFactory2';
import { createCrudStore } from './_/storeFactory';
import type { i신청가능DB } from '~/types';
import { model신청가능 } from '../models/model신청가능';
import { API_BASE_URL } from './_';

const apiUrl = `${API_BASE_URL}/enrollables`;

const use신청가능s = createCrudStore<i신청가능DB>(apiUrl, model신청가능, 30, {
});
// const use신청가능s = createCrudStore<i신청가능DB>(apiUrl, model신청가능, () => new model신청가능(), 30, {
// });

export { use신청가능s };

