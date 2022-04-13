import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'

import TopBar from './components/TopBar.vue'
import SubMenu from './components/SubMenu.vue'
import Viewport from './components/Viewport.vue'
import Modal from './components/Modal.vue'
import ManualInfo from './components/ManualInfo.vue'

import openator from './directives/VOpenator.js'
import transformwrapper from './directives/VTransformwrapper.js'


createApp(App)
    .component('TopBar', TopBar)
    .component('SubMenu', SubMenu)
    .component('Viewport', Viewport)
    .component('Modal', Modal)
    .component('ManualInfo', ManualInfo)
    .directive('openator', openator)
    .directive('transformwrapper', transformwrapper)
    .use(store)
    .mount('#app');