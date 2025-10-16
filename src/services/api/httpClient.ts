export interface HttpClient {
  get: <T>(url: string) => Promise<T>;
}

export const httpClient: HttpClient = {
  async get() {
    throw new Error('httpClient not implemented');
  }
};
