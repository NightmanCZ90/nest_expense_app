import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// Not Used -- just for tutorial purposes - this is another way of intercepting reponse than in dtos (Exclude x Expose)

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.created_at,
        }

        delete response.created_at;
        delete response.updated_at;

        return response;
      }
      )
    )
  }
}