import {Controller, Get, HttpStatus, Param, Res} from '@nestjs/common';
import {not_impl} from '../utils';
import {MetaSeq, StringSeq} from 'spec/dist/demo/server';
import {MetaService} from './meta.service';

@Controller('meta')
export class MetaController {
  constructor(public metaService: MetaService) {
  }

  @Get('/all')
  all(@Res()res) {
    // let result: MetaSeq = not_impl(res);
    res.status(HttpStatus.OK).json(this.metaService.all());
  }

  @Get('/search/:Tags/:Keyword')
  search(@Res()res, @Param('Tags')Tags: StringSeq, @Param('Keyword')Keyword: string) {
    let result: MetaSeq = not_impl(res);
  }
}
