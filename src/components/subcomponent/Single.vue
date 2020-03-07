<template>
    <div>
      <!--下拉菜单-->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" @change="handleTermChanged"/>
        <van-dropdown-item v-model="value2" :options="option2" @change="handleSortChanged"/>
      </van-dropdown-menu>
      <van-dropdown-menu class="course">
        <van-dropdown-item v-model="value3" :options="option3" @change="handleCourseChange" />
      </van-dropdown-menu>
      <!--列表-->
      <el-table :data="singleList" stripe>
        <el-table-column label="姓名" prop="studentName"></el-table-column>
        <el-table-column label="学号" prop="studentNum"></el-table-column>
        <el-table-column label="成绩" prop="level"></el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 默认学期
      value1: 'E',
      // 默认按单科成绩排序
      value2: 'b',
      // 选择学期
      option1: [
        { text: '大一上', value: 'A' },
        { text: '大一下', value: 'B' },
        { text: '大二上', value: 'C' },
        { text: '大二下', value: 'D' },
        { text: '大三上', value: 'E' },
        { text: '大三下', value: 'F' },
        { text: '大四上', value: 'G' },
        { text: '大四下', value: 'H' }
      ],
      // 选择排序方式
      option2: [
        { text: '按学号排序', value: 'a' },
        { text: '按单科成绩排序', value: 'b' }
      ],
      // 存放课程名字的列表
      courseList: [],
      // 默认课程
      value3: '1',
      // 默认课程的成绩列表
      singleList: []
    }
  },
  async created () {
    // 刚进来显示该班级默认学期默认课程的数据
    await this.getCourseList(this.currentClass, this.currentTerm)
    await this.getSingleSorted(this.currentClass, this.currentTerm, this.currentCourse, 3, this.sortMethod)
  },
  methods: {
    // 获取所有的课程列表
    async getCourseList (className, term) {
      const { data: res } = await this.$http.get('http://a296148l31.zicp.vip/query/courseName', {
        params: {
          className,
          grade: term
        }
      })
      if (res.length === 0) {
        // 如果课程列表为空，那么把table数据也置为空
        this.singleList = []
      }
      this.courseList = res
      // 查询到该学期的课程名称后，把默认选中的置为列表的第一个
      this.value3 = res[0].id + ''
    },
    // 查询排序后的单科成绩
    async getSingleSorted (className, term, courseName, page, sort) {
      // 如果课程列表是空数组，就不再发送获取成绩列表的请求
      if (this.courseList.length === 0) return
      const { data: res } = await this.$http.get('http://a296148l31.zicp.vip/page/sort', {
        params: {
          className,
          term,
          courseName,
          page,
          sort
        }
      })
      this.singleList = res
    },
    // 监听学期改变事件
    async handleTermChanged () {
      // 学期改变，重新发起请求
      await this.getCourseList(this.currentClass, this.currentTerm)
      await this.getSingleSorted(this.currentClass, this.currentTerm, this.currentCourse, 3, this.sortMethod)
    },
    // 监听切换课程事件
    handleCourseChange () {
      // 获取该课程的成绩列表
      this.getSingleSorted(this.currentClass, this.currentTerm, this.currentCourse, 3, this.sortMethod)
    },
    // 监听排序方式改变的事件
    handleSortChanged () {
      // 当前排序方式重新计算，重新发起请求
      this.getSingleSorted(this.currentClass, this.currentTerm, this.currentCourse, 3, this.sortMethod)
    }
  },
  computed: {
    // 计算当前学期
    currentTerm () {
      return this.option1.find((item) => {
        return item.value === this.value1
      }).text
    },
    // 将获取的课程数组转换下拉框所需数组
    option3 () {
      return this.courseList.map(item => {
        return {
          text: item.courseName,
          value: item.id + ''
        }
      })
    },
    // 根据下拉菜单的value，得到对应的课程名称
    currentCourse () {
      return this.option3.find((item) => {
        return item.value === this.value3
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
      if (method === '按学号排序') {
        return 1
      } else {
        return 2
      }
    }
  },
  watch: {
    // 2.通过watch来检查定义计算属性获取到的值的变化
    currentClass: function (val) {
      // 将table的值清空，再重新请求数据
      this.singleList = []
      this.getSingleSorted(val, this.currentTerm, this.currentCourse, 3, this.sortMethod)
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
  .course{
    z-index: 90;
    position: fixed;
    top: 85px;
    margin: 5px auto;
    /*border: 1px solid;*/
    border-radius: 10px;
    background-color: #eeeeee;
    color: white;
  }
  .el-table{
    top: 90px;
    border: 1px solid #eee;
    margin-bottom: 50px;
  }
</style>
