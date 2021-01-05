/**
 * 基于文件实现的存储
 */

export class Person {
  /** 手机号 - 当做索引列 */
  mobile: string;
  /** 姓名 */
  name: string;
  /** 年龄 */
  age: number;
  /** 性别 */
  sex: 0 | 1;

  /** 学校 */
  school?: string;
  /** 毕业时间 */
  graduation_time?: number;
  /** 专业 */
  science?: string;
  /** 技能 */
  skill?: string;
  /** 职能定位 */
  position?: string;
  /** 工作年限 */
  work_years?: number;
  /** 邮箱 */
  email?: string;
  /** 创建时间 */
  create_time?: number;
  /** 更新时间 */
  update_time?: number;
  /* 已经删除 9 */
  status?: 0 | 9;

  constructor(person: Person) {
    this.mobile = person.mobile;
    this.name = person.mobile;
    this.age = person.age;
    this.sex = person.sex;

    this.school = person.school;
    this.graduation_time = person.graduation_time;
    this.science = person.science;
    this.skill = person.skill;
    this.position = person.position;
    this.work_years = person.work_years;
    this.email = person.email;
    this.create_time = person.create_time || Date.now();
    this.update_time = person.update_time || Date.now();
    this.status = person.status === undefined ? 0 : person.status;
  }
}
