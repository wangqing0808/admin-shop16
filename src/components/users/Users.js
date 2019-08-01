export default {
  data () {
    return {
      userData: [],
      total: 0,
      pagenum: 1,
      input3: '',
      dialogAddUserFormVisible: false,
      AddUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogEditFormVisible: false,
      EditForm: {
        username: 'admin',
        email: '',
        mobile: '',
        id: 0
      },
      value1: true,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trriger: 'blur' },
          {
            min: '3',
            max: '5',
            message: '用户名为 3-5 个字符',
            trriger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trriger: 'blur' },
          {
            min: '5',
            max: '10',
            message: '密码长度为 5-10 个字符',
            trriger: 'blur'
          }
        ],
        email: [
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式不正确',
            trriger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '格式不正确',
            trriger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getUserDate()
  },
  methods: {
    getUserDate (pagenum = 1, query = '') {
      this.$axios
        .get('users', {
          params: {
            query,
            pagenum,
            pagesize: 2
          }
        })
        .then(res => {
          console.log(res)
          this.userData = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        })
    },
    changeCurrentPage (curPage) {
      this.getUserDate(curPage, this.input3)
    },
    search () {
      this.getUserDate(1, this.input3)
    },
    dialogAddUserFormShow () {
      this.dialogAddUserFormVisible = true
    },
    addUser () {
      this.$axios.post('users', this.AddUserForm, {}).then(res => {
        console.log(res)
        if (res.data.meta.status === 201) {
          // 关闭添加框
          this.dialogAddUserFormVisible = false
          // 提示添加成功
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 800
          })
          // 刷新一下
          this.getUserDate()
        }
      })
    },
    dialogAddUserFormClose () {
      console.log(123)
      this.$refs.AddUserForm.resetFields()
    },
    changeStatus (row) {
      const { id, mg_state: mgState } = row
      this.$axios.put(`users/${id}/state/${mgState}`, null).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '状态设置成功',
            type: 'success',
            duration: 800
          })
        }
      })
    },
    dialogEditFormShow (row) {
      // 显示编辑框
      this.dialogEditFormVisible = true
      // 数据传过来
      const { username, email, mobile, id } = row
      this.EditForm.username = username
      this.EditForm.email = email
      this.EditForm.mobile = mobile
      this.EditForm.id = id
    },
    editUser () {
      const { email, mobile, id } = this.EditForm

      this.$axios.put(`users/${id}`, { email, mobile }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          console.log(456)
          this.dialogEditFormVisible = false
          this.$message({
            message: '更新成功',
            type: 'success',
            duration: 800
          })
          this.getUserDate(this.pagenum)
        }
      })
    },
    delUsers (id) {
      this.$axios.delete(`users/${id}`).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '删除用户成功',
            type: 'success',
            duration: 800
          })
          this.getUserDate()
        }
      })
    }
  }
}
