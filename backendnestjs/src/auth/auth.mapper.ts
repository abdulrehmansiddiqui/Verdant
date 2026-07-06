import { User } from '../users/entities/user.entity';
import { AuthUserResponse } from './types/auth-response.type';

export function toAuthUser(user: User): AuthUserResponse {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
  };
}
