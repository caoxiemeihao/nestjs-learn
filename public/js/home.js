(function () {
  const $U = AppUtils;
  const $C = AppConfig;

  Vue.createApp({
    beforeCreate() {
      this.initModal = () => ({
        visible: false,
        title: '-',
      });
      this.initForm = () => ({
        name: '', // 姓名
        mobile: '', // 电话
        age: '', // 年龄
        sex: 0 || 1, // 性别
        school: '', // 学校
        science: '', // 专业
        email: '', // 邮箱
        remark: '', // 备注
      });
    },
    data() {
      return {
        persons: [],
        modal: this.initModal(),
        form: this.initForm(),
      };
    },
    delimiters: ['${', '}'],
    mounted() {
      this.getPersons();
    },
    methods: {
      showModal(cmd = '新建' || '编辑' || '查看' || '关闭', data = {}) {
        if (cmd === '关闭') {
          this.modal = this.initModal();
          return;
        }
        this.modal = Object.assign(this.modal, {
          visible: true,
          title: data.name ? `${cmd} - ${data.name}` : cmd,
        });
      },
      submit() {
        $U.post('/person/add', this.form).then((res) => {
          alert(res.message); // {"success":true,"data":"17357995482","code":0,"message":"添加成功"}
          if (!res.success) return;

          this.form = this.initForm(); // 重置表单
          this.modal = this.initModal(); // 重置弹框
          this.getPersons(); // 刷新列表
        });
      },
      getPersons() {
        $U.post('/person/get').then((res) => {
          if (res.success) this.persons = res.data;
        });
      },
      getPerson(mobile = '') {
        return $U.post('/person/get', { mobile }).then((res) => res.data);
      },
    },
  }).mount('#vue-person');
})();
