export interface IBaseAdapter {
  request<T>(path: string): Promise<T>;
}
