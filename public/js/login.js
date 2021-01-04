(function () {
  const $U = AppUtils;
  const $C = AppConfig;

  Vue.createApp({
    data: () => ({
      username: '',
      password: '',
      remember: false,
    }),
    methods: {
      login() {
        $U.post($C.api('/login/login'), {
          username: this.username,
          password: this.password,
          remember: this.remember,
        }).then((res) => {
          if (!res.success) {
            alert(res.message);
            return;
          }
          $U.toHome();
        });
      },
      register() {
        $U.post('/login/register', {
          username: this.username,
          password: this.password,
          remember: this.remember,
        }).then((res) => {
          // {"success":true,"data":null,"code":0,"message":"注册成功"}
          if (!res.success) {
            alert(res.message);
            return;
          }
          $U.toHome();
        });
      },
    },
  }).mount('#vue-login-box');
})();
