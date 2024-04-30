import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    Logger.log(JSON.stringify(context.switchToHttp().getRequest().body),'REQUEST');
    return next.handle().pipe(tap((response:object) => Logger.log(JSON.stringify(response),'RESPONSE')));
  }
}
