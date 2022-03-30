import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'

import TopBar from './components/TopBar.vue'
import SubMenu from './components/SubMenu.vue'
import Viewport from './components/Viewport.vue'
import Modal from './components/Modal.vue'

import openator from './directives/VOpenator.js'
import transformwrapper from './directives/VTransformwrapper.js'
//const app = Vue.createApp(App);



// Components


//const app = createApp(App);


createApp(App)
    .component('TopBar', TopBar)
    .component('SubMenu', SubMenu)
    .component('Viewport', Viewport)
    .component('Modal', Modal)
    .directive('openator', openator)
    .directive('transformwrapper', transformwrapper)
    .use(store)
    .mount('#app');


/*
// Регистрация компонентов
components.forEach(comp => {
    app.component(comp.name, comp);
});

// Регистрация пользовательских директив
directives.forEach(directive => {
    app.directive(directive.name, directive);
});


app
    .use(router)
    .use(store)
    .mount('#app');
*/