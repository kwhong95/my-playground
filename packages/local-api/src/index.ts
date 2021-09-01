import express from 'express';
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  const packagePath = require.resolve('local-client/build/index.html');
  app.use(express.static(path.dirname(packagePath)));

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
