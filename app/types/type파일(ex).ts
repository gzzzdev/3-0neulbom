export interface iFileDB {
  id: string;
  original_name: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  extension: string;
  bucket_name: string;
  
  // 소유자 정보 (다형성 관계)
  owner_type: string; // 'nuser', 'user', 'lecture', 'program' 등
  owner_id: string;
  
  // 파일 분류
  category: string; // 'document', 'image', 'video', 'audio' 등
  subcategory?: string; // 'identity_card', 'avatar', 'material' 등
  
  // 메타데이터 (JSON)
  metadata: Record<string, any>;
  
  // 상태 관리
  status: 'active' | 'deleted' | 'archived';
  
  // 권한 설정
  is_public: boolean;
  access_level: 'private' | 'shared' | 'public';
  
  // 감사 정보
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export type FileCategory = 
  | 'document'    // 문서
  | 'image'       // 이미지
  | 'video'       // 비디오
  | 'audio'       // 오디오
  | 'archive';    // 압축파일

export type FileSubcategory = 
  // 문서
  | 'identity_card'     // 신분증
  | 'business_license'  // 사업자등록증
  | 'certificate'       // 자격증
  | 'contract'          // 계약서
  | 'material'          // 강의자료
  // 이미지
  | 'avatar'            // 프로필 이미지
  | 'thumbnail'         // 썸네일
  | 'banner'            // 배너
  // 기타
  | 'other';

export interface FileUploadRequest {
  owner_type: string;
  owner_id: string;
  category: FileCategory;
  subcategory?: FileSubcategory;
  metadata?: Record<string, any>;
  is_public?: boolean;
  access_level?: 'private' | 'shared' | 'public';
}

export interface FileResponse {
  id: string;
  original_name: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  extension: string;
  owner_type: string;
  owner_id: string;
  category: string;
  subcategory?: string;
  metadata: Record<string, any>;
  status: string;
  is_public: boolean;
  access_level: string;
  uploaded_by: string;
  created_at: string;
  download_url?: string;
} 