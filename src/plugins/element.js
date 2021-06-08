import Vue from 'vue'
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  Header,
  Table,
  TableColumn,
  Pagination,
  Select,
  Option,
  Cascader,
  Tabs,
  TabPane,
  Container,
  Main,
  Aside,
  Row,
  Col,
  Input,
  InputNumber,
  Dialog,
  Form,
  FormItem,
  Message,
  MessageBox
} from 'element-ui'

// Vue.use(Message)
// Vue.component(Message.name, Message)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Dialog)
Vue.use(InputNumber)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Cascader)
Vue.use(Option)
Vue.use(Select)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Submenu)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
