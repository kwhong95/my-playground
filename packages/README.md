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

## Error Handling

### If the port on the server that you want to run is already running...
<img width="470" alt="스크린샷 2021-09-01 오후 2 02 20" src="https://user-images.githubusercontent.com/70752848/131614891-cc6d4ec4-55a6-4110-9499-928988b456ca.png">
<img width="382" alt="스크린샷 2021-09-01 오후 2 02 09" src="https://user-images.githubusercontent.com/70752848/131614747-0c8d7c10-bd21-43c9-abb8-4a4a01a4e5e9.png">

### How can users check errors intuitively?

#### First, Modify the server command execution part to the try catch syntax.

```ts
// Action of serveCommand Function
.action((filename = 'notebook.js', options: { port: string }) => {
  try {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), filename, dir);
  } catch (err) {
    console.log('Heres the problem', err.message)
  }
});
```

#### Second, Activate the catch phrase at the time you run the app.
`local-api/src/index.ts`
> Serve function returns Promise
```ts
// serve function
return new Promise<void>((resolve, reject) => {
  app.listen(port, resolve).on('error', reject);
});
```

> Apply an asynchronous function to the behavior of a serve command.
`cli/src/commands/serve.ts`
```ts
// Action of serveCommand Function
.action( async (filename = 'notebook.js', options: { port: string }) => {
  try {
    const dir = path.join(process.cwd(), path.dirname(filename));
     await serve(parseInt(options.port), filename, dir);
  } catch (err) {
    console.log('Heres the problem', err.message)
  }
});
```

#### Last, When you run cli again,

<img width="541" alt="스크린샷 2021-09-01 오후 2 37 00" src="https://user-images.githubusercontent.com/70752848/131617599-5553fd92-368a-431e-b763-daee1d257f4d.png">

> As shown above, the error can be checked intuitively.
