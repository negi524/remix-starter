/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    !process.env.VITEST &&
      reactRouter({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_singleFetch: true,
          v3_lazyRouteDiscovery: true,
        },
      }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    coverage: {
      enabled: true,
      // 対象はappディレクトリ配下
      include: ["app/**"],
      reporter: ["text", "json", "json-summary", "html"],
    },
  },
});
