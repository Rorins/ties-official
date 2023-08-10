import { auth } from "~/plugins/firebase";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = auth.currentUser;
  console.log("path", to.path);
  console.log("user", user);
  const protectedRoutes = ["/dashboard", "/selection","/ai"];
  const isAuthRequired = protectedRoutes.includes(to.path);

  //If user is not logged in
  if (isAuthRequired && !user) {
    return navigateTo("/");
  }
});
