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
  Toast,
  Tab,
  Tabs,
  Checkbox,
  CheckboxGroup,
  Overlay
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
  Toast,
  Tab,
  Tabs,
  Checkbox,
  CheckboxGroup,
  Overlay
]

export const vantPlugins = {
  install: function(vm: VM) {
    plugins.forEach((item) => {
      vm.component(item.name, item)
    })
  }
}
