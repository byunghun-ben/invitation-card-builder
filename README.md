# 청첩장 빌더 서비스 (Party Door)

> 예비 신혼부부의 이야기를 담은 풍성한 모바일 청첩장을 만들어, 초대 받는 사람들이 결혼식 주인공들에 대해 깊게 이해하고 마음 깊이 축하할 수 있도록 돕는 서비스입니다.

## 사용 기술 스택

### 프론트엔드

- Next.js:
  - 동적 메타 데이터 구성
  - 정적 페이지 구성
  - 서버 컴포넌트
  - 서버 액션
- Tailwind CSS
- react-hook-form
- Context API
- Kakao map API

### 데이터베이스 및 인증

- Mongo DB (데이터베이스)
- Supabase (스토리지 및 인증)

### 기타 도구 및 서비스

- Git (버전 관리)
- Notion (작업 관리 및 문서화)
- Velog (작업 내용 정리)
- Vercel (배포)

## 주요 기능

- 모바일 청첩장 관리
  - 위젯 관리
  - 결혼식장 장소 검색 및 약도 제공

## 세부 설명

### 페이지 구조

- / (랜딩 페이지)

- /auth

  - /login (로그인 페이지)
  - /register (회원가입 페이지)

- /mypage (내 페이지)

  - /invitations/create (초대장 생성 페이지)
  - /invitations/:id/edit (초대장 수정 페이지)
  - /invitations/:id/preview (초대장 미리보기 페이지)
  - /profile (프로필 페이지)
  - /settings (설정 페이지)
  - /share/invitations/:id (초대장 공유 페이지)

- /invitations/:id (초대장 상세 페이지)

### 위젯 종류

#### 인스타그램 템플릿

- [x] 표지
- [x] 인사말
- [x] 게시물
- [x] 지도
- [ ] 영상
- [ ] 방명록

#### 일반 청첩장 템플릿

- 제작 예정
