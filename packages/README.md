# Adding a Local-Only API

## 1. The Local API
<img width="878" alt="스크린샷 2021-09-01 오후 1 43 00" src="https://user-images.githubusercontent.com/70752848/131613220-42afcfcf-645a-4687-b7da-ddbd2bdb2b8e.png">

## 2. Adding Dependencies and Running Express

> Installing Dependencies at Local API 

```shell
lerna add express --scope=local-api
lerna add @types/express --dev --scope=local-api
lerna add cors --scope=local-api
lerna add @types/cors --scope=local-api
lerna add http-proxy-middleware --scope=local-api
```

```ts
import express from 'express';


export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  app.listen(port, () => {
    console.log(`Listening on Port`, port)
  });
};
```

### Running `cli/dist/index.js`

<img width="382" alt="스크린샷 2021-09-01 오후 1 57 14" src="https://user-images.githubusercontent.com/70752848/131614335-41164b64-44cd-4793-9f5d-670e068c71bb.png">

