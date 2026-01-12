import { createCrudStore } from './_/storeFactory';
import type { i파일2, i파일2DB } from '~/types';
import { model파일2 } from '~/models/model파일2';
import { API_BASE_URL } from './_';



// const apiUrl = `${API_BASE_URL}/files`;
const apiUrl = '/api/files2';

const use파일2s = createCrudStore<i파일2DB>(`${apiUrl}`, model파일2, 30, {

    fetchbyNuser: async (nUserId: string) => {
        const apiUrl2 = `${apiUrl}/n-users/${nUserId}`; //get 으로 id만 던져서. 
        const _refs = useState<i파일2DB[]>(`state_${apiUrl}_fetch`, () => []);
        const _outputs = useState<string[]>(`output_${apiUrl}_fetch`, () => []);
        const _lastFetched = useState(`lastFetched_${apiUrl2}`, () => 0);
        const now = Date.now();
        const seconds = 10;
        if (_outputs.value.length > 0 && now - _lastFetched.value < seconds * 1000) {
            console.log(`${apiUrl2} 이미 조회됨`);
        }
        else {
            const _data = await $fetch<i파일2DB[]>(`${apiUrl2}`, { method: 'GET', credentials: 'include' });
            const newIds = _data?.filter(y => !_refs.value.some(x => x.id === y.id)).map(y => y) ?? [];
            newIds.forEach(x => _refs.value.push(reactive(x)));
            // _lastFetched.value = now;
            _lastFetched.value = -9999999;
            console.log(`${apiUrl2} db 조회됨`);
        }
        _outputs.value = _refs.value.filter(x => '' + x.nUserId == nUserId).map(x => x?.id) ?? [];
        // console.log(use파일s().list);
    },

    upload: async (model: any, exceptions: string[] = []) => {

        const formData = new FormData()
        const entrys = Object.entries(model.state);
        entrys.forEach(([key, value]) => {
            formData.append(key, value as string | File);
        })

        console.log(formData);
        const res = await $fetch(apiUrl, { method: 'POST', body: formData, credentials: 'include' });


        model.state.id = res.fileId;
        model.state.fileName = res.fileName;
        model.state.publicUrl = res.publicUrl;

        // console.log(model.state);
        // console.log(model.state.publicUrl);
        // model.state.originalName = res.originalName;


        // if (model == undefined) {
        //   model = new modelXX();
        //   if (Object.hasOwn(model, 'doAsync생성'))
        //     await model.doAsync생성();
        // }
        // const body = { ...model.state };

        // exceptions.forEach(x => delete body[x]);

        // const data = await $fetch(apiUrl, { method: 'POST', body, credentials: 'include' }) as iDB;
        // // model.state.id = parseInt(data.id);
        // model.state.id = data.id;

        // console.log(data);
        // console.log(model);
        // console.log(model.state.id);
        // console.log(model.state);
        // _refs.value.push(reactive(model.state));
        // _outputs.value.push(model.state.id);
        // do토스트(`${apiUrl} 추가 완료`);

        // return model;//반환해야 기준으로 생성함.. 

        // _data.value.set(model.id, model.state);
        // _models.value.set(model.id, model);
        // _map.value.set(model.id, model.state);
        // list.push(model);//new modelXX(data));
    },
    download: async (id: string) => {


    }
});
export { use파일2s };
