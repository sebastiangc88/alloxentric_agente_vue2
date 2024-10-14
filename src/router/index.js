// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import DetalleOferta from '../components/detalle_oferta.vue'
import RegistroAgente from '../components/registro_agente.vue'
import Calendario from '../components/calendario.vue'
import Postulaciones from '../components/postulaciones_agente.vue'
import Reportes from '../components/reportes_agente.vue'
import Certificaciones from '../components/certificaciones_agente.vue'
import Evaluaciones from '../components/evaluaciones_agente.vue'
import Pagos from '../components/pagos_agente.vue'
import Soporte from '../components/soporte_agente.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/registro',
    name: 'RegistroAgente',
    component: RegistroAgente
  },
  {
    path: '/ofertas/:id',
    name: 'DetalleOferta',
    component: DetalleOferta
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: Calendario
  },
  {
    path: '/agente/postulaciones',
    name: 'postulaciones',
    component: Postulaciones
  },
  {
    path: '/agente/reportes',
    name: 'reportes',
    component: Reportes
  },
  {
    path: '/agente/certificaciones',
    name: 'certificaciones',
    component: Certificaciones
  },
  {
    path: '/agente/evaluaciones',
    name: 'evaluaciones',
    component: Evaluaciones
  },
  {
    path: '/agente/pagos',
    name: 'pagos',
    component: Pagos
  },
  {
    path: '/soporte',
    name: 'soporte',
    component: Soporte
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router