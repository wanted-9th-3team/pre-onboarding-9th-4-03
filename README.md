# 💻 스위치원 pre-onboarding-9th-4-3 과제 제출

<p>
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>
<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img alt="React-Query" src="https://img.shields.io/badge/React Query-v4.22.4-FF4154?style=plastic&logo=reactquery&logoColor=white"/>
<img alt="Axios" src="https://img.shields.io/badge/axios-v1.3.4-5A29E4?style=plastic&logo=axios&logoColor=white"/>
<img alt="Chakra UI" src="https://img.shields.io/badge/Chakra UI-v1.3.4-319795?style=plastic&logo=Chakra UI&logoColor=white"/>
</p>

## ✍ 설치 및 실행 명령어

# react-ts-app

To install the necessary dependencies, run the following command:

```
git clone // this repository
cd this file location
npm install
```

## Getting Started

To start development run:

```
npm run dev
```

To build the application run:

```
npm run build
```

To preview the build output run:

```
npm run preview
```

To run tests, use:

```
npm run test
```

---

## 배포 사이트

[바로가기](https:// /)

---

## ✨ 발전된 부분

```
1. 과제의 의도를 다 같이 분석하여 과제 수행을 위한 프로젝트 라이브러리 선정 및 폴더 구조를 수립했습니다.
2. 코드 유지 보수를 위해 관심사를 분리(SoC)하며 코드를 작성하려 노력했습니다.
4. 각자 구현 한 것들을 PR에 올린 후 코드 리뷰를 심도 있게 진행했습니다.
6. 필터링을 hook에서 관리하는 것이 아닌 query String을 이용하여 구현했습니다.
7. 컴포넌트 별로 테스트 코드를 구현하였습니다.
8. 개별필터가 아닌 다각도로 실제 사이트에서 사용되는 부분을 고려하여 구현했습니다.
```

## 🎓 Best Practice

### 1. 공통

    a. 각 컴포넌트의 대표 파일 이름을 index.tsx로 통일하여 import문을 간결하게 만들었습니다.
    b. eslint & prettier 설정을 통일하여 혼선을 방지했습니다.

### 3. 필터링

    a. =>? searchparams를 이용하여 구현????
    b.

### 4. 정렬

    a.

### 5. 주요 로직

## 👨‍💻 팀원

---

| [강명훈](https://github.com/michoball) |  [김진영](https://github.com/tbs01215)  | [백유리](https://github.com/BaekYuri)  |
| :------------------------------------: | :-------------------------------------: | :------------------------------------: |
| [안윤경](https://github.com/skyhanull) | [구본아](https://github.com/bona373737) | [김재욱](https://github.com/WooGie911) |

## 📝 구현 요구사항 목록

---

### 요구 사항

1. [x] 주어진 데이터를 이용하여 주문 목록 페이지를 구현해주세요

   - [x] 주문 목록 페이지에는 주문에 대한 모든 정보를 표 형태로 확인할 수 있어야 합니다.
   - [x] 주문 목록은 페이지네이션이 구현되어야 합니다(한 페이지에 50건의 주문이 보여야 합니다)
   - [x] 데이터 중에서 오늘의 거래건만 보여지도록 해주세요
     - 여기서 오늘은 **“2023-03-08”**일을 의미합니다.

2. [x] 정렬 기능을 구현해주세요

   - [x] 기본 정렬은 ID 기준 오름차순으로 구현해주세요
   - [x] 표에서 `주문번호`, `거래일 & 거래시간` 버튼을 누르면 각각 내림차순 정렬이 되도록 해주세요

3. [x] 주문 처리 상태에 따라 filtering 기능을 구현해주세요

4. [x] 고객이름을 검색할 수 있도록 해주세요

5. [x] 서버에 들어온 주문을 5초마다 최신화 해주세요

   - [x] 서버 API는 구현되어 있지 않지만, 구현되어 있다는 가정 하에 요구사항을 충족해주세요

6. [x] 컴포넌트에 대한 **테스트 코드**를 구현해주세요

## 🗂️ 파일구조

```


```

<details>
<summary>Package.json</summary>
<div>

## Dependencies

This project uses the following dependencies:

```
"@chakra-ui/icons": "^2.0.17",
"@chakra-ui/react": "^2.5.2",
"@emotion/react": "^11.10.6",
"@emotion/styled": "^11.10.6",
"@rollup/plugin-alias": "^4.0.3",
"axios": "^1.3.4",
"framer-motion": "^10.6.0",
"pagination-react-js": "^1.0.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-query": "^3.39.3",
"react-router-dom": "^6.8.2",
"styled-components": "^5.3.9"
```

## Development Dependencies

This project uses the following development dependencies:

```
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^14.0.0",
"@types/react": "^18.0.28",
"@types/react-dom": "^18.0.11",
"@types/styled-components": "^5.1.26",
"@typescript-eslint/eslint-plugin": "^5.54.0",
"@typescript-eslint/parser": "^5.54.0",
"@vitejs/plugin-react": "^3.1.0",
"eslint": "^8.35.0",
"eslint-config-airbnb": "^19.0.4",
"eslint-config-airbnb-typescript": "^17.0.0",
"eslint-config-prettier": "^8.6.0",
"eslint-plugin-import": "^2.27.5",
"eslint-plugin-jsx-a11y": "^6.7.1",
"eslint-plugin-prettier": "^4.2.1",
"eslint-plugin-react": "^7.32.2",
"eslint-plugin-react-hooks": "^4.6.0",
"husky": "^8.0.3",
"jsdom": "^21.1.0",
"prettier": "^2.8.4",
"typescript": "^4.9.5",
"vite": "^4.1.4",
"vitest": "^0.29.2"
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

</div>
</details>
