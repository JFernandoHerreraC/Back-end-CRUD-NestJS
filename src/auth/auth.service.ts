import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private configService:ConfigService,
    ) { }
    public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.usersRepository.createUser(authCredentialsDto);
    }
    public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user:User = await this.usersRepository.findOne({ username });
        const passwordCompared:Boolean = await bcrypt.compare(password, user.password);
        if (user && passwordCompared) {
            return 'Success';
        } else {
            throw new UnauthorizedException('Please, check your login credentials!');
        }
    }
}
