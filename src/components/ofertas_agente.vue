<template>
  <v-app>
    <v-main class="pt-15">
      <v-container fluid>
        <h1 class="text-3xl font-bold mb-6 text-[#008080] ml-1">
          Ofertas Disponibles
        </h1>
        <v-row>
          <v-col v-for="offer in offers" :key="offer._id" cols="12" sm="6" md="4" lg="3">
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
                <router-link :to="`/ofertas/${offer._id}`">
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
import axios from 'axios';

export default {
  name: 'OfertaAgenteVue',
  data() {
    return {
      drawer: false,
      offers: [],
      loading: true
    };
  },
  created() {
    this.fetchOffers();
  },
  methods: {
    async fetchOffers() {
      try {
        const response = await axios.get('http://localhost:5001/api/ofertas');
        this.offers = response.data;
      } catch (error) {
        console.error('Error al obtener las ofertas:', error);
      } finally {
        this.loading = false;
      }
    },
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