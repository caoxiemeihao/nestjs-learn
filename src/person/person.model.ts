/**
 * 基于文件实现的存储
 */

export class Person {
  // 必填字段
  /** 手机号 - 当做索引列 */
  mobile: string;
  /** 姓名 */
  name: string;
  /** 年龄 */
  age: number;
  /** 性别 */
  sex: 0 | 1;

  // 选填字段
  /** 学校 */
  school?: string;
  /** 专业 */
  science?: string;
  /** 邮箱 */
  email?: string;
  /** 备注 */
  remark?: string;

  // 后台操作字段
  /** 创建时间 */
  create_time?: number;
  /** 更新时间 */
  update_time?: number;
  /* 已经删除 9 */
  status?: 0 | 9;

  constructor(person: Person) {
    this.mobile = person.mobile;
    this.name = person.name;
    this.age = person.age;
    this.sex = person.sex;

    this.school = person.school;
    this.science = person.science;
    this.remark = person.remark;
    this.email = person.email;
    this.create_time = person.create_time || Date.now();
    this.update_time = person.update_time || Date.now();
    this.status = person.status === undefined ? 0 : person.status;
  }
}
