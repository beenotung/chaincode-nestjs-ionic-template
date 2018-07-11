import { setBaseUrl } from './utils/rest-stub';

export namespace config {
  /**@deprecated*/
  export const base_url = 'http://127.0.0.1:8080/api';
  export const dev = false;
  export const mockServer = true;
  export const mockClient = true;

  export function setServerHost (protocol = 'http', host: string, port: number) {
    setServerUrl(`${protocol}://${host}:${port}`);
  }

  export function setServerUrl (url: string) {
    setBaseUrl(url);
  }
}
config.setServerHost('http', '127.0.0.1', 3000);
