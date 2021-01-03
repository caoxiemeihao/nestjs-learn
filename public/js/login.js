(function () {
  Vue.createApp({
    data: () => ({
      username: '',
      password: '',
      remember: true,
    }),
    methods: {
      login() {
        console.log(this.username, this.password, this.remember);
      },
      register() {
        console.log(this.username, this.password, this.remember);
      },
    },
  }).mount('#vue-login-box');
})();
