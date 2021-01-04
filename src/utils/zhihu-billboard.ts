/**
 * 爬取知乎热榜
 */
import { get } from 'https';
import { join } from 'path';
import { JSDOM } from 'jsdom';
import { FsStore } from './fs-store';
import { RecordHot, RecordHotRaw } from './zhihu-billboard.d';

export { RecordHot, RecordHotRaw };

function store() {
  return new FsStore<Array<RecordHot>>(
    join(FsStore.STORE_DIR, 'zhihu-billboard.json'),
  );
}

function task() {
  const HOST = 'www.zhihu.com';
  const URL = 'https://www.zhihu.com/billboard';
  const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36`;

  get(
    URL,
    {
      headers: {
        'user-agent': userAgent,
        host: HOST,
      },
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk.toString()));
      res.on('end', () => {
        // store().set('data', parseDataHtml(data)); // 存到缓存
        store().set('data', parseDataJSON(data)); // 存到缓存
      });
    },
  ).on('error', (e) => console.log(e));
}

/**
 * @deprecated
 */
function parseDataHtml(data) {
  const dom = new JSDOM(data);
  const document = dom.window.document;

  const hotList = document.querySelectorAll('.HotList-item');
  const hotData = Array.from(hotList).map((hot) => {
    const index = (hot.querySelector('.HotList-itemIndex') || {}).textContent;
    const title = (hot.querySelector('.HotList-itemTitle') || {}).textContent;
    const description = (hot.querySelector('.HotList-itemExcerpt') || {})
      .textContent; // ajax 获取的，需要二次爬取
    const metrics = (hot.querySelector('.HotList-itemMetrics') || {})
      .textContent; // 热度
    const oImg: any = hot.querySelector('.HotList-itemImgContainer img') || {};
    const img = { src: oImg.src, alt: oImg.alt };

    return { index, title, description, metrics, img };
  });

  return hotData;
}

function parseDataJSON(data: string): Array<RecordHot> {
  const document = new JSDOM(data).window.document;
  const dataScript = document.querySelector('#js-initialData');

  let hotList: Array<RecordHot> = [];

  try {
    const json = JSON.parse(dataScript.textContent);
    const list: Array<RecordHotRaw> = json.initialState.topstory.hotList;
    hotList = list.map((item) => ({
      title: item.target.titleArea.text,
      description: item.target.excerptArea.text,
      img: item.target.imageArea.url,
      metrics: item.target.metricsArea.text,
      url: item.target.link.url,
    }));
  } catch (error) {}

  return hotList;
}

/** 获取知乎热榜 - 本地缓存 */
export function getZhihuBillboard(): Array<RecordHot> {
  return store().get() || [];
}

export function runTask() {
  setInterval(task, 1000 * 60 * 10); // 10 分钟爬一次
  task();
}
