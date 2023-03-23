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

## 배포 사이트 및 프로젝트 노션

[바로가기](https://wanted-9th-3team.github.io/pre-onboarding-9th-4-03/)

[노션링크](https://maroon-dibble-e23.notion.site/pre-onboarding-9th-4-3-341f55bb2ce145b1bd99cef5b8e684b5)

---

## ✨ 발전된 부분

```
1. 과제의 의도를 다 같이 분석하여 과제 수행을 위한 프로젝트 라이브러리 선정 및 폴더 구조를 수립했습니다.
2. 코드 유지 보수를 위해 관심사를 분리(SoC)하며 코드를 작성하려 노력했습니다.
3. 각자 구현 한 것들을 PR에 올린 후 코드 리뷰를 심도 있게 진행했습니다.
4. 필터링을 hook에서 관리하는 것이 아닌 query String을 이용하여 구현했습니다.
5. 컴포넌트 별로 테스트 코드를 구현하였습니다.
6. 개별 필터가 아닌 다각도로 실제 사이트에서 사용되는 부분을 고려하여 구현했습니다.
```

## 🎓 Best Practice

### 1. 필터링 및 정렬

구현 배경
=> 단순히 과제에 나와있는 그대로 하나씩 기능을 구현하는 것이 아닌 실제 사이트에서 하나씩만 적용이 되지 않고 여러가지 기능이
겹쳐 적용하기 때문에 이를 토대로 sort정렬과 filter의 기능을 중복해서 이용할 수 있도록 구현했으며 또한 이상태에서 이름을
검색할 시 그에 맞는 이름이 검색되도록 고려하여 구현했습니다.
a. searchparams를 이용하여 새로고침 시에도 필터링이 유지될 수 있도록 구현하였습니다.
url search params 예시 : ?page=1&name=baek&status=all&sort_by=id_DESC
b. 필터링 요소 : 페이지 번호, 주문 상태, 아이디

### 2. 페이지네이션

    a. pagination-react-js 라이브러리 사용
        i. 총 페이지 수, 페이지 설정 등 여러 변수들을 계산해주고, 간편하게 UI를 작성할 수 있어서 사용하였습니다.
        ii. 페이지네이션의 현재페이지번호(currentPage)가 state로 구현이 되어있어 currentPage가 변경될 때 마다 searchParams의 page도 변경해줘야 해서 번거로운 면이 있었습니다.
    b. 이름 검색 시 전체 데이터에서 필터링하기 때문에, 검색 시 페이지가 첫페이지로 돌아가도록 로직 구현하였습니다.

### 3. 서버 API 갱신

React Query 사용 이유

    a. 서버 데이터를 redux나 recoil 과 같은 상태관리 툴에 복사본으로 저장하여 사용하는 것이 아닌 원본 데이터를 사용할 수 있습니다.
    b. data refetching을 위해 사용을 고민하던 라이브러리인 useInterval보다 코드가 간결하고 별도로 상태관리 툴에 저장할 필요가 없습니다.
    c. 전역 상태관리 툴에 별도로 저장하기위한 코드를 작성하지 않아도 되기때문에 코드량을 확 줄일 수 있습니다.
    d. 별도의 devtool을 가지고 있어서 디버깅이 편합니다.
    e. 최신 유행 라이브러리로 커뮤니티가 매우 활성화 되어있습니다.

### 4. 테스트 코드

    a. 컴포넌트 별로 원하던 동작대로 작동하는지 고려하면서 테스트 코드를 작성하였습니다.
    b. 커스텀 훅에 관한 테스트 코드를 작성하였습니다.
    c. msw로 mock server를 만들어 api통신 test를 작성하였습니다.

### 5. 주요 로직

1. 필터링 로직

```typescript
// 현재 name url query 에 따라서 필터링 후 status에 따라 또 필터링
const filterAll = useCallback(() => {
  let result = [...trade]
  if (name) {
    result = filterTradeByCustomerName(result, name)
  }
  result = filterTradeByStatus(result, status ?? 'all')
  result = sortTrade(result)

  return result
}, [trade, name, status, sortTrade])
```

2. 정렬 로직

```typescript
// 현재 sortBy url query 에 들어있는 값을 기준으로 정렬
const sortTrade = useCallback(
  (nowTrade: TradeItem[]) => {
    switch (sortBy) {
      case 'time_ASC':
        return sortByTransactonTimeASC(nowTrade)
      case 'time_DESC':
        return sortByTransactonTimeDESC(nowTrade)
      case 'id_DESC':
        return sortByIDDESC(nowTrade)
      default:
        return sortByIDASC(nowTrade)
    }
  },
  [sortBy]
)
```

3. serach params 로직

```typescript
// search param에 추가하고 싶은 param = { key: value } 넣기
const setSearchParams = useCallback(
  (setParams: SearchParams) => {
    Object.keys(setParams).forEach(key => {
      urlTerm.set(key, setParams[key])
      serUrlTerm(urlTerm)
    })
  },
  [urlTerm, serUrlTerm]
)
// searchParam에 따른 value 얻기 -> 없으면 빈 string 반환
const getSearchParams = useCallback(
  (searchParam: string) => {
    const urlParam = urlTerm.get(searchParam)
    if (urlParam !== null) {
      return urlParam
    }
    return ''
  },
  [urlTerm]
)
```

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

## 🎥 데모 영상

---

![데모영상](https://raw.githubusercontent.com/BaekYuri/images/main/img/2023_03_22_21_30_03_952.gif)

## 🗂️ 파일구조

```

📦src
 ┣ 📂apis
 ┃ ┗ 📂TableApi
 ┃ ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📂Pagination
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📂SearchInput
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂SortIcon
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂StatusButton
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂TradeTable
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┗ 📂TradeTableItem
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂data
 ┃ ┗ 📜mock_data.json
 ┣ 📂hooks
 ┃ ┗ 📂useUrlSearch
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂NotFound
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂tests
 ┃ ┣ 📂mocks
 ┃ ┃ ┣ 📜handlers.ts
 ┃ ┃ ┗ 📜server.ts
 ┃ ┣ 📂providers
 ┃ ┃ ┣ 📜AppProvider.tsx
 ┃ ┃ ┗ 📜testUtils.tsx
 ┃ ┣ 📜Api.test.tsx
 ┃ ┣ 📜App.test.tsx
 ┃ ┣ 📜CustomHook.test.tsx
 ┃ ┣ 📜Pagination.test.tsx
 ┃ ┣ 📜SearchInput.test.tsx
 ┃ ┣ 📜SortIcon.test.tsx
 ┃ ┣ 📜StatusButton.test.tsx
 ┃ ┣ 📜TradeTable.test.tsx
 ┃ ┗ 📜TradeTableItem.test.tsx
 ┣ 📂utils
 ┃ ┣ 📜filter.ts
 ┃ ┗ 📜sort.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┣ 📜setupTests.ts
 ┣ 📜Type.ts
 ┗ 📜vite-env.d.ts

```

<details>
<summary>Package.json</summary>
<div>

## Dependencies

- `@chakra-ui/icons`: 2.0.17
- `@chakra-ui/react`: 2.5.2
- `@emotion/react`: 11.10.6
- `@emotion/styled`: 11.10.6
- `@rollup/plugin-alias`: 4.0.3
- `axios`: 1.3.4
- `framer-motion`: 10.6.0
- `pagination-react-js`: 1.0.1
- `react`: 18.2.0
- `react-dom`: 18.2.0
- `react-query`: 3.39.3
- `react-router-dom`: 6.8.2
- `styled-components`: 5.3.9

## Dev Dependencies

- `@testing-library/jest-dom`: 5.16.5
- `@testing-library/react`: 14.0.0
- `@testing-library/user-event`: 14.4.3
- `@types/react`: 18.0.28
- `@types/react-dom`: 18.0.11
- `@types/styled-components`: 5.1.26
- `@typescript-eslint/eslint-plugin`: 5.54.0
- `@typescript-eslint/parser`: 5.54.0
- `@vitejs/plugin-react`: 3.1.0
- `eslint`: 8.35.0
- `eslint-config-airbnb`: 19.0.4
- `eslint-config-airbnb-typescript`: 17.0.0
- `eslint-config-prettier`: 8.6.0
- `eslint-plugin-import`: 2.27.5
- `eslint-plugin-jsx-a11y`: 6.7.1
- `eslint-plugin-prettier`: 4.2.1
- `eslint-plugin-react`: 7.32.2
- `eslint-plugin-react-hooks`: 4.6.0
- `husky`: 8.0.3
- `jsdom`: 21.1.0
- `msw`: 1.2.0
- `prettier`: 2.8.4
- `typescript`: 4.9.5
- `vite`: 4.1.4
- `vitest`: 0.29.2

## License

This project is licensed under the MIT license.

</div>
</details>
