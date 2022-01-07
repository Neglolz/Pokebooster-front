import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const log = (next: NavigationGuardNext, to: RouteLocationNormalized) => {
  console.log(to.name);
  console.log("AHAHAHAHAAHAH");
  console.log("AHAHAHAHAAHAH");
  console.log("AHAHAHAHAAHAH");
  console.log("AHAHAHAHAAHAH");
  console.log("AHAHAHAHAAHAH");
  console.log("AHAHAHAHAAHAH");

  return next();
};
