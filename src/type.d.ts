interface StyleModule {
  [key: string]: any;
}

declare module "*.css" {
  const style: StyleModule;
  export default style;
}

declare module "*.less" {
  const style: StyleModule;
  export default style;
}

declare module "*.svg"
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.gif"
declare module "*.bmp"
declare module "*.tiff"
