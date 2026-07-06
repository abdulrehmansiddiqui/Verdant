import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';

type AuthenticatedRequest = Request & { user?: User };

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      return next();
    }

    const token = authorization.slice('Bearer '.length);

    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(token);
      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      req.user = user;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    next();
  }
}
