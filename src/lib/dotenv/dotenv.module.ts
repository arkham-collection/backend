import { ConfigModule } from "@nestjs/config"

export default ConfigModule.forRoot({
  envFilePath: [`.env.${process.env.NODE_ENV ?? ""}`],
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
})
