import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockHandler, BlockSeq } from 'spec/dist/demo/server';
import { block } from 'spec/dist/demo/shared';
import { Get, passToStub, Route } from '../../utils/rest-stub';

@Route('block')
class BlockHandlerImpl implements BlockHandler {
  @Get('/show/:Height')
  public showBlock (Height: number): block {
    return undefined;
  }

  @Get('/showAll')
  public showBlocks (): BlockSeq {
    return undefined;
  }

  @Get('/height')
  public getHeight (): number {
    return undefined;
  }
}

@Injectable()
export class BlockHandlerProvider {
  public stub: BlockHandler;

  constructor (public http: HttpClient) {
    console.log('Hello BlockHandlerProvider Provider');
    this.stub = new BlockHandlerImpl();
  }

  public showBlock (Height: number): Promise<block> {
    return passToStub(this, this.showBlock, { Height });
  }

  public showBlocks (): Promise<BlockSeq> {
    return passToStub(this, this.showBlocks, {});
  }

  public getHeight (): Promise<number> {
    return passToStub(this, this.getHeight, {});
  }
}
