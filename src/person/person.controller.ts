import { Controller, Post, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ErrorModel,
  ResponseModel,
  SuccessModel,
} from 'src/shared/response.model';
import { Person } from './person.model';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private service: PersonService) {}

  @Post('get')
  getPerson(@Req() req: Request): ResponseModel<Array<Person> | Person> {
    const { mobile } = req.body;
    const data = this.service.getPerson(mobile);

    return new SuccessModel({ data });
  }

  @Post('add')
  addPerson(@Req() req: Request): ResponseModel {
    const result = this.service.assemblePersonByRequest(req);
    if (typeof result === 'string') return new ErrorModel({ message: result });

    const err = this.service.addPerson(result);

    return err
      ? new ErrorModel({ message: err })
      : new SuccessModel({ data: result.mobile, message: '添加成功' });
  }

  @Post('del')
  delPerson(@Req() req: Request): ResponseModel {
    const { mobile } = req.body;
    if (!mobile) return new ErrorModel({ message: '手机号必传' });
    const err = this.service.delPerson(mobile.toString());

    return err
      ? new ErrorModel({ message: err })
      : new SuccessModel({ data: mobile, message: '删除成功' });
  }

  @Post('update')
  updatePerson(@Req() req: Request): ResponseModel {
    const result = this.service.assemblePersonByRequest(req);
    if (typeof result === 'string') return new ErrorModel({ message: result });

    const err = this.service.updatePerson(result);

    return err
      ? new ErrorModel({ message: err })
      : new SuccessModel({ data: result.mobile, message: '编辑成功' });
  }
}
