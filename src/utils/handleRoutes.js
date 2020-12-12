/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function filterAllRoutes(constantRoutes) {
  const allRoutes = constantRoutes.filter((route) => {
    if (route.component) {
      if (route.component === "Layout") {
        route.component = (resolve) => require(["@/layouts"], resolve);
      } else if (route.component === "EmptyLayout") {
        route.component = (resolve) =>
          require(["@/layouts/EmptyLayout"], resolve);
      } else {
        let path = "views/" + route.component;
        //判断RegExpd对象是否被.test(包含)
        if (
          new RegExp("^/views/.*$").test(route.component) ||
          new RegExp("^views/.*$").test(route.component)
        ) {
          path = route.component;
        } else if (new RegExp("^/.*$").test(route.component)) {
          path = "views" + route.component;
        } else if (new RegExp("^@views/.*$").test(route.component)) {
          path = route.component.str.slice(2);
        } else {
          path = "views/" + route.component;
        }
        route.component = (resolve) => require([`@/${path}`], resolve);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAllRoutes(route.children);
    }
    if (route.children && route.children.length === 0) {
      delete route.children;
    }
    return true;
  });
  return allRoutes;
}

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 判断当前路由是否包含权限
 * @param permissions
 * @param route
 * @returns {boolean|*}
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role));
  } else {
    return true;
  }
}

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description intelligence模式根据permissions数组拦截路由
 * @param routes
 * @param permissions
 * @returns {[]}
 */
export function filterAsyncRoutes(routes, permissions) {
  const finallyRoutes = [];
  routes.forEach((route) => {
    const item = { ...route
    };
    //如果有权限
    if (hasPermission(permissions, item)) {
      //如果有子路由
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions);
      }
      finallyRoutes.push(item);
    }
  });
  return finallyRoutes;
}
