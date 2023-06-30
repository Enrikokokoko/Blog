import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SECRET, TIME } from 'src/config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: SECRET,
      signOptions: {
        expiresIn: TIME
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
