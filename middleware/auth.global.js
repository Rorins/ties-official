import { auth } from "~/plugins/firebase";

export default defineNuxtRouteMiddleware((to, from ) =>{
  console.log(to.path)
  const user = auth.currentUser;
  const protectedRoutes= ['/dashboard'];
  const isAuthRequired = protectedRoutes.includes(to.path);
  
  //If user is not logged in
  if (isAuthRequired && !user) {
    return navigateTo("/")
  }
}) 