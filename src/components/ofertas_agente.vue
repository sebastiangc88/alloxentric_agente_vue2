<template>
  <v-app>
    <v-main class="pt-15">
      <v-container fluid>
        <h1 class="text-3xl font-bold mb-6 text-[#008080] ml-1">
          Ofertas Disponibles
        </h1>
        <v-row>
          <v-col v-for="offer in offers" :key="offer.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="mx-auto card-bordered" max-width="470">
              <!-- Cuadrado de color -->
              <div class="color-box mb-2"></div>
              <v-card-title>{{ offer.title }}</v-card-title>
              <v-card-subtitle>{{ offer.type }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Categoría:</strong> {{ offer.category }}</p>
                <p><strong>Pago por hora:</strong> ${{ offer.hourlyRate.toFixed(2) }}</p>
                <p><strong>Descripción:</strong> {{ offer.jobDescription }}</p>
              </v-card-text>
              <v-card-actions>
                <router-link :to="`/ofertas/${offer.id}`">
                  <v-btn color="#008080" class="white--text">Ver Detalle</v-btn>
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
        {
          id: 2,
          title: "Agente de Servicio Freelance",
          type: "Customer Service",
          category: "Otro",
          hourlyRate: 15.0,
          jobDescription:
            "Como Representante de Servicio al Cliente, serás la voz de nuestra empresa...",
        },
        {
            id: 3,
            title: "Agente de Servicio Freelance",
            type: "Customer Service",
            category: "Otro",
            hourlyRate: 15.0,
            jobDescription:
              "Como Representante de Servicio al Cliente, serás la voz de nuestra empresa...",
          },
          {
            id: 4,
            title: "Agente de Servicio Freelance",
            type: "Customer Service",
            category: "Otro",
            hourlyRate: 15.0,
            jobDescription:
              "Como Representante de Servicio al Cliente, serás la voz de nuestra empresa...",
          },
          {
            id: 5,
            title: "Agente de Finanzas",
            type: "Customer Service",
            category: "Otro",
            hourlyRate: 15.0,
            jobDescription:
              "Como Representante de Servicio al Cliente, serás la voz de nuestra empresa...",
          },
          {
            id: 6,
            title: "Agente de Comercio",
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
.color-box {
  width: 100%;
  height: 10px;
  background-color: #007f7f; /* Color actualizado al proporcionado */
}
.card-bordered {
  border: 2px solid #007f7f; /* Contorno actualizado al color proporcionado */
}
</style>
