import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userToken = this.extractTokenFromHeader(request)
    userToken ? this.checkUserToken(userToken) : false
    if (userToken) {
      return true
    }
    return false
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const userToken = request.headers['authorization']?.split(' ')[1];
    return userToken ? userToken : undefined
  }

  private checkUserToken(userToken:string):boolean{
    return userToken === 'tomek' ? true : false
  }

}
