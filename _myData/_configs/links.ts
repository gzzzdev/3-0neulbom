

export const roleEntrys = {
  '시스템루트': '/guest',
  '관리자': '/guest',
  '강사': '/guest',
  // '시스템루트': '/manager/dashboard',
  // '관리자': '/manager/dashboard',
  // '강사': '/dashboard',
  "기관": '/programs',
  // '회원': '/dashboard',
  '미인증': '/signup2',
  // '비회원': '/'
  '비회원': '/guest',
  // '비회원': '/guest/trainings'
};

const PASS = '시스템루트';
const 회원 = ['시스템루트', '관리자', '강사', "기관",];
// const 아무나s = ['비회원', '미인증', ...회원];
const 아무나s = ['비회원', ...회원]; //미인증은 제외해야 무조건 가입을 완료시키게 됨. 
// '미인증'
//  && x != '강사'
const 엔드유저s = 아무나s.filter(x => x != '관리자' && x != '시스템루트');

import { 아이콘 } from './icons';
const isDisableMode = !true;



export const links = [
  // { icon: 아이콘.테스트, to: '/test', label: '테스트(S)', roles: 아무나s, hide: true, isLayoutNone: true },
  // { icon: 아이콘.테스트, to: '/popup', label: '테스트(S)', roles: 아무나s, hide: true },
  // { icon: 아이콘.테스트, to: '/todolist', label: '테스트(S)', roles: 아무나s, hide: true },
  // { icon: 아이콘.홈, to: '/', label: 'Home', roles: 아무나s, hide: true },
  {
    label: "사업단 소개",
    icon: 'i-material-symbols-light-chat-info-outline',
    // to: "/intro/neulbom",
    roles: 엔드유저s,
    children: [
      { label: "사업단장 인사", to: "/intro/1", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "사업단장 개요", to: "/intro/2", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "사업단장 연혁", to: "/intro/3", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "사업단장 조직도", to: "/intro/org", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "찾아오시는 길", to: "/intro/map", roles: 엔드유저s, disabled: isDisableMode, },
    ]
  },

  {
    label: "주요 사업",
    roles: 엔드유저s,
    children: [
      { label: "라이즈사업 목표", to: "/jobs/1", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "라이즈 단위 사업", to: "/jobs/2", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "라이즈 인재 양성", to: "/jobs/3", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "지역협력 네트워크", to: "/jobs/4", roles: 엔드유저s, disabled: isDisableMode, },
      
    ]
  },

  {
    label: "커뮤니티",
    roles: 엔드유저s,
    children: [
      { label: "공지사항", to: "/community/1", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "뉴스홍보", to: "/community/2", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "포토갤러리", to: "/community/3", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "관련자료", to: "/community/4", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "사업협력요청", to: "/community/5", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "관련사이트", to: "/community/6", roles: 엔드유저s, disabled: isDisableMode, },
      
    ]
  },



  {
    label: "정책/약관", icon: 'i-stash-user-shield-light', to: "/policys/1", roles: 엔드유저s,
    hide: true,
    children: [{ to: "/policys/1", label: "개인정보처리방침", }, { to: "/policys/2", label: "이용약관" } 
    ]
  },





  {
    label: "RISE강사 연수",

    to: '/trainings/intro',
    hide: true,
    // to: '/enroll-trainings',
    icon: 아이콘.연수,
    roles: 아무나s,
    disabled: isDisableMode,
    children: [
      { label: "강사연수 소개", to: '/trainings/intro', roles: 아무나s, disabled: isDisableMode, },
      { label: '강사연수 신청', to: '/enroll-trainings', roles: ['비회원', '강사'], disabled: isDisableMode, },

    ]
  },



  {
    label: "i-RISE 소식",

    roles: 엔드유저s,
    icon: 'i-material-symbols-light-home-storage-outline-rounded',
    hide: true,
    // to: "/resources/edu",
    children: [

      { disabled: isDisableMode, label: "교육 자료", to: "/resources/edu", roles: 아무나s },
      { disabled: isDisableMode, label: "홍보 영상", to: "/resources/video", roles: 아무나s },
      { disabled: isDisableMode, label: "보도 자료", to: "/resources/news", roles: 아무나s }
    ]
  },
  // ... 필요시 추가 ...
];


export const ex_links = [
  { icon: 아이콘.테스트, to: '/test', label: '테스트(S)', roles: 아무나s, hide: true, isLayoutNone: true },
  { icon: 아이콘.테스트, to: '/popup', label: '테스트(S)', roles: 아무나s, hide: true },
  { icon: 아이콘.테스트, to: '/todolist', label: '테스트(S)', roles: 아무나s, hide: true },

  {
    label: "소개",
    icon: 'i-material-symbols-light-chat-info-outline',
    // to: "/intro/rise",
    roles: 엔드유저s,
    children: [
      // { label: "인사말", to: "/intro/neulbom", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "사업 안내", to: "/intro/rise", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "조직도", to: "/intro/org", roles: 엔드유저s, disabled: isDisableMode, },
      { label: "찾아오시는 길", to: "/intro/map", roles: 엔드유저s, disabled: isDisableMode, },
    ]
  },

  // {
  //   label: "소개",
  //   icon: 아이콘.홈,
  //   to: "/intro/neulbom",
  //   roles: 아무나s,

  //   children: [
  //     { label: "인사말", to: "/intro/neulbom", roles: 아무나s, disabled: isDisableMode, },
  //     { label: "사업 안내", to: "/intro/rise", roles: 아무나s, disabled: isDisableMode, },
  //     { label: "조직도", to: "/intro/org", roles: 아무나s, disabled: isDisableMode, },
  //     { label: "찾아오시는 길", to: "/intro/map", roles: 아무나s, disabled: isDisableMode, },
  //   ]
  // },
  // {
  //   label: "라이즈 사업단",
  //   icon: 아이콘.홈,
  //   to: "/rise/1",
  //   roles: 아무나s,
  //   children: [
  //     { label: "인사말", to: "/rise/1" },
  //     { label: "사업소개", to: "/rise/2" },
  //     { label: "사업 내용", to: "/rise/3" }
  //   ]
  // },




  // i-lets-icons-paper-light
  // { icon: 'i-stash-shield-user-light', to: '/policys/1', label: 'Policy', roles: 아무나s,  },





  { icon: 아이콘.홈, to: '/', label: 'Home', roles: 아무나s, hide: true },


  // { icon: 'i-lucide-user', to: '/manager/dashboard', label: '대시보드(A)', roles: ['관리자'] },
  { icon: 아이콘.대시보드, to: '/manager/dashboard', label: '대시보드(A)', roles: ['시스템루트', '관리자'] },
  { icon: 아이콘.역할, to: '/manager/roles', label: '역할관리(S)', roles: ['시스템루트',] },


  { icon: 아이콘.회원, to: '/manager/n_users', label: '회원관리', roles: ['시스템루트', '관리자'] },
  { icon: 아이콘.프로그램, to: '/manager/programs', label: '프로그램관리', roles: ['시스템루트', '관리자'], hide: true },



  { icon: 아이콘.연수관리, to: '/manager/trainings', label: '연수관리', roles: ['시스템루트', '관리자'] },
  { icon: 아이콘.출석관리, to: '/manager/trainings/-1', label: '출석관리', roles: ['시스템루트', '관리자'] },

  { icon: 아이콘.게시판, to: '/manager/boards', label: '게시판관리', roles: ['시스템루트', '관리자'] },

  //  -------------------------------- //

  // { icon:'',to: '', label: '연수수정', roles: ['관리자'] },
  // { label:'사용자 화면', roles: ['관리자'] },
  { icon: 아이콘.대시보드, to: '/dashboard', label: '대시보드(U)', roles: ['강사'], hide: true },

  // { icon: 아이콘.프로그램, to: '/programs', label: '프로그램신청(U)', roles: ["기관"] },

  // { icon: 아이콘.신청, to: '/trainings', label: '연수신청(U)', roles: ['강사'] },
  {
    label: "늘봄강사 연수",
    // icon: 아이콘.신청,


    to: '/trainings/intro',
    // to: '/enroll-trainings',
    icon: 아이콘.연수,
    roles: 아무나s,
    disabled: isDisableMode,
    children: [
      // { label: "RISE 연수 안내", to: '/trainings/intro2', roles: 아무나s },
      { label: "RISE강사연수 소개", to: '/trainings/intro', roles: 아무나s, disabled: isDisableMode, },
      { label: 'RISE강사연수 신청', to: '/enroll-trainings', roles: ['비회원', '강사'], disabled: isDisableMode, },

    ]
  },


  { icon: 아이콘.시청, to: '/trainings', label: '연수(G)', roles: 아무나s, hide: true },
  { icon: 아이콘.시청, to: '/my-trainings', label: '나의연수(U)', roles: ['강사'] },


  { icon: 아이콘.회원, to: '/signup2', label: '회원가입(G)', roles: ['미인증'], hide: true },

  // { roles: ['강사',"기관"] },
  { icon: 아이콘.회원, to: '/profile', label: '프로필(U)', roles: 회원, hide: true },


  // { icon: 아이콘.연수, to: '/guest/trainings/1', label: '모든연수_v1(G)', roles: [] },
  // { icon: 아이콘.프로그램, to: '/guest/programs/1', label: '모든프로그램_v1(G)', roles: [] },

  { icon: 아이콘.게시판, to: '/boards', label: '게시글', roles: 아무나s, hide: true },


  { icon: 아이콘.홈, to: '/guest', label: '비회원 페이지', roles: 아무나s, hide: true },
  // { icon: 아이콘.일정, to: '/guest/training-schedules', label: '세미나', roles: 아무나s },


  {
    icon: 아이콘.프로그램, label: '늘봄 프로그램', roles: ['비회원',], hide: !true,
    // to: '/guest/programs',

    children: [
      // { label: '늘봄 프로그램 소개(완료필)', to: '/guest/programs', roles: ['비회원',], hide: !true },
      // { label: '늘봄 프로그램 신청', to: '/guest/programs/apply', roles: ['비회원',], hide: !true },
    ]

  },
  // { icon: 아이콘.프로그램, to: '/guest/programs', label: '늘봄 프로그램 신청', roles: ['비회원',], hide: !true },


  { icon: 아이콘.회원, to: '/login', label: '로그인(G)', roles: ['비회원'], hide: true },
  // { icon:'',to: '/logout', label: '로그아웃(G)', roles: ['비회원'] },

  //

  {
    label: "i-RISE 소식",

    roles: 엔드유저s,
    icon: 'i-material-symbols-light-home-storage-outline-rounded',
    // to: "/resources/edu",
    children: [

      { disabled: isDisableMode, label: "교육 자료", to: "/resources/edu", roles: 아무나s },
      { disabled: isDisableMode, label: "홍보 영상", to: "/resources/video", roles: 아무나s },
      { disabled: isDisableMode, label: "보도 자료", to: "/resources/news", roles: 아무나s }
    ]
  },
  {
    icon: 'i-mdi-light-forum', label: '커뮤니티', roles: 엔드유저s,
    // to: '/community/faq',

    children: [
      { disabled: isDisableMode, label: "공지 사항", to: "/community/notice", roles: 아무나s, },
      { disabled: isDisableMode, label: "자주 묻는 질문", to: "/community/faq", roles: 아무나s, },
      { disabled: isDisableMode, label: "1:1 문의하기", to: "/community/personal", roles: 아무나s, },
      // { label: "늘봄 커뮤니티", to: "/community/community", roles: 아무나s, }
    ]
  },
  { icon: 아이콘.이수증, to: '/certify', label: '이수증게시판', roles: 아무나s, },

  {
    label: "정책/약관", icon: 'i-stash-user-shield-light', to: "/policys/1", roles: 엔드유저s,
    hide: true,
    children: [{ to: "/policys/1", label: "개인정보처리방침", }, { to: "/policys/2", label: "이용약관" }, { to: "/policys/3", label: "이메일무단수집거부" },
      //  { to: "/policys/4", label: "저작권정책" },
    ]
  },


  // ... 필요시 추가 ...
];

export const routeRoles: Record<string, string[]> = {};
links.forEach(link => {
  if (link.to && link.roles) {
    routeRoles[link.to] = link.roles;
  }
});

const isPass = (roles: string[], linkRoles: string[] = []) => roles.includes(PASS) && !linkRoles.includes('비회원');// && !roles.includes('비회원');

function _getLinksByRoles(roles: string[] = [], routeCheck: boolean = false) {
  const links2 = routeCheck ?
    links.filter(link => isPass(roles, link.roles) || link.roles?.some(r => roles.includes(r))) :
    links.filter(link => isPass(roles, link.roles) || link.roles?.some(r => roles.includes(r))).filter(x => !(x?.hide ?? false))
    // .map(x=>{
    //   if(x.disabled){
    //     x.to = null;
    //   }
    //   return x;
    // })
    ;
  return links2;
}


export function getLinks_byRoles(roles: string[]) {

  console.log('==== roles ====', roles);
  // if (roles.includes('비회원')) {
  //   return _getLinksByRoles(roles, false);
  // }
  const list = _getLinksByRoles(roles, false).filter(x => roles.some(y => x.roles.includes(y)));
  // return list;
  // console.log(list)
  const list2 = list.map(x => {
    const children2 = x?.children?.filter(y => roles?.some(r => y.roles?.includes(r))) ?? [];
    return { ...x, children: children2 };
  });
  // console.log(list2)
  // return list2.map(x => ({ ...x, icon: undefined }));
  return list2;


  // x?.children?.map(y=>y.roles))
  // console.log(list)
  // return _getLinksByRoles(roles, false)
  //   .filter(x => !x.roles.every(r => r == '비회원'));
}
export function get현재메뉴() {

  const current = useRoute().path;
  const link = links.find(x => x.to?.startsWith(current) || x.children?.some(y => y.to?.startsWith(current)));
  return link;
}

export function getAccess_byRoles(roles: string[]) {
  return _getLinksByRoles(roles, true);
}

// export async function getLinksByUser() {
//   const roles = await getUserRoles();
//   return getLinksByRoles(roles);
// }