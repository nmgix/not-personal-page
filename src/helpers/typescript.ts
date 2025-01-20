// https://github.com/microsoft/TypeScript/issues/33308#issuecomment-529308349
export type PickKey<T, K extends keyof T> = Extract<keyof T, K>;
