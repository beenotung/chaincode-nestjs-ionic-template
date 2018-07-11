import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MetaService } from './meta/meta.service';
import { MetaController } from './meta/meta.controller';
import { BlockService } from './block/block.service';
import { BlockController } from './block/block.controller';
import { DemoModule } from './demo/demo.module';
import { FabricService } from './fabric/fabric.service';

@Module({
  imports: [DemoModule],
  controllers: [AppController, TransactionController, UserController, MetaController, BlockController],
  providers: [ AppService, TransactionService, UserService, MetaService, BlockService, FabricService ]
})
export class AppModule {}
