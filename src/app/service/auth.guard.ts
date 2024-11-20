import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const loggedUserData = localStorage.getItem("data");

  const router = inject(Router)
  if(loggedUserData != null){
    return true
  }
  else{
router.navigateByUrl("login")
    return false;
  };
  }
