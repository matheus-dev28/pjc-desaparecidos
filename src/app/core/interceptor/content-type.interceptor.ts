import { HttpInterceptorFn } from '@angular/common/http';

export const contentTypeInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.body instanceof FormData) {
    const headers = req.headers.delete('Content-Type');
    return next(req.clone({ headers }));
  }

  if (!req.headers.has('Content-Type')) {
    req = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });
  }
  return next(req);
};
