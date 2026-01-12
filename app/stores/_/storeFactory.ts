import { reactive, ref, type Reactive } from 'vue';
import { defineStore } from 'pinia';
export interface iModels<iDB, iModel> {
  list: iModel[];
  fetch1: (id: string) => Promise<void>;
  fetch: () => Promise<void>;
  fetch_with: () => Promise<void>;
  // add: (body: Omit<iDB, 'id'>) => Promise<void>;
  add0: () => Promise<iModel>;
  add: (model: iModel, exceptions?: string[]) => Promise<void>;
  remove: (id: string) => Promise<void>;
  update: (body: iModel) => Promise<void>;

  loadSelf1?: (id: string) => Promise<void>;
  loadSelf?: () => Promise<void>;
  loadAll?: () => Promise<void>;
  load1?: (id: string) => Promise<void>;
}

const do토스트 = (msg: string) => console.log(msg);
// randomFn: () => Omit<iDB, 'id'>,
export function createCrudStore<iDB extends { id: string }>
  (apiUrl: string, modelXX: any, seconds: number, etc?: any,) {
  type iModel = typeof modelXX;

  return defineStore(apiUrl, (): iModels<iDB, iModel> => {




    //model 저장. 
    //모델 새로 생성.
    // const _refs = ref();


    // useState (새로고침 초기화)  pinia persist(ssr 불가) 
    const _refs = useState<Reactive<iDB>[]>(`state_${apiUrl}_fetch`, () => []);
    const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
    // const list = computed(() => _refs.value?.map((x: Reactive<any>) => new modelXX(x)) ?? []);
    const list = computed(() => _refs.value.filter(x => _outputs.value.includes(x?.id))?.map((x: Reactive<any>) => new modelXX(x)) ?? []);
    const _lastFetched = useState(`lastFetched_${apiUrl}`, () => 0);

    const fetch1 = async (id: string) => {

      const _data = await $fetch<iDB[]>(`${apiUrl}/${id}`, { method: 'get', credentials: 'include' });

      const idx = _refs.value.findIndex(x => x.id == id);
      if (idx != undefined && idx != -1)
        _refs.value[idx] = reactive(_data);
      // _refs.value.find(x => x.id == id)=
      // found = reactive(_data);
      else
        _refs.value.push(reactive(_data));

      // console.log(_refs.value);
      // console.log(_outputs.value);
      // _outputs.value = [id];//_outputs.value.filter(x => String(x) == String(id));
      _outputs.value = _refs.value.map(x => x?.id) ?? [];

      console.log(_outputs.value);

      console.log(list.value);
      _lastFetched.value = -9999999;
      return list.value.find(x => x.id == id);

    }
    const fetch1_ex = async (id: string) => {
      await fetch();//우선 땜빵.

      console.log(_outputs.value);
      _outputs.value = _outputs.value.filter(x => String(x) == String(id));

      console.log(list.value);
      return list.value.find(x => x.id == id);
    }
    const fetch = async () => {

      const now = Date.now();
      if (_refs?.value?.length > 0 && now - _lastFetched.value < seconds * 1000) {
        //  alert('이미 조회됨');
        console.log(`fetch ${apiUrl} 이미 조회됨`);
      } else {
        // if(apiUrl == 'https://dev-api.neulbom.org/api/v1/n-users')
        //   alert('조회!!!');

        try {
          const _data = await $fetch<iDB[]>(apiUrl, { method: 'get', credentials: 'include' });
          const data = ref(_data);
          if (data.value == null) {
            return;//왜 null이 올까?
          }

          //null이 올때가 있다...
          console.log(data.value);

          _refs.value = data.value?.map((x: iDB) => reactive(x)) ?? [];
          // do토스트(`${apiUrl} 조회 완료`);
          console.log(`fetch ${apiUrl} db조회 --- !!!`);


          _lastFetched.value = now;
        } catch (e: any) {
          console.log(`fetch ${apiUrl} 조회 실패:(try catch) ${e?.message ?? e}`);
          return;
        }
      }

      // _outputs.value = data.value?.map((x: iDB) => x.id) ?? [];
      // console.log(_refs.value);
      _outputs.value = _refs.value.map(x => x?.id) ?? [];



    };

    // body: Omit<iDB, 'id'> = randomFn()

    // const add0 = async () => {
    //   const model = new modelXX();
    //   return model;
    // }
    const add0 = () => {
      const model = new modelXX();
      return model;
    }
    const add = async (model: iModel, exceptions: string[] = []) => {
      if (model == undefined) {
        model = new modelXX();
        if (Object.hasOwn(model, 'doAsync생성'))
          await model.doAsync생성();
      }
      const body = { ...model.state };

      exceptions.forEach(x => delete body[x]);

      // const obj = { title: 'T:' + new Date().getTime(), description: "string", professor: '1', applicationStartDate: "2025-07-31", applicationEndDate: "2025-07-31", trainingStartDate: "2025-07-31", trainingEndDate: "2025-07-31", maxParticipants: 0, thumbnail: "string", status: "PREPARING", timeInfo: "string", note: "string" };
      // const data = await $fetch(apiUrl, { method: 'POST', mode: "cors", body: model.state, credentials: 'include' }) as iDB;
      const data = await $fetch(apiUrl, { method: 'POST', body, credentials: 'include' }) as iDB;
      // model.state.id = parseInt(data.id);
      model.state.id = data.id;

      console.log(data);
      console.log(model);
      console.log(model.state.id);
      console.log(model.state);
      _refs.value.push(reactive(model.state));
      _outputs.value.push(model.state.id);
      do토스트(`${apiUrl} 추가 완료`);

      return model;//반환해야 기준으로 생성함.. 

      // _data.value.set(model.id, model.state);
      // _models.value.set(model.id, model);
      // _map.value.set(model.id, model.state);
      // list.push(model);//new modelXX(data));
    };

    const remove = async (id: string) => {

      await $fetch(apiUrl + `/${id}`, { method: 'DELETE', credentials: 'include' });



      do토스트(`${apiUrl} 삭제 완료`);


      // _data.value.delete(id);
      // _models.value.delete(id);
      _refs.value.splice(_refs.value.findIndex((item: Reactive<iDB>) => item.id === id), 1);
      _outputs.value.splice(_outputs.value.findIndex(item => item === id), 1);

      // list.splice(list.findIndex(item => item.id === id), 1);
    };

    const update = async (model: iModel, exceptions: string[] = []) => {




      const body = { ...model.state };
      // if (model.state.nickInfo) {
      //   console.log(model.state);
      //   console.log(model.state.nickInfo);
      //   // body.nickInfo = JSON.stringify(model.state.nickInfo);
      // }
      exceptions.forEach(x => delete body[x]);

      // console.log('model.state');
      // console.log(model.state);
      const data = await $fetch(`${apiUrl}/${model.id}`, { method: 'PUT', body, credentials: 'include' }) as iDB;

      // console.log(model.state);
      // console.log(data);
      // model.state = reactive(data);

      do토스트(`${apiUrl} 수정 완료`);
      // list.find(item => item.id === model.id)!.state = data;
    };


    return { list, fetch1, fetch, add, add0, remove, update, ...etc };

  }, {
    persist: true,
    // persist: {
    //   key: `persist_${apiUrl}`,
    //   storage: 'localStorage',
    //   // beforeRestore: (value) => {
    //   //   console.log('beforeRestore', value);
    //   //   return value;
    //   // },
    //   beforeHydrate: (value) => {
    //     console.log('beforeHydrate', value);
    //     return value;
    //   },
    //   // serializer: {
    //   //   serialize: (value) => JSON.stringify(value),
    //   //   deserialize: (value) => JSON.parse(value),
    //   // },
    // }
  });
} 