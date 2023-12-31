import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { AuthGuard } from './auth.guard';

import { AuthService } from './auth.service';
import { AccountDecorator } from './account.decorator';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController
{
    constructor(private readonly authService: AuthService)
    {}

    @Post('register')
    public async register(@Body() registerDto: RegisterDto, @Res() response: Response)
    {
        return this.authService.register(registerDto, response);
    }

    @Post('login')
    public async login(@Body() loginDto: LoginDto, @Res() response: Response)
    {
        return this.authService.login(loginDto, response);
    }

    @Get('logout')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async logout(@Req() request: Request, @Res() response: Response)
    {
        return this.authService.logout(request, response);
    }

    @Get('refresh')
    public async refresh(@Req() request: Request)
    {
        return this.authService.refresh(request);
    }

    @Get('me')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public me(@AccountDecorator() accountId: string)
    {
        return this.authService.me(accountId);
    }
}
