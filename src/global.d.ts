// src/global.d.ts
export {};

declare global {
  interface Window {
    __INITIAL_DATA__: {
      articles: any[];
      breadcrumbs: any[];
    };
  }
}
