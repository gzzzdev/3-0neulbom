import { createCrudStore } from './_/storeFactory';
import type { i세미나DB } from '~/types';
import { model세미나 } from '../models/model세미나';
import { API_BASE_URL } from './_';


const use세미나s = createCrudStore<i세미나DB>(`${API_BASE_URL}/training-schedules`, model세미나, 30, {

});
export { use세미나s };
