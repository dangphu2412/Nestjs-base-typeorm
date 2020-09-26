import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig, swaggerDocumentOptions, swaggerSetupOptions } from './swagger.config';

export class BundleApp {
  private readonly app: INestApplication;
  private readonly logger: Logger;
  constructor(app: INestApplication) {
    this.app = app;
    this.prefixOptionsApp();
    this.setSwagger();
    this.listenApp();
  }

  private prefixOptionsApp() {
    this.app.setGlobalPrefix('v1');
    this.app.useGlobalPipes(new ValidationPipe());
  }

  private setSwagger() {
    if (process.env.NODE_ENV !== 'production') {

      const document = SwaggerModule.createDocument(
        this.app,
        swaggerConfig,
        swaggerDocumentOptions
      );
  
      SwaggerModule.setup('docs', this.app, document, swaggerSetupOptions);
    }
  }

  private async listenApp() {
    const port = process.env.PORT || 3000;
    await this.app.listen(port);
    console.log(`Application listening on port ${port}`);
  }
}