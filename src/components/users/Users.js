import axios from 'axios'
export default {
  data () {
    return {
      userData: [],
      total: 0,
      pagenum: 1,
      input3: ''
    }
  },
  created () {
    this.getUserDate()
  },
  methods: {
    getUserDate (pagenum = 1, query = '') {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query,
            pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem('token')
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
    }
  }
}
