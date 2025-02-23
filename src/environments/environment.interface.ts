export interface IEnvironment {
  apiUrl: string,
  baseHref: string,
  environment: 'localhost' | 'test' | 'production' | string,
}
