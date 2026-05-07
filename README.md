![Honeycam 2025-07-09 06-48-48](https://github.com/user-attachments/assets/611662c9-c1e1-44df-a91f-56ffeb5046c5)# WebtoonWebService
---

# 웹툰 통합 추천 서비스

여러 플랫폼에 흩어져 있는 웹툰을 한 곳에서 모아 보고, 비교할 수 있는 웹 서비스입니다.

졸업 프로젝트로 시작한 작업을 이후에 더 다듬어 나가는 과정에서, **Next.js의 App Router**, **React Query**, **Sanity(Headless CMS)** 같은 기술들을 직접 적용해 보며 학습한 내용을 정리한 프로젝트입니다.

> 배포 주소 : [https://webtoon-web-service-renew.vercel.app](https://webtoon-web-service-renew.vercel.app)

<br>

---

## 프로젝트를 시작한 이유

웹툰 시장은 빠르게 성장하고 있지만, 플랫폼마다 서비스가 독립적으로 운영되다 보니
**“다른 플랫폼에 어떤 작품이 있는지조차 알기 어렵다”** 는 점이 늘 아쉬웠습니다.

이런 경험에서 출발해, 여러 플랫폼의 웹툰 정보를 한 화면에서 비교하고
인기 플랫폼이 아니더라도 좋은 작품을 발견할 수 있는 서비스를 만들어 보고 싶었습니다.

졸업 프로젝트 당시에는 백엔드 협업자와 함께 진행하다 연락이 끊기면서 중단됐었는데,
**“그래도 프로젝트는 끝까지 마무리해 보자”** 는 마음에 직접 데이터베이스(Sanity)까지 구축해 다시 완성한 작업입니다.

<br>

---

## 개발자

| 이름 | 역할 |
| --- | --- |
| 안상문 | 기획 · UI/UX 디자인 · 프론트엔드 · 데이터 모델링(Sanity) |

<br>

---

## 기술 스택

### Environment
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Frontend
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next.js%2013-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

### Backend / Auth
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

### Config
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<br>

### 사용한 기술과 선택 이유

- **Next.js 13 (App Router)** — 페이지 단위로 서버 컴포넌트와 클라이언트 컴포넌트를 나눠 쓸 수 있어, 데이터를 미리 받아 보여줘야 하는 페이지(랭킹/장르/신작)와 사용자 상호작용이 필요한 페이지(검색/댓글)를 자연스럽게 분리할 수 있었습니다.
- **TypeScript** — 웹툰, 댓글, 사용자 등 데이터 모델이 여러 곳에서 쓰이다 보니, 타입을 통해 미리 실수를 줄이고 자동완성 도움을 받기 위해 도입했습니다.
- **TailwindCSS** — 작은 프로젝트지만 컴포넌트가 많아, 빠르게 스타일링하고 일관성을 유지하는 데 도움이 되었습니다.
- **React Query (TanStack Query)** — 페이지네이션, 검색, 무한스크롤 같은 비동기 데이터 흐름을 직접 다루기보다, 캐시·프리페칭·리페칭을 한곳에서 관리하기 위해 사용했습니다.
- **Sanity** — 이전에는 Firebase만 사용해 봤기 때문에, 이번에는 다른 데이터베이스도 써 보고 싶어 Sanity를 선택했습니다. 스키마를 직접 정의하고, GROQ로 쿼리를 작성하면서 데이터 모델링에 대해 더 고민해 볼 수 있었습니다.
- **NextAuth** — 직접 인증을 구현하기보다는, 소셜 로그인 흐름을 간단히 적용해 보는 데 집중하기 위해 도입했습니다.

<br>

---

## 프로젝트 구조

```
src/
├── app/                # Next.js App Router (페이지 + API Routes)
│   ├── api/            # 웹툰/장르/검색/댓글/좋아요 API
│   ├── rank/           # 전체 랭킹 페이지
│   ├── genre/          # 장르별 랭킹 페이지
│   ├── new/            # 신작 웹툰 페이지
│   ├── search/         # 검색 페이지
│   ├── webtoon/[id]/   # 웹툰 상세 페이지
│   ├── user/[name]/    # 마이페이지(좋아요한 작품)
│   └── auth/signin/    # 로그인 페이지
├── components/         # UI 컴포넌트 (도메인별로 폴더 분리)
│   ├── comment/        # 댓글 작성/목록
│   ├── search/         # 검색 입력 + 결과 카드
│   ├── rank/ genre/ new/ my/  # 페이지별 리스트 컴포넌트
│   └── ui/             # 아이콘, 버튼 등 작은 단위 컴포넌트
├── service/            # Sanity 쿼리, 외부 호출 함수
├── hook/               # 커스텀 훅 (useDebounce, useIntersectionObserver 등)
├── context/            # React Query · Auth · Comment 컨텍스트
├── models/             # 공용 타입 정의 (webtoon, user, comment 등)
├── auth/               # NextAuth 옵션
└── mock/               # 메뉴/장르 등 정적 데이터
```

폴더를 도메인별로 나누고, **데이터 요청은 `service`** / **상태 관리는 `hook`·`context`** / **표현은 `components`** 로 책임을 분리하는 것을 의식하며 작성했습니다.

<br>

---

## 주요 기능

- **플랫폼 보정 랭킹**
  단순 조회수가 아니라 `(웹툰 조회수 / 해당 플랫폼의 전체 조회수)` 를 기준으로 점수를 매겨, 인기 플랫폼에만 순위가 몰리지 않도록 했습니다.
- **장르별 랭킹**
  판타지, 액션, 로맨스, 무협 등 주요 장르별로 랭킹을 따로 제공해, 취향에 맞는 작품을 더 쉽게 찾을 수 있도록 했습니다.
- **다양한 방식의 검색**
  제목뿐 아니라 **장르 / 연재 요일** 만으로도 검색이 가능합니다. 검색 입력에는 디바운스를 적용해 서버 요청을 줄였습니다.
- **댓글 기능**
  로그인한 사용자가 웹툰 상세 페이지에서 코멘트를 남길 수 있어, 작품을 보기 전에 다른 사람의 인상을 미리 확인할 수 있습니다.
- **좋아요 / 마이페이지**
  관심 있는 웹툰을 저장하고, 마이페이지에서 모아 볼 수 있습니다.
- **신작 모아 보기**
  연재 시작 후 3개월 이내의 작품을 따로 모아 볼 수 있는 신작 페이지를 제공합니다.

<br>

---

<br>

# 실행 결과

<img width="300" alt="화면 캡처 2025-06-02 213821" src="https://github.com/user-attachments/assets/9627a368-7dff-48b3-9fc6-05d7d1760116" />
<img width="300" alt="화면 캡처 2025-06-02 213821" src="https://github.com/user-attachments/assets/c73f515f-cb33-4cbb-a048-5ce13626b163" />
<img width="300" alt="화면 캡처 2025-06-02 213821" src="https://github.com/user-attachments/assets/b44cd59d-d0b9-4be1-9bb7-04b34858bddb" />
<img width="300" alt="화면 캡처 2025-06-02 213821" src="https://github.com/user-attachments/assets/b8ec7dea-146e-4073-849f-66a3ff80604b" />
<img width="300" alt="화면 캡처 2025-06-02 213821" src="https://github.com/user-attachments/assets/37ab39f8-c44e-4ad5-a8a7-caafcfd286d6" />
<img width="300" alt="화면 캡처 2025-06-02 213821" src="https://github.com/user-attachments/assets/59298629-e66c-4f15-a3a1-833d9cee9ea8" />
<img width="300" alt="화면 캡처 2025-06-02 213821" src="https://github.com/user-attachments/assets/7ab24b7a-54bb-41cf-b9ea-dc5d67d01685" />

<br>

---

## 성능 개선 기록

기능 구현뿐 아니라, 실제로 페이지 성능을 측정하고 개선해 보는 경험을 해 보고 싶어
**Lighthouse / 개발자 도구 Performance 탭** 으로 측정한 결과를 바탕으로 다음과 같이 개선했습니다.

####  해당 프로젝트의 홈은 데이터 요청이 없어 오래 걸리지 않을거라는 예상과 달리 첫 번째 페이지의 LCP 가 2.1초 가량으로 생각보다 좋지 않는 성능을 보임.  
  1. 개발자 도구의 성능 탭을 통해 확인한 결과 layout.tsx 의 다운로드 시간이 길었던 것을 확인
  2. 코드 스플리팅을 통해 해당 파일의 컴포넌트들을 동적 임포트.
  3. 모바일 navbar 는 메뉴 버튼을 누르지 않으면 나오지 않기에 스플리팅
  4. 추가로 확인해보니 다른 컴포넌트들보다 react-icons 에서 가져온 search Icon 이 생각보다 매우 큰 크기를 가짐.
  5. 해당 파일까지 스플리팅한 후 LCP 는 0.21 로 매우 높은 성능 개선 효과를 보임.

####  웹툰 목록은 페이지네이션으로 구현되어있기에 첫 로드시 페이지네이션 컴포넌트가 먼저 렌더링 되어 좋지 않은 CLS 점수를 보임.
 1. 각 웹툰들의 스켈레톤 UI 를 만들어서 CLS 최적화
 2. 웹툰 디테일 페이지에 추가적인 스켈레톤 UI 로 CLS 최적화
 3. CLS 가 0.08까지 감소


####  웹툰 목록 첫 번째 페이지의 프리페칭
 1. 웹툰 목록들에서 2, 3번째 페이지는 몰라도 첫 번째 페이지는 목록에 접근하면 무조건 봐야한다.
 2. 따라서 각 목록들의 첫 번째 페이지들을 프리페칭하여 더 빠른 페이지 접근을 가능하게 하였다.
 3. DOMContentLoaded: 422 -> 356 ms 로드: 506 -> 403 ms

#### 검색 입력마다 state의 변경으로 서버에 지속된 요청
 1. 한 번의 입력마다 계속해서 서버에 데이터를 요청하는 상황
 2. 디바운스를 통하여 입력 후 일정시간 동안 추가적인 입력이 없을 때에만 검색이 발생하도록 최적화
 3. 디바운스를 하여도 state 의 변경은 막을 수 없기에 리렌더링이 발생하면서 서버가 요청하는 것 아닌가? 라는 의문이 생김
 4. 하지만 React-query 나 SWR 등을 이용하여 key 를 state가 아닌 디바운스된 state로 만들면 해당 문제도 해결 
 5. 이 과정에서 *"리렌더링이 일어나도 React Query는 왜 다시 요청하지 않을까?"* 라는 의문이 생겼고, queryKey 기반 캐싱 동작을 더 깊이 이해하게 되었습니다.

<br>

---

## 배운 점

- **App Router 기반 Next.js** 에서 서버/클라이언트 컴포넌트를 나누는 기준에 대해 직접 고민해 볼 수 있었습니다.
- **React Query 의 캐싱·프리페칭** 을 단순히 “쓰면 빨라진다” 가 아니라, queryKey가 어떻게 캐시를 식별하는지를 직접 디버깅하며 이해했습니다.
- **Sanity 로 직접 스키마를 설계** 해 보면서, 데이터 모델을 미리 잘 정의해 두는 것이 화면 구성에 얼마나 큰 영향을 주는지 체감했습니다.
- **성능 측정 → 개선 → 재측정** 의 흐름을 실제로 돌려 보면서, "체감"이 아닌 숫자로 변화를 확인하는 경험을 할 수 있었습니다.

<br>

---

## 아쉬웠던 점 / 앞으로 해보고 싶은 것

- 처음에는 **GSAP** 으로 풍성한 페이지 전환 애니메이션을 넣고 싶었지만, 일정상 일부만 적용한 채 마무리되었습니다.
  여유가 생기면 페이지 전환과 마이크로 인터랙션을 더 다듬어 보고 싶습니다.
- `Swiper` 같은 라이브러리에 의존하기보다 직접 캐러셀을 만들어 보면서 학습 효과는 컸지만,
  다음 프로젝트에서는 **"직접 구현 vs 검증된 라이브러리"** 의 기준을 좀 더 명확히 잡아 보고 싶습니다.
- 현재 모바일에 최적화된 인터랙션이 부족한 부분이 있어, 모바일 사용성을 더 올리는 작업도 이어서 해볼 계획입니다.

<br>

---

## 실행 방법

```bash
# 패키지 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build
yarn start
```

`.env` 파일에 다음 환경 변수가 필요합니다.

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
NEXT_PUBLIC_SANITY_SECRET_TOKEN=...
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
```

<br>

---

