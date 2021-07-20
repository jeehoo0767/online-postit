# ✨Welcom to Online-Postit
>온라인에서 작성 가능한 포스트잇 프로젝트 입니다\
>URL : [https://jeehoo0767.github.io/pre-task/](https://jeehoo0767.github.io/pre-task/)
>- git branch
>    - **master** 마스터 브랜치(최종버전)
>    - **feture/stateManagement/hook** 전역이 아닌 hook을 사용한 상태관리 버전
>    - **feture/drag** react-draggable -> react-rnd 라이브러리를 사용한 드래그 테스트 브랜치
>    - **feature/test/react-dnd** react-dnd를 사용한 드래그 테스트 브랜치(최종 버전에선 사용하지 않음)
>    - **feture/test/redux-saga** 리덕스 사가, 툴킷 적용 테스트를 위한 브랜치

# ✔Feture List
>- 레이아웃은 좌측의 보드목록, 우측의 보드로 구성됩니다
>- 보드목록 최하단의 [+] 버튼을 누르면 새로운 보드가 생성됩니다.
>- 보드의 상단에는 보드명이 나타납니다. 보드명을 클릭하여 수정할 수 있습니다.
>- 보드 바닥을 더블클릭하면, 빈 포스트잇이 생성됩니다.
>- 포스트잇의 제목과 본문을 클릭하여 수정할 수 있습니다.
>- 포스트잇의 타이틀 영역 우측 상단의 [–] 버튼을 클릭하여 본문 영역을 숨겼다 보여줄 수 있습니다.
>- 포스트잇의 타이틀 영역 우측 상단의 [X] 버튼을 클릭하여 메모를 삭제할 수 있습니다. 이 때, 제목이나 본문에 내용이있을 경우에는 “정말 삭제하시겠습니까?” 라는 확인 다이얼로그가 나타납니다.
>- `ctrl`(or `cmd`)+ `alt` + `N` 을입력하면, 빈 포스트잇이 생성된 후 제목을 수정할 수 있는 상태가 됩니다.
>- 페이지 새로고침을 해도 데이터가 유지됩니다. (local storage 이용)
>- 포스트잇의 타이틀을 드래그하여 위치를 옮길 수 있습니다.
>- 포스트잇의 테두리 부분을 드래그하여, 포스트잇의 크기를 조절할 수 있습니다.
>- 데이터를 저장하는 방식은 localStorage를 저장소로 쓰며 Redux-saga를 사용하였습니다.

# 🚀 Usage
>- 프로젝트 클론
>```
>git clnoe https://github.com/jeehoo0767/pre-task.git
>```
>- 브랜치 체크아웃
>```
>git checkout "branch_name"
>```
>- 노드 패키지 설치
>```
>npm install or yarn install
>```
>- 프로젝트 시작
>```
>npm start or yarn start
>```

# 🌝Directory structure
![image](https://user-images.githubusercontent.com/66991772/126349724-7dceacae-f7b8-486f-88f7-be542433d1c2.png)
- **api**: saga에서 요청 할 fakeAPI가 있는 디렉토리 (localStoreage에서 아이템을 get -> Promise로 리턴)
- **backup**: hook 상태관리 버전에서 사용했던 eventHandler 함수 모듈
- **components"": 페이지에 그려질 컴포넌트
- **Modal**: 삭제 요청 시 확인 요청을 받는 모달이 있는 디렉토리
- **Note**: 실제 포스트를 그릴 컴포넌트가 있는 디렉토리 이며 NoteList 컴포넌트 안에서 각 포스트를 렌더링 한다
- **Note/Header**: 좌측 포스트의 제목 목록을 렌더링 하는 컴포넌트
- **models**: 전역에서 관리되는 포스트의 타입을 정의해 놓은 모듈이 있는 디렉토리
- **store**: 리덕스 스토어
- **store/feature/postSlice**: redux-toolkit을 활용한 리듀서 slice가 있는 모듈(안에 모든 액션 정의)
- **store/saga/postSaga**: 실제 비동기 처리를 수행할 postWatchSaga, postWokerSaga를 정의해 놓은 모듈
- **store/saga/index**: watchSaga를 하나로 합칠 rootSaga를 정의해 놓은 모듈
- **store/index**: combineReducers, store를 생성하는 기능을 하는 모듈
- **utils**: 좌표 생성 시 랜덤한 좌표값을 얻는 함수를 정의해 놓은 모듈(다른 모듈 추가 가능성 有)


# 🤝Use Skills
>- **react**\
>doc: [https://ko.reactjs.org/](https://ko.reactjs.org/)
>- typescript\
>doc: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
>- **react-bootstrap**\
>css 스타일링을 위해 react-bootstrap 사용\
>doc: [https://react-bootstrap.github.io/](https://react-bootstrap.github.io/)
>
>- **react-rnd**\
>드래그, 리사이징을 위해 사용한 라이브러리\
>npm: [https://www.npmjs.com/package/react-rnd](https://www.npmjs.com/package/react-rnd)\
>github: [https://github.com/bokuweb/react-rnd](https://github.com/bokuweb/react-rnd)
>
>- **styled-components**\
>가변 스타일링을 위해 사용한 라이브러리\
>doc: [https://styled-components.com/](https://styled-components.com/)
>
>- **redux**\
>전역 상태관리를 위해 사용\
>doc: [https://ko.redux.js.org/introduction/getting-started/](https://ko.redux.js.org/introduction/getting->started/)  
>
>- **redux-toolkit**\
>효율적인 리덕스 개발을 위해 사용한 라이브러리\
>doc: [https://redux-saga.js.org/](https://redux-saga.js.org/)
>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;리덕스 툴킷의 장점\
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Simple: 스토어 설정, 리듀서 생성, 불변성 업데이트 로직 사용을 편리하게 하는 기능 포함\
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Opitionated: 스토어 설정에 관한 기본 설정 제공, 일반적으로 사용되는 redux addon이 내장\
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Powerful : Immer에 영감을 받아 '변경'로직으로 '불변성'로직 작성 가능, state 전체를 slice로 자동으로 만들 수 있음\
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Effective : 적은 코드에 많은 작업을 수행 가능
>- **redux-saga**\
>효율적인 비동기 처리를 위한 redux middleware (본 프로젝트에 첫 사용경험)

