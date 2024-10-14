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
          <v-list-item v-for="(item, index) in  
 idiomas" :key="index">
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
              <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="Generic Profile" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Mario Doe</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <router-link to="/registro">
          <v-list-item :class="{ 'v-list-item--active': $route.path === '/registro' }">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Registro</v-list-item-title>
          </v-list-item>  

        </router-link>
        <router-link to="/ofertas/123">
          <v-list-item :class="{ 'v-list-item--active': $route.path.startsWith('/ofertas') }">
            <v-list-item-icon>
              <v-icon>mdi-briefcase</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ofertas</v-list-item-title>
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
    };
  },
};
</script>
