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

## Error Handling Solution

### Let's handle errors more intuitively.

#### Error Handling Using Error Codes

`serve.ts`
```ts
try {
  // ...
  console.log(
    `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
  )
} catch (err) {
  if (err.code === 'EADDRINUSE') {
    console.error('Port is in use. Try running on a different port');
  } else {
    console.log('Heres the problem', err.message);
  }
  process.exit(1); // If server startup fails, force shutdown
}
```

### Execution Results
#### On Success Result
<img width="581" alt="스크린샷 2021-09-01 오후 3 21 29" src="https://user-images.githubusercontent.com/70752848/131621866-3a077f6c-285d-4380-bcb6-57a7037a21e7.png">

#### On Error Result 
<img width="381" alt="스크린샷 2021-09-01 오후 3 22 09" src="https://user-images.githubusercontent.com/70752848/131621934-ce5b2019-be3e-406f-a554-552ec971c272.png">


## Accessing the React App

<img width="765" alt="스크린샷 2021-09-01 오후 3 38 11" src="https://user-images.githubusercontent.com/70752848/131623762-5592df79-463e-4582-93cd-2de1947c8594.png">

<img width="775" alt="스크린샷 2021-09-01 오후 3 38 51" src="https://user-images.githubusercontent.com/70752848/131623846-f2161d15-4120-4835-873d-6b84bebf92b4.png">


### Using `http-proxy-middleware`

`serve.ts`
```ts
// Adding This Logic
app.use(
  createProxyMiddleware({
    target: 'http://localhost:3000',
    ws: true, // Enabled WebSocket
    logLevel: 'silent', // Quickly scan many output scrolls from the terminal
  })
);
```

### Running Root Project: `npm run start`

<img width="1421" alt="스크린샷 2021-09-01 오후 3 57 28" src="https://user-images.githubusercontent.com/70752848/131626204-f3aef39a-b910-4353-ba59-75d31e2b8244.png">

## Building a Production Bundle

### Direct access to the React Build folder

<img width="698" alt="스크린샷 2021-09-01 오후 4 30 42" src="https://user-images.githubusercontent.com/70752848/131630645-1abcc8da-92ea-4831-aafd-c88eabb33c4b.png">

> **⚠** But, It's not a good solution!

### Why not?

<img width="497" alt="스크린샷 2021-09-01 오후 4 40 31" src="https://user-images.githubusercontent.com/70752848/131632033-9673d036-9f15-44eb-951f-2bfcd653adbd.png">

### Different Solution 

#### Accessing via absolute path

```ts
// ...
import path from "path";
// app.use(
//   createProxyMiddleware({
//     target: 'http://localhost:3000',
//     ws: true, // Enabled WebSocket
//     logLevel: 'silent', // Quickly scan many output scrolls from the terminal
//   })
// );  DELETE !!! 

const packagePath = require.resolve('local-client/build/index.html');
  app.use(express.static(path.dirname(packagePath)));
```
