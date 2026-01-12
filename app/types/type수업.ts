
export interface i강DB {
    id: string;
    trainingId: string;
    // trainingId: string;//수업id
    title: string;
    description: string;
    // link: string;
    videoLink: string;
    isOffline: boolean;
    totalTime: number;

    isRequired: boolean;
    enrollableId: number | undefined;
}
export interface i강 {
    id: string;
    제목: string;
    설명: string;
    링크: string;
    
    is오프라인: boolean;
    is필수: boolean;

    영상길이: number;


    set이수: (v: i늘봄회원) => Promise<boolean>;
}




export type i연수구분 = 'INCHEON_RISE' | 'NEULBOM_INSTRUCTOR_TRAINING';
export const i연수구분options = [
    {
        label: '인천RISE', value: 'INCHEON_RISE', img: '/public/img/1.png',   
        children: [{ label: '초등이해', value: 'ELEMENTARY_UNDERSTANDING' }, { label: '기초', value: 'BASIC' }, { label: '심화', value: 'ADVANCED' }]
    },
    {
        label: '늘봄강사양성', value: 'NEULBOM_INSTRUCTOR_TRAINING', img: '/public/img/2.png',
        children: [{ label: '기초', value: 'BASIC' }, { label: '심화', value: 'ADVANCED' }]
    },
] as const;
export type i연수구분2 = 'ELEMENTARY_UNDERSTANDING' | 'BASIC' | 'ADVANCED';

// export type i연수구분 = '인천RISE(초등이해)' | '인천RISE(기초)' | '인천RISE(심화)' | '늘봄강사양성(기초)' | '늘봄강사양성(심화)';
// export const i연수구분options = [
//     { label: '인천RISE_초등이해', value: '인천RISE_초등이해'},
//     { label: '인천RISE_기초', value: '인천RISE_기초'},
//     { label: '인천RISE_심화', value: '인천RISE_심화'},
//     { label: '늘봄강사양성_기초', value: '늘봄강사양성_기초'},
//     { label: '늘봄강사양성_심화', value: '늘봄강사양성_심화'},
// ] as const;

export interface i세미나 {

    일정명: string,//그냥 타이틀임.

    연수기간: i기간//computed //연수를 기준으로 생성됨.
    연수시간: number,//computed //연수를 기준으로 생성됨.
    // 연수s: i수업[]

}
export interface i세미나DB {
    id: string,
    title: string,
    trainingIds: number[]
}

export interface i수업DB {



    id: string; title: string;
    description: string;
    professor: string;

    order: number;
    
    
    // time: string
    // sections: i강DB[]
    price: number,
    location: string,
    thumbnail?: string,
    timeInfo: string,
    note: string,

    division: i연수구분,
    type: '초등이해' | '기초' | '심화',
    category?: i수업영역

    
    // trainingType: string,

    // ======== //
    enrollableId: number | undefined,
    //

    totalHours: number,
    // 아래는 폐기될 예정 //
    // status: i수업상태,
    // applicationStartDate: string,
    // applicationEndDate: string,
    // trainingStartDate: string,
    // trainingEndDate: string,
    // maxParticipants: number,

    
    blobIntroduction:string;
    blobNotification:string;


}
// export interface i기간 {
//     시작: string
//     종료: string
// }
// export type i기간 = { 시작: string, 종료: string }
export type i기간 = { 시작: Date, 종료: Date }

export type i수업상태 = 'PREPARING' | 'PUBLISHED' | 'HIDDEN' | 'COMPLETED'
export const i수업상태options = [
    { label: '준비중', value: 'PREPARING' },
    { label: '공개', value: 'PUBLISHED' },
    { label: '비공개', value: 'HIDDEN' },
    { label: '완료', value: 'COMPLETED' }
] as const;


export type i수업영역 = 'CULTURE_ART' | 'PHYSICAL_EDUCATION' | 'CLIMATE_ENVIRONMENT' | 'SOCIAL_EMOTIONAL' | 'CREATIVITY_SCIENCE' | 'AI_DIGITAL' | 'DISABILITY_SPECIAL' | 'MULTICULTURAL';

export const i수업영역options = [
    { label: '문화·예술', value: 'CULTURE_ART' },
    { label: '체육', value: 'PHYSICAL_EDUCATION' },
    { label: '기후·환경', value: 'CLIMATE_ENVIRONMENT' },
    { label: '사회·정서', value: 'SOCIAL_EMOTIONAL' },
    { label: '창의·과학', value: 'CREATIVITY_SCIENCE' },
    { label: 'AI·디지털', value: 'AI_DIGITAL' },
    { label: '장애·특수', value: 'DISABILITY_SPECIAL' },
    { label: '다문화', value: 'MULTICULTURAL' }
] as const;


// type i기간 = [string, string]
export interface i수업 {
    id: string;
    설명: string
    교수: string;
    // 시간: string
    // 썸네일: string

    순서: number;
    영역: i수업영역

    제목: string

    수강료: number
    장소: string

    임시총시간: number

    강s: i강[]

    구분: i연수구분
    구분2: i연수구분2


    소개글: string;
    안내사항: string;

    // 발행: i수업상태

    // 접수기간: i기간
    // 교육기간: i기간
    // 모집인원: number
    // 수강인원: number
    // 비고: string
}

