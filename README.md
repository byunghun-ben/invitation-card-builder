# 청첩장 빌더 서비스

## 페이지 구조

- / (랜딩 페이지)

- /auth

  - /login (로그인 페이지)
  - /register (회원가입 페이지)

- /mypage (내 템플릿)

  - /create/template (템플릿 생성 페이지)
  - /templates/:id/edit (템플릿 수정 페이지)
  - /profile (프로필 페이지)
  - /settings (설정 페이지)
  - /share/template/:id (템플릿 공유 페이지)

- /templates/:id (템플릿 상세 페이지)

## TODO

### Auth

- [x] 카카오 로그인

### MyPage

- [ ] 내 템플릿 목록 확인하기
