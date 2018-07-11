import {Injectable} from '@nestjs/common';
import {BlockHandler, BlockSeq} from 'spec/dist/demo/server';
import {block} from 'spec/dist/demo/shared';
import {not_impl} from '../utils';
import {FabricService} from "../fabric/fabric.service";

@Injectable()
export class BlockService implements BlockHandler {
  constructor(public fabricService: FabricService) {
  }

  showBlock(Height: number): block {
    return not_impl();
  }

  showBlocks(): BlockSeq {
    return not_impl();
  }

  getHeight(): number {
    return not_impl();
  }
}
