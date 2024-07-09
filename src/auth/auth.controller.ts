import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from '../users/dto/user.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get('users')
  async find() {
    return await this.userService.findAll();
  }

  @Get('/users/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Post('/register')
  async register(@Body() regiserDto: RegisterDto): Promise<any> {
    const registeredUser = await this.authService.register(regiserDto);
    const user = await this.userService.findOneByEmail(regiserDto.email);
    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      { secret: process.env.SECRET },
    );
    // response.cookie('token', token, {
    //   sameSite: 'none',
    //   expires: new Date(Date.now() + 900000),
    //   path: '/',
    //   httpOnly: true,
    //   secure: true,
    // });

    return { ...registeredUser, token };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const loginUser = await this.authService.login(loginDto);
    const user = await this.userService.findOneByEmail(loginDto.email);
    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      { secret: process.env.SECRET },
    );
    // response.cookie('token', token, {
    //   sameSite: 'none',
    //   expires: new Date(Date.now() + 900000),
    //   path: '/',
    //   httpOnly: true,
    //   secure: true,
    // });

    return { ...loginUser, token };
  }

  @Post('/verify')
  async verify(@Body() verifyToken): Promise<string> {
    try {
      const { token } = verifyToken

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
        ignoreExpiration: true,
      });

      return payload;
    } catch (error) {
      return error;
    }
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response): Promise<any> {
    return await this.authService.logout(response);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return await this.userService.update(id, user);
  }
}
