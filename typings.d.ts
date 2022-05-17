declare module '*.css';
declare module "*.png";

declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}

