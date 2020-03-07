<template>
    <div class="flunk-container">
      <!--下拉菜单-->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" @change="handleTermChanged" />
        <van-dropdown-item v-model="value2" :options="option2" @change="handleSortChanged"/>
      </van-dropdown-menu>
      <!--列表-->
      <el-table :data="flunkList" stripe>
        <el-table-column label="姓名" prop="studentName" width="90px"></el-table-column>
        <el-table-column label="学号" prop="studentNum"></el-table-column>
        <el-table-column label="科目" prop="courseName"></el-table-column>
        <el-table-column label="分数" prop="level" width="70px"></el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // 默认学期
      value1: 4,
      // 默认按课程名称排序
      value2: 'a',
      // 选择学期
      option1: [
        { text: '大一上', value: 0 },
        { text: '大一下', value: 1 },
        { text: '大二上', value: 2 },
        { text: '大二下', value: 3 },
        { text: '大三上', value: 4 },
        { text: '大三下', value: 5 },
        { text: '大四上', value: 6 },
        { text: '大四下', value: 7 }
      ],
      // 选择排序方式
      option2: [
        { text: '按课程名称排序', value: 'a' },
        { text: '按学号排序', value: 'b' }
      ],
      // 存放不及格名单
      flunkList: []
    }
  },
  created () {
    this.getFlunkSorted(this.currentClass, this.currentTerm, 2, this.sortMethod)
  },
  methods: {
    // 获取排序后的不及格名单
    async getFlunkSorted (className, term, page, sort) {
      const { data: res } = await this.$http.get('http://a296148l31.zicp.vip/page/sort', {
        params: {
          className,
          term,
          page,
          sort
        }
      })
      this.flunkList = res
    },
    // 监听学期改变事件
    handleTermChanged () {
      // 当前学期会自动计算，重新发起请求
      this.getFlunkSorted(this.currentClass, this.currentTerm, 2, this.sortMethod)
    },
    // 监听排序方式的改变
    handleSortChanged () {
      this.getFlunkSorted(this.currentClass, this.currentTerm, 2, this.sortMethod)
    }
  },
  computed: {
    // 计算当前学期
    currentTerm () {
      return this.option1.find((item) => {
        return item.value === this.value1
      }).text
    },
    // 计算当前班级，监听state里面班级的改变
    // 1.采用计算属性来获取$store中的值
    currentClass () {
      return this.$store.state.currentClass
    },
    // 计算当前排序方式
    sortMethod () {
      const method = this.option2.find(item => {
        return item.value === this.value2
      }).text
      if (method === '按课程名称排序') {
        return 4
      } else {
        return 1
      }
    }
  },
  watch: {
    // 2.通过watch来检查定义计算属性获取到的值的变化
    currentClass: function (val) {
      // 将table的值清空，再重新请求数据
      this.flunkList = []
      this.getFlunkSorted(val, this.currentTerm, 2, this.sortMethod)
    }
  }
}
</script>

<style lang="less" scoped>
  .van-dropdown-menu{
    z-index: 99;
    position: fixed;
    width: 100%;
    height: 40px;
    background-color: #eeeeee;
    .van-dropdown-item{
      height: 40px;
    }
  }
  .el-table{
    top: 40px;
    margin-bottom: 50px;
  }

</style>
<style>
</style>
