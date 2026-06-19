import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(dto: SignUpDto) {
        const existingUser = await this.usersService.findByEmail(dto.email);

        if (existingUser) {
            throw new BadRequestException('Email already used');
        }

        const user = new User();
        user.email = dto.email;
        user.firstname = dto.firstname;
        user.lastname = dto.lastname;
        user.password = await bcrypt.hash(dto.password, 10);

        const tokens = await this.generateTokens(user);

        user.refreshToken = await bcrypt.hash(tokens.refreshToken, 10);
        await this.usersService.save(user);

        return tokens;
    }

    async signIn(dto: SignInDto) {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordValid = await bcrypt.compare(dto.password, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user);

        user.refreshToken = await bcrypt.hash(tokens.refreshToken, 10);
        await this.usersService.save(user);

        return tokens;
    }

    async refreshToken(dto: RefreshTokenDto) {
        const payload = this.jwtService.verify(dto.refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET,
        });

        const user = await this.usersService.findById(payload.sub);

        if (!user || !user.refreshToken) {
            throw new UnauthorizedException('Access denied');
        }

        const refreshTokenValid = await bcrypt.compare(dto.refreshToken, user.refreshToken);

        if (!refreshTokenValid) {
            throw new UnauthorizedException('Access denied');
        }

        const tokens = await this.generateTokens(user);

        user.refreshToken = await bcrypt.hash(tokens.refreshToken, 10);
        await this.usersService.save(user);

        return tokens;
    }

    private async generateTokens(user: User) {
        const payload = {
            sub: user.id,
            email: user.email,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET || 'default_access_secret',
            expiresIn: '15m',
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}