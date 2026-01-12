import type { i늘봄회원, i수업, i수업상태 } from "./index";
import type { i기간 } from "./type수업";

// export type i수강신청엔티티타입 = "TRAINING" | "LECTURE" | "PROGRAM" | "SEMINAR";
// export const 수강신청엔티티타입 = { 연수: 'TRAINING', 강의: 'LECTURE', 프로그램: 'PROGRAM', 세미나: 'SEMINAR' } as const;




export type i수강신청상태 = "ENROLLED" | "CONFIRMED" | "REJECTED"
export const i수강신청상태options = [
    { label: '승인대기', value: 'ENROLLED' },
    { label: '승인', value: 'CONFIRMED' },
    { label: '취소', value: 'REJECTED' },
] as const;

// ENROLLED, CONFIRMED, REJECTED, COMPLETED, CANCELED
export interface i수강신청DB {
    id: string;
    nUserId: string;
    // trainingId: string;
    enrollableId: number;
    // entityId: string;//수업id, 강의id, 프로그램id 등
    // entityType: i수강신청엔티티타입;//수업, 강의, 프로그램 등


    registrationDate?: string; //최초 생성시에만 서버에서 값 설정. 
    enrollStatus: i수강신청상태
}

export interface i수강신청 {
    id: string; 사람id: string;
    // 수업id: string; 
    수강신청일: string; 수강신청상태: i수강신청상태;

    // 엔티티id: string;
    // 엔티티타입: i수강신청엔티티타입;
}
// -----

export interface i신청가능DB {
    // id: string; 
    // nUserId: string; 
    // trainingId: string;
    // registrationDate?: string; //최초 생성시에만 서버에서 값 설정. 
    // enrollStatus: i수강신청상태

    id: string;
    // "reservationTime": "2025-11-06T20:30:15",
    // "eventStart": "2026-01-01T09:00:00.000"


    applicationStartDate: Date;// kotlin localDateTime
    applicationEndDate: Date;//"yyyy-mm-ddThh:mm:ss"
    usageStartDate: Date;
    usageEndDate: Date;
    maxParticipants: number;
    status: i수업상태

}

export interface i신청가능 {

    id: string;
    신청기간: i기간
    사용기간: i기간
    모집인원: number
    발행: i수업상태
}

//--------
export type i출결엔티티타입 = "TRAINING" | "LECTURE";
export const 출결엔티티타입 = { 연수: 'TRAINING', 강의: 'LECTURE' } as const;

export interface i출결DB {
    id: string;
    enrollId: string;
    nUserId: string;//원래 있으나.

    // lectureId: string;
    entityId: string;
    entityType: i출결엔티티타입;



    isPassed: boolean;
    // totalTime: number; //
    playedSeconds: number;
    lastWatchedAt: string;

    // nUserId: 0,



}
export interface i출결 {
    id: string;
    is출석: boolean

    시청시간: number; // 초
    마지막학습날짜: string; // ISO string

    parent수강신청: i수강신청 & Record<string, any>
    회원: i늘봄회원 & Record<string, any>
    수업: i수업 & Record<string, any>
    // 수업id: string
}