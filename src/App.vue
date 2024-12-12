<template>
  <v-app>
    <!-- Cabecera con fondo de color teal -->
    <v-app-bar color="#008080" dark app>
      <!-- Icono para abrir o cerrar el panel lateral -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <!-- Enlace al inicio con logo Alloxentric -->
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

      <!-- Espaciador para alinear elementos a la derecha -->
      <v-spacer></v-spacer>
      
      <!-- Menú desplegable para seleccionar idioma -->
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

      <!-- Menú desplegable de notificaciones -->
      <v-menu bottom right offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-bell</v-icon>
            <!-- Muestra el número de notificaciones no leídas -->
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
                <!-- Botón para marcar la notificación como leída -->
                <v-btn icon @click="marcarNotificacionComoLeida(index)">
                  <v-icon v-if="!notificacion.leida">mdi-check-circle-outline</v-icon>
                  <v-icon v-else color="green">mdi-check-circle</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- Menú desplegable para el perfil del usuario -->
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
          <!-- Enlace a la configuración de cuenta -->
          <v-list-item @click="irConfiguracionCuenta">
            <v-list-item-title>Configuración de cuenta</v-list-item-title>
          </v-list-item>
          <!-- Enlace para editar la foto de perfil -->
          <v-list-item @click="editarFotoPerfil">
            <v-list-item-title>Editar foto de perfil</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Panel lateral de navegación -->
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <!-- Enlace a la página de inicio -->
        <router-link :to="`/inicio/${userId}`">
          <v-list-item :class="{ 'v-list-item--active': $route.path.startsWith('/inicio') }">
            <v-list-item-icon>
              <v-icon style="color:#008080">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
        </router-link>
        
        <!-- Enlace a la página de ofertas -->
        <router-link :to="`/ofertas/`">
          <v-list-item :class="{ 'v-list-item--active': $route.path.startsWith('/ofertas') }">
            <v-list-item-icon>
              <v-icon style="color:#008080">mdi-briefcase</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ofertas</v-list-item-title>
          </v-list-item>
        </router-link>

        <!-- Enlace al calendario -->
        <router-link :to="`/calendario/${userId}`">
          <v-list-item :class="{ 'v-list-item--active': $route.path === '/calendario' }">
            <v-list-item-icon>
              <v-icon style="color:#008080">mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Calendario</v-list-item-title>
          </v-list-item>
        </router-link>

        <!-- Sección de Agente con sub-enlaces -->
        <v-list-group v-model="agentExpanded" :value="false" style="display: block;">
          <template #activator>
            <v-list-item-icon>
              <v-icon color="#008080">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Agente</v-list-item-title>
            </v-list-item-content>
          </template>

          <!-- Sub-enlace para postulaciones -->
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

          <!-- Sub-enlace para certificaciones -->
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

          <!-- Sub-enlace para evaluaciones -->
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

          <!-- Sub-enlace para pagos -->
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

          <!-- Sub-enlace para reportes -->
          <router-link :to="`/agente/reportes/${userId}`" class="sidebar-btn">
            <v-list-item>
              <v-list-item-icon>
                <v-icon style="color:#008080" class="ml-5">mdi-chart-bar</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Reportes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-group>
        
        <!-- Enlace a soporte -->
        <router-link :to="`/soporte/`">
          <v-list-item :class="{ 'v-list-item--active': $route.path.startsWith('/soporte') }">
            <v-list-item-icon>
              <v-icon style="color:#008080">mdi-help-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Soporte</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido Principal (Dinamico) -->
    <v-main>
      <!-- Contenido se inyecta aquí según la ruta -->
      <router-view />
    </v-main>

    <!-- Diálogo de carga de foto de perfil -->
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline">Subir foto de perfil</v-card-title>
        <v-card-text>
          <!-- Selector de archivo -->
          <v-file-input label="Seleccionar archivo" v-model="fotoPerfil" accept="image/*"></v-file-input>
        </v-card-text>
        <v-card-actions>
          <!-- Botones para guardar o cancelar -->
          <v-btn color="primary" @click="guardarFotoPerfil">Guardar</v-btn>
          <v-btn color="secondary" @click="cerrarDialogo">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      // Controla si el panel lateral está abierto o cerrado
      drawer: false,
      // Idiomas disponibles
      idiomas: [
        { title: "Español" },
        { title: "Inglés" }
      ],
      // Datos del usuario
      userId: "123",
      unreadNotifications: 2,
      notificaciones: [
        { titulo: "Nueva oferta", mensaje: "Se ha publicado una nueva oferta de trabajo.", leida: false },
        { titulo: "Recordatorio", mensaje: "No olvides tu entrevista mañana.", leida: false }
      ],
      nombreCompleto: "Juan Pérez",
      correoUsuario: "juan.perez@example.com",
      fotoPerfil: null,
      editDialog: false,
      agentExpanded: false,
    };
  },
  methods: {
    // Verifica la validez del token JWT
    isTokenValid() {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.exp > Date.now() / 1000;
      }
      return false;
    },
    // Redirige al login si el token no es válido
    redirectToLoginIfTokenInvalid() {
      if (!this.isTokenValid()) {
        this.$router.push('/login');
      }
    },
    // Marca una notificación como leída
    marcarNotificacionComoLeida(index) {
      this.notificaciones[index].leida = true;
      this.unreadNotifications--;
    },
    // Función para redirigir a la configuración de la cuenta
    irConfiguracionCuenta() {
      this.$router.push('/configuracion');
    },
    // Abre el diálogo para editar la foto de perfil
    editarFotoPerfil() {
      this.editDialog = true;
    },
    // Cierra el diálogo de edición de foto de perfil
    cerrarDialogo() {
      this.editDialog = false;
    },
    // Guarda la nueva foto de perfil
    guardarFotoPerfil() {
      // Lógica para guardar la foto de perfil
      this.editDialog = false;
    }
  },
  watch: {
    // Al cambiar la ruta, verificar si el token sigue siendo válido
    $route(to, from) {
      this.redirectToLoginIfTokenInvalid();
    }
  }
};
</script>
