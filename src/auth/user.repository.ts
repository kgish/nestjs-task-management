import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) { // Duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}