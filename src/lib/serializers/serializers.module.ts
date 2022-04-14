import { Global, Module } from "@nestjs/common"
import { TreeifySerializer } from "./treeify.serializer"

@Global()
@Module({
  providers: [TreeifySerializer],
  exports: [TreeifySerializer],
})
export class SerializersModule {}
