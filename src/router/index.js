import Vue from 'vue';
import VueRouter from 'vue-router';
import DetalleOferta from '../components/detalle_oferta.vue'; 
import RegistroAgente from '../components/registro_agente.vue'; 

Vue.use(VueRouter);

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
