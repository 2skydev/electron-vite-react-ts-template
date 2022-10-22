![electron-vite-template-github-card](https://user-images.githubusercontent.com/43225384/196135599-585afdc5-9905-4400-bb02-ab0e7720da50.png)


# Electron + Vite + React + TypeScript Template

A template for using electron quickly.<br/>
Please understand that the code and explanation are mainly written in Korean. 🥲

<br />

## 특징들 둘러보기
- electron & vite를 사용해 빠른 개발, 빌드가 가능한 TypeScript 환경
- 앱에 필수적인 요소 자동 업데이트, 저장소, 로그 등 사전구성
- 파일 시스템 라우팅 기능 (Next.js에서 사용하던 방식)
- electron 기능 개발시 modules로 분리 개발 가능하도록 구성 (관심사 분리 및 앱의 여러 상태들을 공유하기 위해 modules로 처리) (autoload 처리)
- deeplink 처리 (`modules/deepLink/resolvers` 예시) (autoload 처리)
- 빠른 개발을 위한 파일 생성기 (`yarn g` 명령어로 사용가능)
- Windows, MacOS 크로스플랫폼을 고려한 개발

<br />

## 사용한 프레임워크, 라이브러리

- App framework: [`electron`](https://www.electronjs.org/)
- App build tool: [`electron-builder`](https://www.electron.build/)
- App storage: [`electron-store`](https://github.com/sindresorhus/electron-store)
- App auto updater: [`electron-updater`](https://www.electron.build/auto-update)
- Bundle tool: [`vite`](https://vitejs.dev/)
- Frontend framework: `react` + `typescript`
- Code style: `eslint` + `prettier` + [`@trivago/prettier-plugin-sort-imports`](https://github.com/trivago/prettier-plugin-sort-imports)
- File system based router: [`react-router-dom v6`](https://reactrouter.com/docs/en/v6) + custom (src/components/FileSystemRoutes)
- CSS: [`styled-components`](https://styled-components.com/)
- State management library: [`recoil`](https://hookstate.js.org/)
- Date: [`dayjs`](https://day.js.org/)
- Form value handle: [`formik`](https://formik.org/)

<br />

## 시작하기

> 사용하기 전 레이아웃이나 특정 패키지들이 필요없다면 제거하고 시작하셔도 됩니다.

#### dev mode

```bash
yarn dev
```

#### vite & electron build (현재 OS기준)

```bash
yarn build
```

#### vite & electron build (모든 OS기준)

```bash
yarn build:all
```

<br />

## 스크린샷들
<img width="1718" alt="image" src="https://user-images.githubusercontent.com/43225384/196127143-2fd2fb65-5858-4bda-87a8-97c6e0487d8f.png">
<img width="1718" alt="image" src="https://user-images.githubusercontent.com/43225384/196126603-388acf2c-760b-45f2-8738-5c1d2a4b4892.png">
<img width="1718" alt="image" src="https://user-images.githubusercontent.com/43225384/196126770-08f75a7c-653d-4264-8c38-eb147c55193d.png">

