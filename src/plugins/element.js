import Vue from 'vue'
import { Table, TableColumn, Form, FormItem } from 'element-ui'
import { Tabbar, TabbarItem, ActionSheet, Toast, DropdownMenu, DropdownItem, Icon, NavBar } from 'vant'
// 导入vant组件样式
import 'vant/lib/index.css'
// Vue.use(ViewUI)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(ActionSheet)
Vue.use(Icon)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(NavBar)
Vue.prototype.$toast = Toast
