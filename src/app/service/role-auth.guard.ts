import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleAuthGuard: CanActivateFn = (route, state) => {
  const loggedUserData :any = localStorage.getItem("data");
  const parsedData = JSON.parse(loggedUserData);
  const router = inject(Router)
  const allowedRole = route.data["roles"]
  if(!parsedData){
    router.navigateByUrl("login")
    return false;
  }
  if (parsedData && allowedRole.includes(parsedData.role)) {
    return true
  }
  else{
router.navigateByUrl("login")
    return false;
  };
};
