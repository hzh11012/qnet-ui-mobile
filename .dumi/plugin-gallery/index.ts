import type { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.modifyRoutes(routes => {
    routes.unshift({
      path: '/mobile',
      component: __dirname + '/gallery.tsx'
    });
    routes.unshift({
      path: '/mobile/:component',
      component: __dirname + '/gallery.tsx'
    });
    return routes;
  });
};
