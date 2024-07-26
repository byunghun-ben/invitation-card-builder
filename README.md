# 청첩장 빌더 서비스

## 페이지 구조

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

## TODO

### Auth

- [x] 카카오 로그인

### MyPage

- [ ] 내 템플릿 목록 확인하기

### Invitation Edit

위젯을 하나씩 추가하는 형태로 진행하기

위젯 데이터는 어떻게 구성될까?

```sql
CREATE TABLE widgets (
  id SERIAL PRIMARY KEY,
  invitation_id INT REFERENCES invitations(id),
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TABLE post_widgets (
  id SERIAL PRIMARY KEY,
  widget_id INT REFERENCES wigets(id) ON DELETE CASCADE,
  content TEXT,
)
```

```sql
CREATE TABLE post_widget_images (
  id SERIAL PRIMARY KEY,
  post_widget_id INT REFERENCES post_widgets(id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL
);
```

```sql
CREATE TABLE directions_widgets (
  id SERIAL PRIMARY KEY,
  widget_id INT REFERENCES widgets(id) ON DELETE CASCADE,
  venue_id INT REFERENCES venues(id) ON DELETE CASCADE
);
```

```sql
CREATE TABLE insta_map_widgets (
  id SERIAL PRIMARY KEY,
  widget_id INT REFERENCES widgets(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  place_name VARCHAR(200) NOT NULL,
  place_detail VARCHAR(200) NOT NULL,
  address,
  road_address,
  coord_x,
  coord_y,
)
```

인스타그램 게시물 위젯을 추가할 떄, 해야할 일

1. widgets 테이블의 컬럼을 추가한다.
   invitation_id을 어떻게 가져올 것인가? (props or 경로)

- 컴포넌트가 특정 경로에 강하게 종속되고, 다른 곳에서 사용될 가능성이 적다면 경로에서 invitation_id를 추출하는 방식이 더 적합합니다.
  - 컴포넌트가 재사용될 가능성이 높고, 여러 곳에서 사용될 수 있다면 props로 전달받는 것이 더 나은 선택입니다.

2. insta_post_widgets 테이블의 컬럼을 추가한다.

3. invitations 데이터를 새로 가져온다.

order는 어떻게 관리해야 할까?

order가 고려되어야 하는 케이스

- 위젯 삭제
- 위젯 순서 변경
- 위젯 추가

## 문제

### 클라이언트 컴포넌트에서 action 함수에 props를 전달하는 방법

`.bind`를 통해 props를 전달할 수 있다.

### revalidatePath 이후의 데이터 동기화 문제

페이지 컴포넌트를 새로 받아와서, 컴포넌트가 리렌더링되긴 하지만 useState에 넘겨줄 서버 상태가 변경되어도 useState가 동기화되지는 않는다.

이를 해결하려면 2가지 방법이 있을 것 같음

1. 위젯의 업데이트가 성공했을 때, useState를 수동으로 업데이트하는 방법

- 유지보수가 힘들지는 않을까?

2. 모달 컴포넌트를 분리하여, 모달의 여닫힘 상태에 따라 마운트/언마운트 되도록 하는 방법 (이 방법으로 하자)

- 위젯 업데이트 성공 시, 모달을 닫도록 할 예정인데 이때 모달을 언마운트 시키면 이후 다시 그 모달을 열었을 때 useState가 새로 선언되기 때문에 서버 상태에 맞추어 동기화가 됨.
