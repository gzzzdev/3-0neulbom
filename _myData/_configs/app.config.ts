import { links } from './links';

export default defineAppConfig({
  global: {
    picture: true ? undefined : {
      dark: '',//'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0wIDEyaDExVjZoLTFWM0g5djFIOFYySDd2M2gxdjJoMXYyaDF2Mkgxdi0xaDFWOUgxVjhIMFptMi0zaDFWOEgyWk0xIDhoMVY2SDFabTIgMGgxVjZoMVY0SDR2MUgzVjRIMnYyaDFabTMgMWgxVjhINlptMS0xaDFWN0g3Wk01IDRoMVYySDVabTEtMmgxVjFINlptMCAwIi8+PC9zdmc+',// 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      light: '',//data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0wIDEyaDExVjZoLTFWM0g5djFIOFYySDd2M2gxdjJoMXYyaDF2Mkgxdi0xaDFWOUgxVjhIMFptMi0zaDFWOEgyWk0xIDhoMVY2SDFabTIgMGgxVjZoMVY0SDR2MUgzVjRIMnYyaDFabTMgMWgxVjhINlptMS0xaDFWN0g3Wk01IDRoMVYySDVabTEtMmgxVjFINlptMCAwIi8+PC9zdmc+',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'ui-pro@nuxt.com',
    available: true,
    // title: '경인교육대학교 명예교수회',
    title: '늘봄교육센터',
    title_short: '늘봄교육센터',
    description: '...',


    title_en: 'Innovative New Life Steel Co., Ltd.',
    catchPhrases: ['대한민국', '교사교육의 중심'],
    welcome: '대한민국 교사교육의 중심',

    bg: {
      src1: '/img/bg1.jpeg',
      src2: '/img/bg2.jpg',
      src3: '/img/bg3.jpeg',
      class: 'object-[100%]',
      // class: 'object-bottom',
      // class: 'object-[40%_90%]',
    },
    logo: {
      base: '/img/logo/circle.png',
      half: '/img/logo/half2.png',
    },

  },
  ui: {
    colors: {
      primary: 'sky',
      // indigo
      // primary: 'teal',
      neutral: 'zinc' //초기값. 
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `뉴라이프 스틸 • © ${new Date().getFullYear()}`,
    colorMode: false,

    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://go.nuxt.com/discord',
      'target': '_blank',
      'aria-label': '뉴라이프 스틸 디스코드'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/newlifesteel',
      'target': '_blank',
      'aria-label': '뉴라이프 스틸 X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/newlifesteel',
      'target': '_blank',
      'aria-label': '뉴라이프 스틸 GitHub'
    }]
  },
  navs: links,
  info:
  {
    주소: {
      label: '경인교육대학교 인천캠퍼스 대학본부관 309호',
      url: 'https://map.kakao.com/link/map/경인교육대학교인천캠퍼스',
      buttons: [
        {
          label: '인천버스노선 검색',
          url: 'https://www.incheon.go.kr/bus',
          icon: 'i-ph-bus-light',
          variant: 'solid',
        },
        {
          label: '지하철 노선도 보기',
          url: 'https://www.incheonmetro.ir/',
          icon: 'i-ph-map-pin-light',
          variant: 'outline',
        }
      ]
    },
    주소s:
      [{
        label: '인천캠퍼스',
        address: '[21044] 인천광역시 계양구 계산로 62',
        tel: 'TEL : 032) 540-1114 FAX : 032) 541-0580',
      },
      {
        label: '경기캠퍼스',
        address: '[13910] 경기도 안양시 만안구 삼막로 155',
        tel: 'TEL : 031) 470-6114 FAX : 031) 470-6139',
      }],
    대중교통: [
      {
        label: '지하철', icon: 'i-carbon-train-speed',
        decs: ['경인전철 부평역', '인천지하철 1호선 경인교대입구역 하차. 4번, 5번 출구']
      },
      {
        label: '시내버스', icon: 'i-ph-bus-light',
        decs: ['부평역 앞에서 1번, 30번 승차', '경인교육대학교 입구 하차']
      },
      {
        label: '삼화고속',
        icon: 'i-ph-bus-light',
        decs: ['서울역, 신촌, 양재역, 강남역', '경인교육대학교 입구 하차 (계산동행)']
      },
      {
        label: '마을버스', icon: 'i-ph-bus-light',
        decs: ['부평역 앞에서 584번 승차', '경인교육대학교 정문 하차']
      },
    ]
  },

})
