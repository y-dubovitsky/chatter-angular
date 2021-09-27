import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { TokenStorageService } from '../service/token-storage.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private tokenStorageService: TokenStorageService,
    private notificationService: NotificationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) { // Пользователь не авторизирован
        this.tokenStorageService.logout();
        window.location.reload();
      }

      const error = err.error.message || err.statusText;
      this.notificationService.showNotification(error);

      return throwError(error);
    }));
  }
}

export const authErrorInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useValue: undefined,
    userClass: ErrorInterceptorService,
    multi: true
  }
]