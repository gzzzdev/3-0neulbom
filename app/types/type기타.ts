

export interface i게시글DB {
    id: string
    title: string,
    date: Date,
    nUserId?: string,
    content?: string
    link?: string
    category?: string

    thumbnail?: string
    boardType: i게시판ID

    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string

}

export interface i게시글 {
    id: string,
    제목: string
    날짜: string

    내용?: string
    링크?: string
    설명?: string
    카테고리?: string
    이미지?: string

    게시판?: string//i게시판ID
}

export type i게시판ID = 'edu' | 'video' | 'news' | 'personal' | 'notice' | 'faq' | 'etc' | 'community'
export const i게시판IDoptions = [
    { label: '교육 자료', value: 'edu' },
    { label: '홍보 영상', value: 'video' },
    { label: '보도 자료', value: 'news' },
    { label: '1:1 문의하기', value: 'personal' },
    { label: '공지 사항', value: 'notice' },
    { label: '자주 묻는 질문', value: 'faq' },
    { label: '커뮤니티', value: 'community' },
    { label: '기타', value: 'etc' }
] as const;

export type i게시글타입 = 'link' | 'download' | 'content'
export const i게시글타입options = [
    { label: '링크 이동', value: 'link' },
    // { label: '다운로드', value: 'download' },
    { label: '상세 페이지', value: 'content' },
] as const;



// export interface i게시글 {
//     id: string
//     title: string
//     description?: string
//     category: string
//     date: string
//     link?: string
// }