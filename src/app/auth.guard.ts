import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let name = state.url.split('/').filter(str => str)[0];

    if (currentUser ) {
      // logged in so return true
          return true;
    }
  // not logged in so redirect to login page with the return url
  this.router.navigate(['./authentification'], { queryParams: { returnUrl: state.url }});
  return false;
  }
}
