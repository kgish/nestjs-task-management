import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'for-my-eyes-only',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([ UserRepository ]),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
})
export class AuthModule {
}
