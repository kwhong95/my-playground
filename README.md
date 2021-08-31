# Kyle Playground

## React + TypeScript

### Day 1 : Types Around Props & State

### Day 2 : Types Around Events and Refs

## Side Project : 브라우저에서 코드를 작성 및 테스트 환경 구축하기

----
### 개요
#### Solution#1 : 코드는 문자열 형식으로 미리보기가 제공된다. 어떻게 안전하게 실행할 것인가?

#### Solution#2 : 코드에는 브라우저 환경에서 실행할 수 없는 JS 고급 구문들이 존재할 수 있다(예: JSX)

#### Solution#3 : 코드에 타 JS 파일이나 CSS를 처리하는 구문이 있을 수 있다. 코드를 실행하기 이전에 가져오기 구문을 처리해야 한다.

----

## [POINT#1 - Sol2] : 리액트 앱에서 바벨 환경을 구축하자!

> 작업 수행 방법에 대해서 영감을 얻기 위해 `Codepen.io`와 `babeljs.io` 두 기존 앱을 살펴 본다.

### 첫번째 영감: 코드 변환 옵션 #1 ([`Codepen.io`](https://codepen.io/))

<img width="788" alt="스크린샷 2021-08-18 오후 12 44 46" src="https://user-images.githubusercontent.com/70752848/129833660-f4bf3171-b294-4272-ab09-033c854da94d.png">

---

### 두번째 영감: 코드 변환 옵션 #2 ([`Babel.io`](https://babeljs.io/))

<img width="379" alt="스크린샷 2021-08-18 오후 12 57 42" src="https://user-images.githubusercontent.com/70752848/129834663-0dacb532-1f4d-4c14-a1c0-9bb23338ec9b.png">

---

## [POINT#2 - Sol3]: What is JS module?
> Javascript Modules : 프로젝트 내부의 다른 파일에서 일부 값을 사용할 수 있도록 하는 파일

#### Javascript Module Systems
> 몇가지 다른 모듈 시스템에 대해서 알아본다.

| 종류 | 정의 | 내보내기 |
|---|---|---|
| AMD | `define(['dep'], (dep) => {});`|
| common.js | `require()` | `module.exports` |
| ES Modules | `import a from 'a';` | `export default 123;`


#### ES Module Syntax
```js
import React from 'react';

export default App;
```

> <h2>바벨 변환 사용<h2/>

#### Common JS
```js
const React = require('react');

module.exports = App;
```

> <h2>번들러 - 웹팩</h2>
> 여러 개의 서로 다른 모듈을 결합하여 하나의 단일 파일로 연결한다.

### Bundler

1) 파일 내용을 읽어 온다 (`index.js`)
2) 모든 코드를 전달하고 작성한 모든 가져오기 및 내보내기 모듈을 찾는다.
3) 찾은 모듈의 하드 드라이브를 찾는다.
4) 찾은 모든 파일을 결합한다.

### 결과적으로 중요한 포인트는 *사용자가 NPM에서 가져온 모든 모듈을 자동으로 찾는 것* 이다.

---

## [POINT#3] 애플리케이션 내부에 번들러를 가진다.

### 번들링 옵션 #1

<img width="656" alt="스크린샷 2021-08-18 오후 2 20 59" src="https://user-images.githubusercontent.com/70752848/129841647-156c6685-8b42-47cd-b4ee-ba4e967e4714.png">

> 문제점: Module들을 설치하게 되므로 로컬에 설치하고 저장하는데 본질적으로 캐싱되며 많은 양의 하드 드라이브를 가지고 된다.

### 번들링 옵션 #2

<img width="679" alt="스크린샷 2021-08-18 오후 2 30 57" src="https://user-images.githubusercontent.com/70752848/129842573-c8964351-f40d-4d55-95a0-ff1c60700a29.png">

> 코드 결과를 캐시하고 항상 동일한 파일을 다운로드 하지 않도록 한 뒤, 하루가 지나면 설치를 중단한다.

---

## [POINT#4] Transpiling/Bundling 을 원격 API 설정 또는 로컬 작업 수행

| 구분 | 설명 |
| --- | --- |
| 원격 API 설정 | 1. NPM 모듈을 쉽게 다운로드하고 해당 API 서버에 캐시할 수 있다. <br> 2. 서버가 전송 및 번들링을 담당하므로 인터넷이 느리거나 제한된 사용자도 실행 가능 <br>  3. 그만큼 많은 대역폭이 사용되므로 엄청난 양의 소스 코드를 다운로드하는 것을 제한해야 한다. |
| 로컬 작업 수행 | 1. API 서버 요청에 의존할 필요가 없으므로 코드를 빠르게 실행 가능하다. <br> 2. 외부 번들러로 만들거나 배포 및 유지 관리하는 것의 필요성이 없다. |

> 사용자의 빠른 코드 실행의 이점을 살리기 위해 로컬 작업 수행으로 개발한다.

### 따라서 수행할 과제

#### 1. 사용자가 정의 플러그인을 사용해 응용 프로그램 내부에서 브라우저 변환을 가져가야 한다.
#### 2. 내부에 Babel 또는 Webpack을 연결하여 한다.
#### 3. Webpack이 브라우저에서 올바르게 작동하기 위해 외부 라이브러리를 활용한다.

### [ESBuild!](https://esbuild.github.io/)
> 고성능 작업을 한방에 해결해주는 ESBuild를 사용하자!

<img width="679" alt="스크린샷 2021-08-18 오후 3 08 23" src="https://user-images.githubusercontent.com/70752848/129846515-bee0388f-cdee-4633-a555-89b5cd7a2e85.png">
