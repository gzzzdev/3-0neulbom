export interface i파일DB {

  id: string,//number,
  originalFileName: string,
  storedFileName: string,
  filePath: string,
  fileType: string,
  fileSize: number,
  nUserId: number,
  createdBy: string,
  updatedBy: string,
  createdAt: string,
  updatedAt: string
}

export interface i파일 {
  id: string,//number,
  name: string,
  저장파일명: string,
  파일경로: string,
  파일타입: string,
  파일크기: number,
  // 회원ID: number,
  // 생성자: string,
  // 수정자: string,
  // 생성일: string,
  // 수정일: string
}

export interface i파일2DB {

  id: string,
  nUserId: number,
  file: File,

  fileName: string,
  publicUrl: string,
  // fileType: string,
  // filePath: string,
}

export interface i파일2 {
  file: File,
  파일명: string,
  publicUrl: string,
  // 파일타입: string,
  // 파일크기: numbesr,
  readonly label: string,
  readonly sub: string,
}