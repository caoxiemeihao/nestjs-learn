(function () {
  const API = 'http://localhost:3000';

  function apiFn(url = undefined) {
    if (typeof url !== 'string') return API;
    return url.startsWith('/') ? API + url : `${API}/${url}`;
  }
  /**
   * 三种写法均可
   * const url = `${$C.api}/login`;
   * const url = $C.api('/login');
   * const url = $C.api('login');
   */
  apiFn.toString = function () {
    return this();
  };

  const $U = {
    post(url, params) {
      if (!url) return console.warn('URL 必须传递');
      const _url = url.startsWith('http') ? url : $C.api(url);
      let _params;
      try {
        if (typeof params === 'object') _params = JSON.stringify(params);
      } catch (e) {}

      return fetch(_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: _params,
      }).then((r) => r.json());
    },
    toHome() {
      location.href = '/home';
    },
  };

  const $C = {
    api: apiFn,
  };

  window.AppUtils = $U;
  window.AppConfig = $C;
})();
