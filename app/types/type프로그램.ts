
export interface i프로그램DB {
    id: string
    title: string,
    description?: string
    division: i프로그램구분
    category?: i프로그램분류
    targetGrade?: i운영대상
    classType?: i학급분류
    operatingClassCount: number,
    sessionCount?: number,
    costType?: i비용구분
    costPerSession?: number
    recruitmentStartDate?: string
    recruitmentEndDate?: string
    operationStartDate?: string
    operationEndDate?: string
    operatingOrganization?: string
    operatingRegion?: string
    multiGradeClassAvailable: Boolean
    requiredMaterials?: string
    thumbnail?: string
    status: i프로그램상태,

    note: string
}





export interface i프로그램 {
    id:string,
    이름: string
    설명: string
    구분: i프로그램구분
    분류: i프로그램분류
    운영대상: i운영대상
    학급분류: i학급분류
    운영학급: number
    비용구분: i비용구분
    차시당비용: number
    모집기간: i기간
    운영기간: i기간
    운영기관: string
    운영지역: string
    다중학년합반가능여부: boolean
    필수준비물: string
    이미지?: string

    노트: string

    상태: i프로그램상태
}

// === 영문명 타입 및 Values export ===
export type i프로그램구분 = 'RISE_NEULBOM' | 'KOREA_FOUNDATION' | 'INCHEON_NEULBOM';
export const i프로그램구분options = [
    { label: 'RISE늘봄', value: 'RISE_NEULBOM' },
    { label: '한국과학창의재단', value: 'KOREA_FOUNDATION' },
    { label: '인천시늘봄', value: 'INCHEON_NEULBOM' }
] as const;

export type i프로그램분류 = 'PHYSICAL_EDUCATION' | 'DIGITAL' | 'SCHOOL_SOCIAL_EMOTIONAL' | 'INCHEON_SPECIALIZED' | 'CURRICULUM_LINKED' | 'CLIMATE_ENVIRONMENT' | 'CULTURE_ART' | 'CREATIVE_SCIENCE';
export const i프로그램분류options = [
    { label: '체육', value: 'PHYSICAL_EDUCATION' },
    { label: '디지털', value: 'DIGITAL' },
    { label: '학교적응 및 사회정서', value: 'SCHOOL_SOCIAL_EMOTIONAL' },
    { label: '인천특화', value: 'INCHEON_SPECIALIZED' },
    { label: '교과연계', value: 'CURRICULUM_LINKED' },
    { label: '기후환경', value: 'CLIMATE_ENVIRONMENT' },
    { label: '문화예술', value: 'CULTURE_ART' },
    { label: '창의과학', value: 'CREATIVE_SCIENCE' }
] as const;

export type i운영대상 = 'FIRST_GRADE' | 'SECOND_GRADE' | 'FIRST_TO_SECOND_GRADE';
export const i운영대상options = [
    { label: '1학년', value: 'FIRST_GRADE' },
    { label: '2학년', value: 'SECOND_GRADE' },
    { label: '1~2학년', value: 'FIRST_TO_SECOND_GRADE' }
] as const;

export type i학급분류 = 'GENERAL' | 'MULTICULTURAL' | 'SPECIAL_NEEDS';
export const i학급분류options = [
    { label: '일반 학급', value: 'GENERAL' },
    { label: '다문화학급', value: 'MULTICULTURAL' },
    { label: '특수학급', value: 'SPECIAL_NEEDS' }
] as const;

export type i비용구분 = 'FREE' | 'PAID_PER_SESSION';
export const i비용구분options = [
    { label: '무료', value: 'FREE' },
    { label: '차시당 강사비', value: 'PAID_PER_SESSION' }
] as const;

type i기간 = { 시작: string, 종료: string }

export type i프로그램상태 = 'PREPARING' | 'RECRUITING' | 'RECRUITMENT_CLOSED' | 'HIDDEN';
export const i프로그램상태options = [
    { label: '초안', value: 'PREPARING' },
    { label: '모집 중', value: 'RECRUITING' },
    { label: '모집 마감', value: 'RECRUITMENT_CLOSED' },
    { label: '취소됨', value: 'HIDDEN' }
] as const;
