import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import L from 'leaflet'
import 'element-ui/lib/theme-chalk/index.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,

  /**
   * @desc BUG https://github.com/Leaflet/Leaflet/issues/4968
   * Webpack messing with Leaflet marker icons' paths, resulting in warnings or even errors
   * Unsetting/replacing the default paths as a solution
   */
  created () {
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })

    // Add Google Maps API script
    let apiKey = 'AIzaSyDO259ExBlMIGS4pU18gI2kaDFN4ypqO8E'
    let googleScript = document.createElement('script')

    googleScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + apiKey)
    document.head.appendChild(googleScript)

    // Add Yandex Maps API script
    let yandexScript = document.createElement('script')

    yandexScript.setAttribute('src', 'http://api-maps.yandex.ru/2.0/?load=package.map&lang=ru-RU')
    document.head.appendChild(yandexScript)
  },
  render: h => h(App)
}).$mount('#app')
