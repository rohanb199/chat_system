import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class AuthGuard implements CanActivate{
  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  {
    return this._authService.getStatus();
  }
}
