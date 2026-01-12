import { reactive, ref, type Reactive } from 'vue';
import { defineStore } from 'pinia';



// interface _iModel {
//   new (...args: any[]): 
//   {
//     state: any;
//     do생성: () => void;
//   };
// }

export interface iModels<iDB, iModel> {
  list: iModel[];
  fetch: () => Promise<void>;
  // add: (body: Omit<iDB, 'id'>) => Promise<void>;
  add: (model: iModel) => Promise<void>;
  remove: (id: string) => Promise<void>;
  update: (body: iDB) => Promise<void>;
}

const do토스트 = (msg: string) => console.log(msg);
// randomFn: () => Omit<iDB, 'id'>,
export function createCrudStore<iDB extends { id: string }>
  (apiUrl: string, modelXX: any, etc?: any) {
  type iModel = typeof modelXX;

  return defineStore(apiUrl, (): iModels<iDB, iModel> => {


    //model 저장. 
    //모델 새로 생성.
    // const _refs = ref();
    const _refs = useState('state_'+apiUrl, () => []);
    const list = computed(() => _refs.value?.map((x: Reactive<any>) => new modelXX(x)) ?? []);


    const fetch = async () => {

      
      // 클라이언트 서버 중복통신 방지용. 
      const { data } = await useFetch<iDB[]>(apiUrl, { credentials: 'include', onResponseError: () => { return; } });

      console.log(data.value?.length);
      
      _refs.value = data.value.map((x: iDB) => reactive(x));


      do토스트(`${apiUrl} 조회 완료`);
    };

    // body: Omit<iDB, 'id'> = randomFn()
    const add = async (model: iModel) => {
      if (model == undefined) {
        model = new modelXX();
        if (Object.hasOwn(model, 'doAsync생성'))
          await model.doAsync생성();
      }
      const data = await $fetch(apiUrl, { method: 'POST', body: model.state, credentials: 'include' }) as iDB;
      console.log(data);
      console.log(data.id);
      model.id = data.id;
      do토스트(`${apiUrl} 추가 완료`);

      _refs.value.push(model.state);
      // _data.value.set(model.id, model.state);
      // _models.value.set(model.id, model);
      // _map.value.set(model.id, model.state);
      // list.push(model);//new modelXX(data));
    };

    const remove = async (id: string) => {
      await $fetch(apiUrl, { method: 'DELETE', body: { id }, credentials: 'include' });
      do토스트(`${apiUrl} 삭제 완료`);


      // _data.value.delete(id);
      // _models.value.delete(id);
      _refs.value.splice(_refs.value.findIndex((item: iDB) => item.id === id), 1);
      // list.splice(list.findIndex(item => item.id === id), 1);
    };

    const update = async (model: iModel) => {
      // console.log('model.state');
      // console.log(model.state);
      const data = await $fetch(apiUrl, { method: 'PUT', body: model.state, credentials: 'include' }) as iDB;

      // console.log(model.state);
      // console.log(data);
      // model.state = reactive(data);

      do토스트(`${apiUrl} 수정 완료`);
      // list.find(item => item.id === model.id)!.state = data;
    };


    return {  list, fetch, add, remove, update, ...etc };

  }, { persist: true });
} 