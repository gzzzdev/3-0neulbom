

// import type { i늘봄회원DB } from '~/types';
//여기서 절대 import하면 안됨. 이유는 모름. 사이클 에러발생. 
import { is수파베이스 } from './_';

import { use늘봄회원s } from './store늘봄회원s';
import { use역할s } from "./store역할s"; //여기서 호출하면 에러발생.. 
import { use회원역할s } from "./store회원역할s";
import { AUTH_BASE_URL } from './_';//이게 다른쪽에서 호출된다고... 

import { model늘봄회원 } from '~/models/model늘봄회원';
import { useLog } from '~/composables/useLog';
import { useDayjs } from '~/models/utils';
// import { hasPermission, type UserRole, type EntityPermissions } from '~/utils/permissions';



const useAuthStore = defineStore(
  'm_auth888',
  () => {
    // const user = useState(`state_user`, () => null);
    const user = ref();// ref<UserWithoutPassword>();
    const _늘봄회원 = ref(undefined);


    const is팝업 = ref(false);

    const callbackURL = ref<string>();//
    //  = ref<() => void>(() => {});
    const do팝업 = (url: string) => {

      is팝업.value = true;
      callbackURL.value = url;
      // setTimeout(() => {
      //   callback();
      //   is팝업.value = false;
      // }, 1000);
    }

    const signIn_super = async (id = 3) => {
      // const woori_url = 'https://dev-api.neulbom.org';
      const response = await $fetch(`${AUTH_BASE_URL}/login/super/${id}`, { mode: "cors", method: 'POST', credentials: 'include', });
      // const response = await $fetch(`/auth/login/super`, { method: 'POST', credentials: 'include', });
      await fetchUser();



      navigateTo('/');
      // await do1();
    }
    const signIn = async (email: string, password: string) => {

      try {

        // const response = await $fetch<any>(`${AUTH_BASE_URL}/super-login`,  { body: { email, password, }, method: 'POST', credentials: 'include', });
        // 쿠키 정보 로그 출력
        // console.log('=== 쿠키 정보 ===');
        // console.log('Response headers:', response);
        // console.log('Document cookies:', document.cookie);
        // console.log('================');


        console.log(`${AUTH_BASE_URL}/login_v2`);

        const { success, message, user: theUser } = await $fetch<any>(`${AUTH_BASE_URL}/login_v2`,
          { body: { email, password, }, method: 'POST', credentials: 'include', });
        // const { success, message } = await $fetch<any>('/api/auth/login',
        //   { body: { email, password, }, method: 'POST', credentials: 'include', });

        if (success) {
          console.log(theUser);
          user.value = theUser;



          if (!false)
            await fetchUser(); //여기서 예외처리함. 

          // user.value?.role_names = ['시스템루트','관리자','강사',"기관"];


          navigateTo('/');
        }
        else
          throw createError({ statusCode: 401, statusMessage: message || '로그인에 실패했습니다' });
      } catch (e: any) {
        throw createError({ statusCode: 401, statusMessage: e.message || '로그인 중 오류가 발생했습니다' });
      }
    };

    const signOut = async () => {
      // neoulbom.org 도메인의 쿠키 삭제

      // const accessToken = useCookie('accessToken');
      // console.log(accessToken.value);
      // return;

      // logout/ 슬래시 꼭 붙여줘야함. 
      // , mode: 'cors', credentials: 'include' 
      // const data = await $fetch(`/auth/naver/logout`, { method: 'post', credentials: 'include' });
      console.log('logout 시작');
      $fetch(`${AUTH_BASE_URL}/logout/`, { method: 'post', credentials: 'include' })
        .then(data => {

          console.log('logout 성공');
        })
        .catch(e => {

          console.log('logout 실패');
        }).finally(() => {
          user.value = null;
          _늘봄회원.value = null;
          navigateTo('/');
        })

      return;
      try {
        const success = await $fetch(`${AUTH_BASE_URL}/logout`, { method: 'get', credentials: 'include' });
        if (success || true) {
          user.value = null;
          _늘봄회원.value = null;
          navigateTo('/');
        }
        else
          throw createError({ statusCode: 401, statusMessage: '로그아웃에 실패했습니다' });

      } catch (e: any) {
        throw createError({ statusCode: 401, statusMessage: e.message || '로그아웃 중 오류가 발생했습니다' });
      }
    };

    const signOut2 = async () => {
      // neoulbom.org 도메인의 쿠키 삭제


      try {
        const { success } = await $fetch(`${AUTH_BASE_URL}/logout`, { method: 'get', credentials: 'include' });
        if (success) {
          user.value = null;
          _늘봄회원.value = null;
          navigateTo('/');
        }
        else
          throw createError({ statusCode: 401, statusMessage: '로그아웃에 실패했습니다' });

      } catch (e: any) {
        throw createError({ statusCode: 401, statusMessage: e.message || '로그아웃 중 오류가 발생했습니다' });
      }
    };
    const is만료 = () => {
      // console.log(user.value.만료시간);
      if (!user.value || !user.value.만료시간) {
        console.log('만료시간이 없음.1')
        user.value = null;
        return false;
      }
      const 만료 = new Date(user.value.만료시간 * 1000);//;
      if (isNaN(만료.getTime())) {
        console.log('만료시간이 없음.2');
        user.value = null;
        return false; // 잘못된 날짜
      }
      const isValid = 만료.getTime() > new Date().getTime(); // 만료시간이 현재보다 미래여야 true

      if (!isValid) {
        console.log(만료);
        console.log(new Date());
        console.log('만료시간이 다됨.');
        user.value = null;
      }
      return isValid;
    };


    const fetchUser = async (expired_at: Date = user?.value?.만료시점) => {

      try {

        user.value = await $fetch(`${AUTH_BASE_URL}/users/me`, { method: 'get', credentials: 'include' });

        if (expired_at) {
          user.value.만료시점 = expired_at;//.getTime() / 1000;
        }

        console.log(user.value);

        console.log('=========user.value=========');

        useLog().user(user.value.nUser.name ?? 'unknown', '로그인 후 (fetchUser) - sns-4 ', { user: user.value });

        if (!is수파베이스) {
          const _role_names = user.value.nUser.roles.map(x => x.name);
          // const _role_names = ['시스템루트', '관리자', '강사', "기관"];
          console.log(user.value.nUser);

          user.value.role_names = _role_names;//['시스템루트'];//user.value.nUser?.role_names;

          useLog().user(user.value.nUser.name ?? 'unknown', '로그인 후 (fetchUser) - sns-5 ', { role_names: _role_names });

          // user.value?.role_names = ['관리자','강사'];
          // user.value?.role_names = ['강사'];
        }
        return;

        console.log('---------fetchUser--------');
        console.log(user.value?.role_names);
        is만료();

        if (false)//page늘봄회원 등 필요할때만 부르게 v2에서 다 받아옴. 
          await get늘봄회원();

      } catch (e: any) {
        throw createError({ statusCode: 401, statusMessage: e.message || '회원정보를 불러오는 중 오류가 발생했습니다' });
      }
    };

    const fetchUser_ex = async () => {
      try {
        user.value = await $fetch(`${auth}/user_v2`, { method: 'get', credentials: 'include' });

        user.value.role_names = user.value.nUser.role_names;
        console.log('---------fetchUser--------');
        console.log(user.value?.role_names);
        is만료();

        if (false)//page늘봄회원 등 필요할때만 부르게 v2에서 다 받아옴. 
          await get늘봄회원();

      } catch (e: any) {
        throw createError({ statusCode: 401, statusMessage: e.message || '회원정보를 불러오는 중 오류가 발생했습니다' });
      }
    }

    // const get접근권한 = ()=>{}


    // Two Track: 
    // 접근권한제어 : useNuserRoles컴포저블로 처리함.  (새로고침때 캐싱이 안됨)
    // 각 페이지의 연동 : get늘봄회원()으로 처리함. 

    // 현재의 useXXXs()  pinia 상태관리는 ssr에서 접근제어가 안됨.
    // 따라서 class instance로 대수술하기 전까지는 별도의  useNuserRoles함수를 써줘야함. 
    // 붙일때가 골떄림. 


    const get늘봄회원 = async (): Promise<any> => {

      if (false) {
        const is만료됨 = () => user.value?.만료시점 == undefined || useDayjs(user.value?.만료시점).diff(new Date(), 'minutes') <= 0;

        if (user.value != null && user.value != undefined && is만료됨()) {
          await signOut();
          navigateTo('/');
          return;
          // return undefined;
        }
      }

      // if (force) //2번 체크할수 있으나 진입하는 경우가 있기때문에...
      //   await fetchUser();
      // else 
      {
        if (_늘봄회원.value)
          return _늘봄회원.value;
        if (!user.value)
          return undefined;
      }


      const 늘봄id = user.value.nUser.id; //await use늘봄회원s().fetchbyUuid(user.value.id);
      // const 늘봄id = await use늘봄회원s().fetchbyUuid(user.value.id);

      if (늘봄id == undefined)//바로 가도 되는지.. 
        return undefined;
      // navigateTo('/signup2');



      await Promise.all([

        use회원역할s().fetchbyUser(늘봄id),//, force),//갱신된 경우...
        use역할s().fetch(),
      ]);
      console.log('===use회원역할s().list===');
      console.log(use회원역할s().list);
      console.log('the늘봄회원');
      console.log(user.value.nUser);
      const the늘봄회원 = new model늘봄회원(user.value.nUser as any);

      //use늘봄회원s().list.find(x => x.id == 늘봄id);

      // console.log(늘봄id);
      // console.log(use늘봄회원s().list);
      // console.log(the늘봄회원);
      _늘봄회원.value = the늘봄회원;
      return the늘봄회원;
    }

    const is회원 = computed(() => user.value != null);




    return {
      user,//: authUser,
      _늘봄회원,

      get늘봄회원,


      // is만료,

      만료시간: computed(() => {
        const ts = user?.value?.만료시간;
        if (!ts) return 'unknown';
        const date = new Date(ts * 1000);
        if (isNaN(date.getTime())) return 'unknown';
        return date.toTimeString().slice(0, 5); // HH:MM
      }),

      is회원,
      fetchUser,
      signIn_super,
      signIn,
      signOut,
      is팝업,
      do팝업,
      callbackURL,
    };
  },
  { persist: true, },
);

export { useAuthStore };