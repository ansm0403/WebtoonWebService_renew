# WebtoonWebService
---

# 프로젝트 개요

<br>

점점 모바일화 되어가고 있는 사회에서 웹툰을 뗄레야 뗼 수 없는 사업입니다. 

바쁘고 피곤한 현대에 표현에 큰 제약이 없고, 빠르게 읽고 소비할 수 있는 웹툰은 영화, 드라마보다 쉽게 접근할 수 있으며 이러한 장점들은 웹툰의 산업이 빠르게 성장하도록 하였습니다.

하지만 플랫폼마다 서로 독립적이고 경쟁을 하기때문에 각 플랫폼의 정보를 얻기 쉽지않으며, 플랫폼들의 존재 조차 모른다면 좋은 웹툰을 읽을 기회를 잃게됩니다.

이러한 고민으로부터 이번 졸업 프로젝트를 진행하게 되었고, 여러 플랫폼들로 부터 많은 웹툰을 추천 받을 수 있도록 만들었습니다.

<br>

---

# 개발자 소개

<br>

* 안상문 : 프로젝트 기획, UI/UX 디자인, 프론트엔드 개발
 
<br>

---

<br>

# 기술 스택

### Environment

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Development

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![SANITY](https://img.shields.io/badge/SANITY-%23CB3837.svg?style=for-the-badge&logo=sanity&logoColor=white)

### config

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

<br>

---

<br>

# 주요 기능

<br>

* 전체 플랫폼의 웹툰을 (웹툰의 조회수 / 해당 플랫폼의 전체 조회수) 로 계산하여 인기 플랫폼에 치중하지 않고 웹툰의 랭킹을 매깁니다.

* 전체 플랫폼의 랭킹을 주요 장르(판타지, 액션, 로맨스, 무협 등)별로 구분하여 따로 랭킹을 매깁니다.

* 이름뿐 아니라 장르와 요일만으로도 검색할 수 있어 다양한 방식으로 원하는 웹툰을 검색할 수 있습니다.

* 웹툰 마다 코멘트를 작성하여 웹툰을 보기 전에 미리 해당 웹툰의 정보를 얻을 수 있습니다.

* 웹툰을 런칭한지 3개월 이내의 신작 웹툰들을 볼 수 있습니다.

<br>

---

<br>

# 실행 결과

<br>

배포 : https://webtoon-web-service-renew.vercel.app/


<br>

---

<br>

# 개선점

<br>

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


<br>

---

<br>

# 후기


<br>

이번 프로젝트는 JAVA Spring 백엔드 개발자와 협업으로 만들던 프로젝트가 연락할 수단이 없어 이 프로젝트를 완성시키고 싶은 마음에 시작했습니다.

그래서 이번엔 firebase가 아닌 Sanity 를 사용하여 데이터베이스를 구축하여 직접 만들어보았습니다. 

이번 프로젝트에서는 react-icons 같은 아이콘들이나, 폼을 더 유용하게 사용할 수 있는 React-hook-form 을 사용하긴 했지만 Swiper 같이 다른 유용한 패키지를 사용하지 않고 최대한 직접 만드는 방향으로 나아갔습니다. 

그리고 이전에 프로젝트를 만들며 배웠던 요소들을 최대한 활용하여 복습을 겸하는 프로젝트로 만들면서 프로젝트 크기는 키우려고 노력했습니다.

하지만 gsap 를 이용하여 많은 애니메이션을 구축하려고 했지만 결국 시간에 쫓겨서 못했던 점이 너무 아쉽습니다. 여유가 생기면 이 프로젝트에도 애니메이션들을 많이 구현해보고 싶습니다.

<br>

---


