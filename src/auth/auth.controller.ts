import { Body, Controller, Delete, Get, HttpCode, Post, Req, Res, SerializeOptions, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import type { RequestWithUser } from './interface/request-with-user.interface';
import { User } from '../users/user.entity';


@Controller('auth')
@SerializeOptions({
    strategy: 'excludeAll'
})
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Log in user' })
    @ApiOkResponse({ description: 'The user has successfully logged in.', type: User })
    @ApiForbiddenResponse({ description: 'Forbidden.' })

    async postLogin(@Req() req: RequestWithUser, @Res() res: Response, @Body() _: LoginUserDto) {
        const { user } = req;
        const cookie = this.authService.getCookieWithJwtToken(user.id);
        res.setHeader('Set-Cookie', cookie);

        return res.send(user)
    }

    @HttpCode(201)
    @Post('register')
    @ApiOperation({ summary: 'Register user' })
    @ApiCreatedResponse({ description: 'The user has successfully registered.', type: User })
    @ApiBadRequestResponse({ description: 'This email is already associated with an account' })
    @ApiInternalServerErrorResponse({ description: 'Something went wrong' })

    async postRegister(@Body() data: RegisterUserDto) {
        return this.authService.registerUser(data)
    }

    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @Delete('logout')
    @ApiOperation({ summary: 'Log out user' })
    @ApiOkResponse({ description: 'The user has successfully logged out.', type: User })

    async deleteLogout(@Res() res: Response) {
        res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return res.sendStatus(204);
    }

    @UseGuards(JwtAuthGuard)
    @Get('current-user')
    @ApiOperation({ summary: 'Current user' })

    async getCurrentUser(@Req() req: RequestWithUser) {
        return new User(req.user)
    }

}
