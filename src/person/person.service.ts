import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { join } from 'path';
import { FsStore } from 'src/utils/fs-store';
import { Person } from './person.model';

@Injectable()
export class PersonService {
  private store: FsStore<Array<Person>>;

  constructor() {
    this.store = new FsStore(
      join(FsStore.STORE_DIR, 'model/person.model.json'),
    );
  }

  addPerson(person: Person): string {
    const persons = this.getPerson() as Array<Person>;
    if (persons.find((p) => p.mobile === person.mobile)) return '人员已经存在';

    return this.store.set('data', [...persons, person]) ? '' : '写入文件失败';
  }

  delPerson(mobile: string): string {
    const persons = this.getPerson() as Array<Person>;
    const person = persons.find((p) => p.mobile === mobile);
    if (!person) return '人员已不存在';

    const _person = new Person({
      ...person,
      update_time: Date.now(),
      status: 9,
    });

    return this.updatePerson(_person);
  }

  updatePerson(person: Person): string {
    const persons = this.getPerson() as Array<Person>;
    const _person = persons.find((p) => p.mobile === person.mobile);
    if (!_person) return '人员已不存在';

    // 更新 person
    Object.assign(_person, person, { update_time: Date.now() });

    return this.store.set(
      'data',
      persons.map((p) => (p.mobile === person.mobile ? _person : p)),
    )
      ? ''
      : '写入文件失败';
  }

  getPerson(mobile?: string): Person | Array<Person> | undefined {
    const persons = this.store.get() || [];

    return mobile ? persons.find((p) => p.mobile === mobile) : persons;
  }

  assemblePersonByRequest(req: Request): string | Person {
    const {
      name,
      mobile,
      age,
      sex,
      // 可选值
      school,
      science,
      email,
      remark,
    } = req.body as Person;

    if (!name) return '姓名不能为空';
    if (!mobile) return '手机号不能为空';
    if (!age) return '年龄不能为空';
    if (![0, 1].includes(+sex)) return '性别不能为空';

    return new Person({
      name,
      mobile: mobile.toString(),
      age: +age,
      sex: +sex as any,
      // 可选值
      school,
      science,
      email,
      remark,
    });
  }
}
