import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'

import TopBar from './components/TopBar.vue'


//const app = Vue.createApp(App);



// Components


//const app = createApp(App);


createApp(App).component('TopBar', TopBar).use(store).mount('#app')


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