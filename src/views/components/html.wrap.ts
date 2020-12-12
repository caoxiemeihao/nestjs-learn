import { readFileSync } from 'fs';
import { join } from 'path';
import { renderString } from 'nunjucks';

export interface HtmlWrapResult {
  /** njk 模板 */
  njk: string
  /** njk 渲染后的 html */
  html: string
  /** 是否有报错 */
  error: string | null
}

/** <html>外壳</html> */
export function HtmlWrap_NJKrender({ head, body }: {
  /** 插入 <head> 标签内容 */
  head?: string
  /** njk 模板绝对路径 */
  body: string
}) {

  return function (target, propertyKey, descriptor) {
    /* [Arguments] {
      '0': HomeView {},
      '1': 'render',
      '2': {
        value: [Function: render],
        writable: true,
        enumerable: false,
        configurable: true
      }
    } */

    const func = descriptor.value;
    if (typeof func !== 'function') return;
    const currentPath = join(process.cwd(), 'src/views/components');

    /** 增强原被装饰的 function */
    descriptor.value = function () {
      const result: HtmlWrapResult = { njk: '', html: '', error: null };
      try {
        // const html = readFileSync(join(currentPath, 'html.wrap.njk'), 'utf8');
        const tplHead = head || '';
        const tplNav = readFileSync(join(currentPath, 'nav.njk'), 'utf8');
        const tplBody = readFileSync(body, 'utf8');
        const njk = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.css" rel="stylesheet">
    ${tplHead}
    ${tplHead.includes('</title>') ? '' : '<title>Hello nest.js</title>'}
  </head>
  <body>
    ${tplNav}
    ${tplBody}
  </body>
</html>`

        result.njk = njk;
        result.html = renderString(njk, { title: '谊品生鲜' });
      } catch (error) {
        result.error = error;
      }
      // func(result);
      return result;
    }

  }
}
