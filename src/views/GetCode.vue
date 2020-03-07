<template>
  <div>
    <h1 v-if="!personInfo&&succeed===false">正在校验身份...</h1>
    <img width="100%" v-if="personInfo.length === 0&& succeed===true" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhr-WKyCehgCLmlybClUG0Xwsj9tEUVf_kpu93lWFY695NmUA1">
  </div>

</template>
<script>
export default {
  data () {
    return {
      code: '',
      personInfo: '',
      succeed: false
    }
  },
  created () {
    this.getPersonInfo()
  },
  methods: {
    // 这个是为了获取地址里面的参数
    getUrlParam (name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      const arr = window.location.search.substr(1).match(reg) // 匹配目标参数
      if (arr) {
        this.code = decodeURIComponent(arr[2])
        return decodeURIComponent(arr[2])
      }
      return null
    },
    async getPersonInfo () {
      const code = this.getUrlParam('code')
      // 调用后台方法：code换openid，openid换人员信息
      const { data: res } = await this.$http.get('http://a296148l31.zicp.vip/getUserInfo', {
        params: {
          code
        }
      })
      // 返回值是数组
      this.personInfo = res
      if (res.length !== 0) {
        this.$store.commit('initClassList', res)
        await this.$router.push('/home/all')
      }
      this.succeed = true
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
