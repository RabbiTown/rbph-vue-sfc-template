import type { RbphContext } from './rbph';

function emptyResult<T>() {
  return Promise.resolve({ code: 0, data: undefined as T });
}

export function createDevRbphContext(): RbphContext {
  return {
    version: 1,
    props: {},
    api: {
      request: emptyResult,
      get: emptyResult,
      post: emptyResult,
    },
    backend: {
      call: emptyResult,
      get: emptyResult,
      post: emptyResult,
    },
    route: {
      gameId: 1,
      puzzleId: 1,
    },
    state: {
      getGame() {
        return { id: 1, title: 'Demo Game' };
      },
      getTeam() {
        return { id: 1, name: 'Demo Team' };
      },
      getPuzzle() {
        return {
          data: {
            id: 1,
            title: 'Demo Puzzle',
          },
        };
      },
    },
    actions: {
      async refreshPuzzle() {},
      async refreshTeam() {},
      async navigate(path: string) {
        window.history.pushState({}, '', path);
      },
      toast(options) {
        console.log('[rbph toast]', options);
      },
    },
    assets: {
      baseUrl: new URL('.', window.location.href).href,
      resolve(path: string) {
        return new URL(path, window.location.href).href;
      },
    },
  };
}
