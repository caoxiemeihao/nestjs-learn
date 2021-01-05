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
        cmd: '新增' || '编辑' || '查看' || '关闭',
      };
    },
    delimiters: ['${', '}'],
    mounted() {
      this.getPersons();
    },
    methods: {
      showModal(cmd, person = {}) {
        this.cmd = cmd;
        if (cmd === '关闭') {
          this.resetFormModal(false);
          return;
        }
        if (['编辑', '查看'].includes(cmd)) {
          this.form = Object.assign({}, person);
        }
        this.modal = Object.assign(this.modal, {
          visible: true,
          title: person.name ? `${cmd} - ${person.name}` : cmd,
        });
      },
      submit() {
        $U.post(
          this.cmd === '新增' ? '/person/add' : '/person/update',
          this.form,
        ).then((res) => {
          // {"success":true,"data":"17357995482","code":0,"message":"添加成功"}
          if (!res.success) {
            alert(res.message);
            return;
          }
          this.resetFormModal();
        });
      },
      resetFormModal(refresh = true) {
        this.form = this.initForm(); // 重置表单
        this.modal = this.initModal(); // 重置弹框
        refresh && this.getPersons(); // 刷新列表
      },
      delPerson(person) {
        if (!confirm(`确定删除 - ${person.name}`)) return;

        $U.post('/person/del', { mobile: person.mobile }).then((res) => {
          if (res.success) this.getPersons();
          else alert(res.message);
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
