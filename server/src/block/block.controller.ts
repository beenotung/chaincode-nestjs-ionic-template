import {Controller, Get, HttpStatus, Param, Res} from '@nestjs/common';
import {format, not_impl} from '../utils';
import {BlockSeq} from 'spec/dist/demo/server';
import {FabricService} from "../fabric/fabric.service";

@Controller('block')
export class BlockController {
  constructor(public fabricService: FabricService) {
  }

  @Get('/show/:Height')
  async showBlock(@Res()res, @Param('Height')Height: number) {
    // let result: block = not_impl(res);
    Height = Height * 1;
    console.log({Height})
    let result = await this.fabricService.queryBlock(Height);
    result = format(result)
    res.status(HttpStatus.OK).json(result)
  }

  @Get('/showAll')
  showBlocks(@Res()res) {
    let result: BlockSeq = not_impl(res);
  }

  @Get('/height')
  getHeight(@Res()res) {
    let result: number = not_impl(res);
  }
}
