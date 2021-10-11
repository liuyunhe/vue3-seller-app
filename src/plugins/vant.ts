import { App as VM } from 'vue'
import {
  Button,
  List,
  Cell,
  Tabbar,
  Dialog,
  TabbarItem,
  Icon,
  NavBar,
  Field,
  ActionSheet,
  Uploader,
  Form,
  CellGroup,
  Picker,
  Popup,
  Radio,
  RadioGroup,
  DatetimePicker,
  Cascader,
  Toast
} from 'vant'

const plugins = [
  Button,
  List,
  Cell,
  Dialog,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Field,
  ActionSheet,
  Uploader,
  Form,
  CellGroup,
  Picker,
  Popup,
  Radio,
  RadioGroup,
  DatetimePicker,
  Cascader,
  Toast
]

export const vantPlugins = {
  install: function(vm: VM) {
    plugins.forEach((item) => {
      vm.component(item.name, item)
    })
  }
}
