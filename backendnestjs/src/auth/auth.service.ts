import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { toAuthUser } from './auth.mapper';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      passwordHash,
    });

    const token = await this.createAccessToken(user.id, user.email);

    return {
      token,
      user: toAuthUser(user),
    };
  }

  private createAccessToken(userId: string, email: string): Promise<string> {
    return this.jwtService.signAsync({ sub: userId, email });
  }
}
