<template>
  <v-app>
    <v-main class="pt-15">
      <v-container fluid>
        <h1 class="text-3xl font-bold mb-6 text-[#008080] ml-1">
          Ofertas Disponibles
        </h1>
        <!-- Filtros -->
        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filters.keyword"
              label="Buscar por palabra clave"
              dense
              outlined
              @input="applyFilters"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="filters.category"
              :items="categories"
              label="Filtrar por categoría"
              dense
              outlined
              @change="applyFilters"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="filters.sortOrder"
              :items="sortOptions"
              label="Ordenar por pago"
              dense
              outlined
              @change="applyFilters"
            ></v-select>
          </v-col>
        </v-row>
        <!-- Ofertas -->
        <v-row>
          <v-col
            v-for="offer in filteredOffers"
            :key="offer._id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
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
import axios from "axios";

export default {
  name: "OfertaAgenteVue",
  data() {
    return {
      offers: [],
      filteredOffers: [],
      filters: {
        keyword: "",
        category: "Todas", // Valor predeterminado para mostrar todas las categorías
        sortOrder: "", // Orden de pago (ascendente o descendente)
      },
      categories: [
        "Todas", // Nueva opción para mostrar todas las categorías
        "Tecnología",
        "Ventas",
        "Educación",
        "Atención al cliente",
      ],
      sortOptions: [
        { text: "Mayor a menor", value: "desc" },
        { text: "Menor a mayor", value: "asc" },
      ],
      loading: true,
    };
  },
  created() {
    this.fetchOffers();
  },
  methods: {
    async fetchOffers() {
      try {
        const response = await axios.get("http://localhost:5001/api/ofertas");
        this.offers = response.data;
        this.applyFilters();
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
      } finally {
        this.loading = false;
      }
    },
    applyFilters() {
      const { keyword, category, sortOrder } = this.filters;

      // Filtrar por palabra clave
      let results = this.offers.filter((offer) => {
        const matchesKeyword = keyword
          ? offer.title.toLowerCase().includes(keyword.toLowerCase()) ||
            offer.jobDescription.toLowerCase().includes(keyword.toLowerCase())
          : true;

        // Mostrar todas las categorías si la opción "Todas" está seleccionada
        const matchesCategory = category === "Todas" ? true : offer.category === category;

        return matchesKeyword && matchesCategory;
      });

      // Ordenar por pago
      if (sortOrder) {
        results = results.sort((a, b) =>
          sortOrder === "asc"
            ? a.hourlyRate - b.hourlyRate
            : b.hourlyRate - a.hourlyRate
        );
      }

      this.filteredOffers = results;
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
  background-color: #007f7f;
}
.card-bordered {
  border: 2px solid #007f7f;
}
</style>