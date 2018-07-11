import {HttpStatus} from '@nestjs/common';
import * as path from "path";

export function not_impl(res?): any {
  if (res) {
    return res.status(HttpStatus.NOT_IMPLEMENTED).json('not_impl');
  }
  throw new Error('not_impl')
}

export function ok(res, data) {
  return res.status(HttpStatus.OK).json(data);
}

export const store_path = path.join(__dirname, '../hfc-key-store');

export function format(o) {
  if (Array.isArray(o)) {
    return o.map(format)
  }
  if (Buffer.isBuffer(o) || o instanceof Buffer) {
    return o.toString();
  }
  return o;
}

export function log(p) {
  p.then(res => {
    return console.log('result:', format(res));
  });
  return p;
}