(function () {
  const $U = AppUtils;
  const $C = AppConfig;

  Vue.createApp({
    data: () => ({
      persons: [],
    }),
    delimiters: ['${', '}'],
    mounted() {
      $U.post('/person/get').then((res) => {
        if (res.success) this.persons = res.data;
      });
    },
  }).mount('#vue-person-list');
})();
