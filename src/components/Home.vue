<template>
  <div class="container">
    <!--导航条-->
    <van-nav-bar :title="this.currentClass">
      <van-icon name="exchange" slot="right" size="25" color="#fff" @click="show = true"/>
    </van-nav-bar>
    <!--上拉菜单，切换班级-->
    <van-action-sheet description="切换班级" v-model="show" :actions="actions" @select="onSelect" />
    <!--路由占位符-->
    <router-view class="content"></router-view>
    <!--底部导航-->
    <van-tabbar v-model="active">
      <van-tabbar-item router-link to="/home/all">总体成绩</van-tabbar-item>
      <van-tabbar-item router-link to="/home/failed">不及格名单</van-tabbar-item>
      <van-tabbar-item router-link to="/home/single">单科成绩</van-tabbar-item>
    </van-tabbar>

  </div>
</template>
<script>
export default {
  data () {
    return {
      // 默认选中总体成绩
      active: 0,
      // 默认切换班级的上拉菜单不显示
      show: false,
      // 获取该工号对应的班级信息
      classList: this.$store.state.classList
    }
  },
  created () {

  },
  methods: {
    // 选中班级时触发
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      this.show = false
      // // 将当前班级设置为选中的班级,待定，可能不需要
      // this.currentClass = item.name
      // 一旦切换了班级，修改store 里面的数据，其他组件监听到班级的变化应该重新请求数据
      this.$store.commit('changeClass', item.name)
    }

  },
  computed: {
    // 班级列表
    actions () {
      return this.$store.state.classList.map(item => {
        return {
          // name表示菜单项的标题
          name: item.className
        }
      })
    },
    // 计算当前班级
    currentClass () {
      return this.$store.state.currentClass
    }
  }
}
</script>
<style lang="less" scoped>
  .van-nav-bar{
    // 这里是公用header
    position:fixed;
    width: 100%;
    background-color: #545c64;
    .van-nav-bar__title{
      color: white;
    }
  }
  // 这里是组件的占位符router-view
  .content{
    position: relative;
    top:46px;
    width: 100%;
  }
  .van-tabbar{
    background-color: #545c64;
  }
  .van-tabbar-item{
     font-size: 16px;
     color: #fff;
   }
  .van-tabbar-item--active{
    color: #ffd04b;
  }

</style>
