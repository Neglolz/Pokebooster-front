import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const log = (next: NavigationGuardNext, to: RouteLocationNormalized) => {
  return next();
};
