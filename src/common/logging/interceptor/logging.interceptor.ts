import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from '../logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { method, url, query, body } = req;

    this.loggingService.log(
      `Request: ${method} ${url} query=${JSON.stringify(query)} body=${JSON.stringify(body)}`,
      'LoggingInterceptor',
    );

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        this.loggingService.log(
          `Response: ${method} ${url} - ${res.statusCode}`,
          'LoggingInterceptor',
        );
      }),
    );
  }
}
