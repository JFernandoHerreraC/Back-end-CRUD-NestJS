import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }
    public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.usersRepository.createUser(authCredentialsDto);
    }
    public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user: User = await this.usersRepository.findOne({ username });
        const passwordCompared: Boolean = await bcrypt.compare(password, user.password);
        if (user && passwordCompared) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please, check your login credentials!');
        }
    }
}
