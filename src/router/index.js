import Vue from 'vue'
import Router from 'vue-router'
import * as VueGoogleMaps from 'vue2-google-maps'
import FindNearPlaces from '@/pages/FindNearPlaces'
import GoogleMap from '@/pages/FindNearPlaces'

Vue.use(Router)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCXpqSmO9X5aTGiYGlcGEbC9oVok3-lk8E',
    libraries: 'places',
  }
});

export default new Router({
  routes: [
    {
      path: '/',
      component: FindNearPlaces
    },
    {
      path: '/map',
      component: GoogleMap
    },
  ]
})
