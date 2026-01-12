

export interface i사람DB {

    id: string; name: string, birthdate: string, gender: string,
    thumbnail?: string


}
export interface i사람 {
    id: string; 이름: string; 생년월일: Date;

    이미지?: string
    성별: ("MALE" | "FEMALE");

}

// -------------------------------------------------- //

export type i최종학력 = "UNIVERSITY" | "COLLEGE" | "GRADUATE_SCHOOL" | "HIGH_SCHOOL"
export type i졸업여부 = "GRADUATED" | "IN_ATTENDANCE" | "DROPOUT" | "COMPLETED"

export interface i늘봄회원 extends i늘봄강사, i늘봄학교기관 {
    // uuid: string//네이버 식별자 등.

    // 역할: i역할

    탈퇴요청: boolean
    전화번호: string
    이메일: string //현실 식별자.

    가입일: Date

}

export interface i늘봄회원DB extends i늘봄강사DB, i늘봄학교기관DB {
    uuid: string//네이버 식별자 등.
    email: string //현실 식별자.
    phone: string
    deviceInfo: string

    nickInfo?:
    {
        email?: string
        name?: string
        phone?: string
        gender?: "MALE" | "FEMALE"
        // birthdate?: Date
        birthdate?: string
    },


    createdAt: Date
    updatedAt: Date
    isWithdrawalRequested: boolean

}

export interface i늘봄강사 extends i사람 {
    최종학력: i최종학력
    졸업학교: string
    전공: string
    졸업여부: i졸업여부
    입학년도: number
    졸업년도: number
}

export interface i늘봄강사DB extends i사람DB {
    schoolType: i최종학력,
    schoolName: string,
    major: string,
    graduationStatus: i졸업여부,
    admissionYear: number,
    graduationYear: number
}

// -------------------------------------------------- //

export interface i늘봄학교기관 extends i사람 {
    소속학교: string
    직책: string
}


export interface i늘봄학교기관DB extends i사람DB {
    organizationName: string
    position: string
}

// -------------------------------------------------- //

// '시스템루트' 연수관련 수정.
// "기관" 프로그램 관련 수정. 



export type i역할이름 = '시스템루트' | '관리자' | '일반사용자' | "기관" | '강사' | '회원'
export interface i역할DB {//roles
    id: string;
    name: i역할이름;
    description: string;
}
export interface i역할 {
    id: string;
    이름: i역할이름;
    설명: string;
}

export interface i회원역할DB {
    id: string

    nUserId: string;

    roleId: string;

}
export interface i회원역할 {
    회원: i늘봄회원
    역할: i역할
    set역할: (v: i역할) => Promise<boolean>
}
// 역할s: i역할[]
