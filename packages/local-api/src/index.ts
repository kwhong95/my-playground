import express from 'express';
import { createProxyMiddleware } from "http-proxy-middleware";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  app.use(
    createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true, // Enabled WebSocket
      logLevel: 'silent', // Quickly scan many output scrolls from the terminal
    })
  );

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
