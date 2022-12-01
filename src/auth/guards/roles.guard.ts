import { Injectable, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const hasRole = (): any => user.role === roles[0];
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(user.role && hasRole())) {
      throw new ForbiddenException('Forbidden');
    }
    return user && user.role && hasRole();
  }
}
