import {
  existsSync,
  writeFileSync,
  readFileSync,
  statSync,
  mkdirSync,
} from 'fs';
import { join, sep } from 'path';

export type KVpair = Record<string, any>;

const TAG = '[fs-store.ts]';

export class FsStore<D extends KVpair> {
  static STORE_DIR = join(__dirname, '../cache');

  constructor(private path: string) {}

  private readFileSync() {
    let data = {};
    try {
      data = existsSync(this.path)
        ? JSON.parse(readFileSync(this.path, 'utf8'))
        : data;
    } catch (error) {}
    return data as KVpair;
  }

  // 基本数据结构默认 { createTime: number, updateTime: number, data: any }
  get(key = 'data'): D | undefined {
    return this.readFileSync()[key];
  }

  set(key: string, value: any): boolean {
    const now = Date.now();
    try {
      const data = this.readFileSync();
      data[key] = value;

      // 记录创建时间
      if (!data.createTime) data.createTime = now;

      // 更新时间
      data.updateTime = now;

      // 检测文件夹在不在
      const dir = this.path.slice(0, this.path.lastIndexOf(sep));
      statSync(dir).isDirectory() || mkdirSync(dir, { recursive: true });

      // 数据回写
      writeFileSync(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(`---- ${TAG} ----`);
      console.log(error);
      return false;
    }
    return true;
  }
}
