export type RbphHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RbphApiRequestOptions {
  path: string;
  method?: RbphHttpMethod;
  query?: Record<string, unknown>;
  body?: unknown;
}

export interface RbphApiResult<T = unknown> {
  code: number;
  data: T;
}

export type RbphLooseObject = Record<string, any>;

export interface RbphContext {
  version: 1;
  props: unknown;
  api: {
    request<T = unknown>(options: RbphApiRequestOptions): Promise<RbphApiResult<T>>;
    get<T = unknown>(path: string, query?: Record<string, unknown>): Promise<RbphApiResult<T>>;
    post<T = unknown>(path: string, body?: unknown): Promise<RbphApiResult<T>>;
  };
  backend: {
    call<T = unknown>(name: string, body?: unknown): Promise<RbphApiResult<T>>;
    get<T = unknown>(name: string, query?: Record<string, unknown>): Promise<RbphApiResult<T>>;
    post<T = unknown>(name: string, body?: unknown): Promise<RbphApiResult<T>>;
  };
  route: {
    gameId?: number;
    puzzleId?: number;
  };
  state: {
    getGame(): RbphLooseObject | undefined;
    getTeam(): RbphLooseObject | undefined;
    getPuzzle(): RbphLooseObject | undefined;
  };
  actions: {
    refreshPuzzle(): Promise<void>;
    refreshTeam(): Promise<void>;
    navigate(path: string): Promise<void>;
    toast(options: { title?: string; description?: string; color?: string }): void;
  };
  assets: {
    baseUrl: string;
    resolve(path: string): string;
  };
}
