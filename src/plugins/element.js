import Vue from 'vue'

import {
  Container,
  Header,
  Aside,
  Main,
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Checkbox,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Tooltip
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

const components = [
  Container,
  Header,
  Aside,
  Main,
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Checkbox,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Tooltip
]

components.forEach((comp) => {
  Vue.use(comp)
})
