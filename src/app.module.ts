import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationsSchema } from './config.schema';
@Module({
  imports: [TasksModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationsSchema,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => {
        return {
          type: 'mysql',
          host: ConfigService.get('HOST_DB'),
          port: parseInt(ConfigService.get('PORT_DB')),
          username: ConfigService.get('USERNAME_DB'),
          password: ConfigService.get('PASSWORD_DB'),
          database: ConfigService.get('NAME_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
