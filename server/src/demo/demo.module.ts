import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import {FabricService} from "../fabric/fabric.service";

@Module({
  controllers: [DemoController],
  providers:[FabricService],
})
export class DemoModule {}
