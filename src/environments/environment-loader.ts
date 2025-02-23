import {IEnvironment} from './environment.interface';
import {environment} from './environment';

export const EnvironmentLoader = new Promise<any>((resolve, reject) => {
  const url = `config.json`;

  return fetch(url)
    .then((response) => response.json())
    .then((config: IEnvironment) => {
      for (const key in config) {
        environment[<keyof IEnvironment>key] = config[<keyof IEnvironment>key];
      }

      resolve(environment);
    })
    .catch((err) => {
      reject(err);
    })
});
