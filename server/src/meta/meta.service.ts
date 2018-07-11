import {Injectable} from '@nestjs/common';
import {MetaHandler, MetaSeq, StringSeq} from 'spec/dist/demo/server';
import {not_impl} from '../utils';

@Injectable()
export class MetaService implements MetaHandler {
  all(): MetaSeq {
    // call fabric SDK, call smart contact function
    let res = [{id: 1}, {id: 2}, {id: 3}] as any[];
    return res;
  }

  search(Tags: StringSeq, Keyword: string): MetaSeq {
    return not_impl();
  }
}
