<template>
    <v-app>
      <v-main class="pt-15">
        <v-container fluid>
          <h1 class="text-3xl font-bold mb-6 text-[#008080]">
            Ofertas Disponibles
          </h1>
          <v-row>
            <v-col v-for="offer in offers" :key="offer.id" cols="12" md="6" lg="4">
              <v-card>
                <v-card-title>{{ offer.title }}</v-card-title>
                <v-card-subtitle>{{ offer.type }}</v-card-subtitle>
                <v-card-text>
                  <p><strong>Categoría:</strong> {{ offer.category }}</p>
                  <p><strong>Pago por hora:</strong> ${{ offer.hourlyRate.toFixed(2) }}</p>
                  <p><strong>Descripción:</strong> {{ offer.jobDescription }}</p>
                </v-card-text>
                <v-card-actions>
                  <router-link :to="`/ofertas/${offer.id}`"> 
                    <v-btn color="#008080">Ver Detalle</v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'OfertaAgenteVue',
    data() {
      return {
        drawer: false,
        offers: [
          {
            id: 1,
            title: "Agente de Servicio Freelance",
            type: "Customer Service",
            category: "Otro",
            hourlyRate: 15.0,
            jobDescription:
              "Como Representante de Servicio al Cliente, serás la voz de nuestra empresa...",
          },
          // ... más ofertas ...
        ],
      };
    },
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer;
      },
    },
  };
  </script>
  
  <style scoped>
  .v-main {
    padding-top: 70px;
  }
  </style>