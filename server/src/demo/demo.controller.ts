import {Body, Controller, Get, HttpStatus, Param, Post, Req, Res} from '@nestjs/common';
import {FabricService} from "../fabric/fabric.service";

@Controller('demo')
export class DemoController {
  constructor(public fabricService: FabricService) {
  }

  @Get('/get/:id')
  get(@Res() res, @Param('id')id) {
    res.status(HttpStatus.OK).json({user: {id: id}});
  }

  @Post('/create')
  create(@Res() res, @Req()req, @Body()body, @Body('id') id) {
    console.log({req});
    console.log({body});
    res.status(HttpStatus.OK).json({user: {id: id}});
  };

  @Get('/not_impl')
  not_impl(@Res() res) {
    res.status(HttpStatus.NOT_IMPLEMENTED).json('not impl');
  }

  /* Query Example */
  @Get('/getUserVote')
  async getUserVote(@Res() res) {
    const votes = await this.fabricService.queryFunction('vote', 'getUserVote', ['']);
    res.status(HttpStatus.OK).json(JSON.parse(votes.toString()))
  }

  /* Invoke Example */
  @Get('/vote/:id')
  async vote(@Res() res, @Param('id')id) {
    const result = await this.fabricService.invokeFunction('vote', 'voteUser', [id]);
    let tx_id = result[1].tx_id;
    res.status(HttpStatus.OK).json({tx_id});
  }
}
