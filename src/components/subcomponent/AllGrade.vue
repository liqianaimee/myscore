<template>
    <div class="all-container">
      <!--下拉菜单-->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" @change="handleTermChanged"/>
        <van-dropdown-item v-model="value2" :options="option2" @change="handleSortChanged"/>
      </van-dropdown-menu>
      <!--带扩展行的table-->
      <el-table :data="allGradeList" stripe>
        <el-table-column type="expand" class="expand-col">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item  :label="item.courseName" v-for="item in props.row.courseGrades" :key="item.id">
                <span>{{ item.level }}</span>
              </el-form-item>
              <el-form-item label="课程数目">
               <span>{{ props.row.courseNum }}</span>
              </el-form-item>
              <el-form-item label="不及格门数">
                <span>{{ props.row.flunkNum }}</span>
              </el-form-item>
              <el-form-item label="平均分">
                <span>{{ props.row.avgScore }}</span>
              </el-form-item>
              <el-form-item label="总分">
                <span>{{ props.row.allScore }}</span>
              </el-form-item>
              <el-form-item label="学分绩">
                <span>{{ props.row.allCreditScore }}</span>
              </el-form-item>
              <el-form-item label="平均学分">
                <span>{{ props.row.avgCredit }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="studentName" width="80px">
        </el-table-column>
        <el-table-column
          label="学号"
          prop="studentNum">
        </el-table-column>
        <el-table-column
          label="绩点"
          prop="avgCreditPoint" width="60px">
        </el-table-column>
        <el-table-column
          label="排名"
          prop="majorRank" width="70px">
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      test: '',
      testArr: [],
      // 默认学期
      value1: 4,
      // 默认按学号排序
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
        { text: '按学号排序', value: 'a' },
        { text: '按平均学分绩点排序', value: 'b' }
      ],
      // 存放总体成绩的数组
      allGradeList: []
    }
  },
  created () {
    this.getAllSorted(this.currentClass, this.currentTerm, 1, this.sortMethod)
  },
  methods: {
    // 获取排序后的总体成绩
    async getAllSorted (className, term, page, sort) {
      const { data: res } = await this.$http.get('http://a296148l31.zicp.vip/page/sort', {
        params: {
          className,
          term,
          page,
          sort
        }
      })
      this.allGradeList = res
    },
    // 监听学期改变事件
    handleTermChanged () {
      // 当前学期会自动计算，重新发起请求
      this.getAllSorted(this.currentClass, this.currentTerm, 1, this.sortMethod)
    },
    // 监听排序方式改变的事件
    handleSortChanged () {
      // 当前排序方式重新计算，重新发起请求
      this.getAllSorted(this.currentClass, this.currentTerm, 1, this.sortMethod)
    }
  },
  computed: {
    // 计算当前学期
    currentTerm () {
      return this.option1.find(item => {
        return item.value === this.value1
      }).text
    },
    // 计算当前排序方式
    sortMethod () {
      const method = this.option2.find(item => {
        return item.value === this.value2
      }).text
      if (method === '按平均学分绩点排序') {
        return 3
      } else {
        return 1
      }
    },
    // 计算当前班级，监听state里面班级的改变
    // 1.采用计算属性来获取$store中的值
    currentClass () {
      return this.$store.state.currentClass
    }
  },
  watch: {
    // 2.通过watch来检查定义计算属性获取到的值的变化
    currentClass: function (val) {
      // 将table的值清空，再重新请求数据
      this.allGradeList = []
      this.getAllSorted(val, this.currentTerm, 1, this.sortMethod)
    }
  }
}
</script>

<style scoped lang="less">
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
    height: 100%;
    margin-bottom: 50px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    text-align: left;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 0;
    // 此处控制展开行表单元素的分布，100%一行只有一个元素
    width: 100%;
  }
</style>
<style>
  /* 本页面的样式写在 <style scoped>,需要覆盖elementui的样式 写在 <style>中 */
  /* 让单元格里面的内容居中显示， element ui 组件不要给样式添加scoped,*/
  .el-table td, .el-table th.is-leaf {
    text-align: center;
  }
  .el-table__expanded-cell[class*=cell] {
       padding: 5px 80px;
  }
</style>
