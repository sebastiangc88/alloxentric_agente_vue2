// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import DetalleOferta from '../components/detalle_oferta.vue';
import RegistroAgente from '../components/registro_agente.vue';
import Calendario from '../components/calendario.vue';
import Postulaciones from '../components/postulaciones_agente.vue';
import Reportes from '../components/reportes_agente.vue';
import Certificaciones from '../components/certificaciones_agente.vue';
import Evaluaciones from '../components/evaluaciones_agente.vue';
import Pagos from '../components/pagos_agente.vue';
import Soporte from '../components/soporte_agente.vue';
import Ofertas from '../components/ofertas_agente.vue';
import Inicio from '../components/inicio_agente.vue';
import LoginAgente from '../components/LoginAgente.vue';
import Configuracion from '../components/ConfiguracionCuenta.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login_agente' // Redirige la ruta raíz a /login_agente
  },
  {
    path: '/login_agente',
    name: 'Login',
    component: LoginAgente
  },
  {
    path: '/registro/:id',
    name: 'RegistroAgente',
    component: RegistroAgente
  },
  {
    path: '/inicio/:id', // Agrega el parámetro :id a la ruta
    name: 'Inicio',
    component: Inicio,
    props: true // Pasa el ID como prop al componente
  },
  {
    path: '/ofertas/:id',
    name: 'DetalleOferta',
    component: DetalleOferta,
    props: true
  },
  {
    path: '/ofertas',
    name: 'Ofertas',
    component: Ofertas
  },
  {
    path: '/calendario/:id', // Agrega el parámetro :id a la ruta
    name: 'Calendario',
    component: Calendario,
    props: true // Pasa el ID como prop al componente
  },
  {
    path: '/agente/postulaciones/:id', // Agrega el parámetro :id a la ruta
    name: 'postulaciones',
    component: Postulaciones,
    props: true // Pasa el ID como prop al componente
  },
  {
    path: '/agente/reportes/:id',
    name: 'reportes',
    component: Reportes
  },
  {
    path: '/agente/certificaciones/:id',
    name: 'certificaciones',
    component: Certificaciones
  },
  {
    path: '/agente/evaluaciones/:id',
    name: 'evaluaciones',
    component: Evaluaciones
  },
  {
    path: '/agente/pagos/:id',
    name: 'pagos',
    component: Pagos
  },
  {
    path: '/soporte/:id',
    name: 'soporte',
    component: Soporte
  },
  {
    path: '/configuracion/:id',
    name: 'ConfiguracionCuenta',
    component: Configuracion
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
