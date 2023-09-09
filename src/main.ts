import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void>
{
    const logger: Logger = new Logger('Bootstrap');
    const app: INestApplication = await NestFactory.create(AppModule);
    const port: number = +process.env.PORT;

    app.use(helmet
    ({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy:
        {
            directives:
            {
                imgSrc: ['\'self\'', 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
                scriptSrc: ['\'self\'', 'https: \'unsafe-inline\''],
                manifestSrc: ['\'self\'', 'apollo-server-landing-page.cdn.apollographql.com'],
                frameSrc: ['\'self\'', 'sandbox.embed.apollographql.com'],
            },
        },
    }));
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Nooshin API')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', description: 'Enter Access Token', in: 'header' }, 'JsonWebToken')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    logger.log(`Application running on http://localhost:${ port }`);
    logger.log(`Swagger running on http://localhost:${ port }/api`);
}

bootstrap();
