<template>
  <v-app>
    <v-app-bar color="#008080" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alloxentric.png-WQlEJS2mNDVHfJLAmhR9JbaAD3urYs.webp"
          alt="Alloxentric Logo"
          style="width: 26px; height: 26px;"
          class="mr-2"
        />
        Alloxentric
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in idiomas"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar>
              <img
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                alt="Generic Profile"
              />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>{{ nombreCompleto }}</v-list-item-title>
            <v-list-item-subtitle>{{ correoUsuario }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="irConfiguracionCuenta">
            <v-list-item-title>Configuración de cuenta</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary>
  <v-list>
    <router-link :to="`/inicio/${userId}`"> 
      <v-list-item :class="{ 'v-list-item--active': $route.path.startsWith('/inicio') }">
        <v-list-item-icon>
          <v-icon style="color:#008080">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Inicio</v-list-item-title>
      </v-list-item>
    </router-link>
    <router-link :to="`/ofertas/`"> 
      <v-list-item :class="{ 'v-list-item--active': $route.path.startsWith('/ofertas') }">
        <v-list-item-icon>
          <v-icon style="color:#008080">mdi-briefcase</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Ofertas</v-list-item-title>
      </v-list-item>
    </router-link>
    <router-link :to="`/calendario/${userId}`"> 
      <v-list-item :class="{ 'v-list-item--active': $route.path === '/calendario' }">
        <v-list-item-icon>
          <v-icon style="color:#008080">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Calendario</v-list-item-title>
      </v-list-item>
    </router-link>

    <v-list-group v-model="agentExpanded" :value="false" style="display: block;">
      <template #activator>
        <v-list-item-icon>
          <v-icon color="#008080">mdi-account</v-icon> 
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Agente</v-list-item-title>
        </v-list-item-content>
      </template>

      <router-link :to="`/agente/postulaciones/${userId}`" class="sidebar-btn"> 
        <v-list-item>
          <v-list-item-icon>
            <v-icon style="color:#008080" class="ml-5">mdi-clipboard-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Postulaciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link :to="`/agente/certificaciones/${userId}`" class="sidebar-btn"> 
        <v-list-item>
          <v-list-item-icon>
            <v-icon style="color:#008080" class="ml-5">mdi-certificate</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Certificaciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link :to="`/agente/evaluaciones/${userId}`" class="sidebar-btn"> 
        <v-list-item>
          <v-list-item-icon>
            <v-icon style="color:#008080" class="ml-5">mdi-chart-pie</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Evaluaciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link :to="`/agente/pagos/${userId}`" class="sidebar-btn"> 
        <v-list-item>
          <v-list-item-icon>
            <v-icon style="color:#008080" class="ml-5">mdi-cash</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pagos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link :to="`/agente/reportes/${userId}`" class="sidebar-btn"> 
        <v-list-item>
          <v-list-item-icon>
            <v-icon style="color:#008080" class="ml-5">mdi-chart-bar</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Reportes</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 1 
      </router-link>
    </v-list-group>

    <router-link :to="`/soporte/${userId}`"> 
      <v-list-item :class="{ 'v-list-item--active': $route.path === '/soporte' }">
        <v-list-item-icon>
          <v-icon style="color:#008080">mdi-help-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Soporte y Ayuda</v-list-item-title>
      </v-list-item>
    </router-link>
  </v-list>
</v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      idiomas: [{ title: 'ES' }],
      agentExpanded: false,
      nombreCompleto: 'Usuario', // Inicializa con un valor por defecto
      correoUsuario: '' // Inicializa el correo
    };
  },
  computed: {
    userId() {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('userID');
      } else {
        return null; 
      }
    }
  },
  mounted() {
    // If the user ID is not found in localStorage, redirect to login
    if (typeof window !== 'undefined' && !localStorage.getItem('userID')) {
      this.$router.push('/login_agente');
    } else {
      // Recupera el nombre completo y el correo del usuario del localStorage
      this.nombreCompleto = localStorage.getItem('nombreCompleto') || 'Usuario';
      this.correoUsuario = localStorage.getItem('correoUsuario') || '';
    }
  },
  methods: {
    irConfiguracionCuenta() {
    if (this.$route.path !== '/configuracion') {
      this.$router.push('/configuracion');
    }
  }
  }
};
</script>
