# ESBuild Bundling Process

## 1. onResolve step

```js
build.onResolve({ filter: /.*/ }, async (args: any) => {
	console.log('onResole', args);
	return { path: args.path, namespace: 'a' };
});
```

본질적인 코드를 재정의하거나 일종 하이재킹 후 빌드함  
파일이 저장된 위치 또는 해당 파일의 실제 경로를 파악하는 자연스러운 과정이다.

## 2. onLoad step

```js
build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.ts.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"',
          };
        }
      });
```

파일을 로드하는 방법을 구축. 즉, 파일 시스템에서 직접 파일을 읽는 것이다.

<img width="764" alt="스크린샷 2021-08-18 오후 6 50 13" src="https://user-images.githubusercontent.com/70752848/129877577-7243c914-0f56-44eb-9f1d-fc9512b5c554.png">


---

## Filters and NameSpaces

### 1. Filter
> 위 코드를 보면, 두 스텝 모두 필터가 있는 개체를 가지고 있으며 모두 정규식 필터이다.

정규식은 두 단계가 모두 실행하고 성공했을 때 실제로 실행되는 방법이다.
즉, 이러한 필터 표현식을 사용해 확인 및 로드 시 실행되는 시기를 제어하며,
이것은 명확하게 로드하려는 파일 이름에 대해서 실행된다.

### 2. NameSpaces
> 필터의 사용 방식과 유사

일부 특정 파일에만 `onLoad` 기능을 적용하려면
```js
// ... 
build.onLoad({ filter: /.*/, namespace: 'a' }) 
//...
```

`namespace: 'a'`가 적용된 파일에만 `onLoad` 기능을 수행합니다.
