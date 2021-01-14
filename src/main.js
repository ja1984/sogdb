import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('./service-worker.js', { scope: './' })
    .then(navigator.serviceWorker.ready);
  // .then(() => {
  //   // console.log('service worker registered');
  // })
  // .catch((error) => {
  //   console.error('error when registering service worker', error);
  // });
}

new Vue({
  render: (h) => h(App),
}).$mount('#app');
