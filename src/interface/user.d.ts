/** 用户信息 */
export interface User {
  username: string;
  password: string;
  job?: string;
  departement?: string;
  age: number;
  sex: 1 | 0;
}
