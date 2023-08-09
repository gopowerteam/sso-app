export {}

declare module 'vue' {
  interface ComponentCustomProperties {
      $viewport: {
          reset:()=>void,
          mobile: boolean,
          desktop: boolean
      };
  }
}
