<template>
  <v-app>
    //cabecera
    <v-app-bar color="#008080" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link :to="`/inicio/${userId}`">
        <v-toolbar-title class="d-flex align-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alloxentric.png-WQlEJS2mNDVHfJLAmhR9JbaAD3urYs.webp"
            alt="Alloxentric Logo"
            style="width: 26px; height: 26px;"
            class="mr-2"
          />
          <span class="white--text">Alloxentric</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in idiomas" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu bottom right offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-bell</v-icon>
            <v-badge v-if="unreadNotifications > 0" color="red" overlap :content="unreadNotifications"></v-badge>
          </v-btn>
        </template>
        <v-card max-width="300" outlined>
          <v-card-title>Notificaciones</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item v-for="(notificacion, index) in notificaciones" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ notificacion.titulo }}</v-list-item-title>
                <v-list-item-subtitle>{{ notificacion.mensaje }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="marcarNotificacionComoLeida(index)">
                  <v-icon v-if="!notificacion.leida">mdi-check-circle-outline</v-icon>
                  <v-icon v-else color="green">mdi-check-circle</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar>
              <img
                :src="fotoPerfil || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'"
                alt="Foto de perfil"
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
          <v-list-item @click="editarFotoPerfil">
            <v-list-item-title>Editar foto de perfil</v-list-item-title>
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

    <v-dialog v-model="dialogFotoPerfil" max-width="500">
  <v-card>
    <v-card-title class="headline">Subir Foto de Perfil</v-card-title>
    <v-card-text>
      <v-file-input
        label="Selecciona una imagen"
        accept="image/*"
        v-model="nuevaFotoPerfil"
      ></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="guardarFotoPerfil">Guardar</v-btn>
      <v-btn text @click="dialogFotoPerfil = false">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
  </v-app>
</template>

<script>
  import jwt_decode from 'jwt-decode';
  import router from './router';

  // Función para verificar si el token es válido
  function isTokenValid() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false;
    }
  }

  // Función para redirigir al login si el token no es válido
  function redirectToLoginIfTokenInvalid() {
    if (!isTokenValid() && this.$route.path !== '/login_agente') {
      router.push('/login_agente');
    }
  }

  export default {
    data() {
      return {
        drawer: false,
        idiomas: [{ title: 'ES' }],
        agentExpanded: false,
        nombreCompleto: 'Usuario',
        correoUsuario: '',
        notificaciones: [],
        fotoPerfil: null,
        dialogFotoPerfil: false,
        nuevaFotoPerfil: null,
      };
    },
    computed: {
      userId() {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('userID');
        } else {
          return null;
        }
      },
      unreadNotifications() {
        return this.notificaciones.filter(n => !n.leida).length;
      }
    },
    mounted() {
      redirectToLoginIfTokenInvalid();

      this.notificaciones.push({
        titulo: "Bienvenido",
        mensaje: `Hola, ${this.nombreCompleto}. ¡Bienvenido a Alloxentric!`,
        leida: false // Agregar el estado de la notificación
      });

      this.fotoPerfil = localStorage.getItem("fotoPerfil");

      setInterval(redirectToLoginIfTokenInvalid, 60000);

      if (typeof window !== 'undefined' && !localStorage.getItem('userID')) {
        this.$router.push('/login_agente');
      } else {
        this.nombreCompleto = localStorage.getItem('nombreCompleto') || 'Usuario';
        this.correoUsuario = localStorage.getItem('correoUsuario') || '';
      }
    },
    methods: {
      irConfiguracionCuenta() {
        const userId = localStorage.getItem('userID');

        if (this.$route.path !== `/configuracion/${userId}`) {
          this.$router.push(`/configuracion/${userId}`);
        }
      },
      editarFotoPerfil() {
        this.dialogFotoPerfil = true;
      },

      guardarFotoPerfil() {
        if (this.nuevaFotoPerfil) {
          const reader = new FileReader();
          reader.onload = () => {
            this.fotoPerfil = reader.result;
            localStorage.setItem("fotoPerfil", reader.result);
            this.dialogFotoPerfil = false;
          };
          reader.readAsDataURL(this.nuevaFotoPerfil);
        }
      },
      marcarNotificacionComoLeida(index) {
        this.notificaciones[index].leida = true;
      }
    }
  };
</script>
