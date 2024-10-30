<template>
  <v-app>
    <v-main>
      <v-container class="p-8 overflow-y-auto">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <div class="mb-6 text-center">
              <p class="text-sm text-gray-500">Publicado Hoy</p>
              <p class="text-sm text-gray-500">
                <v-icon small color="red">mdi-map-marker</v-icon> Mexico/Chile
              </p>
            </div>

            <section class="mb-6 text-center">
              <h2 class="text-xl font-semibold mb-2 text-[#068180]">¿Que Buscamos?</h2>
              <p class="text-gray-700">
                Buscamos un agente de servicio freelance con experiencia en atención al cliente y resolución de problemas.
                El candidato ideal será capaz de proporcionar un excelente servicio al cliente, manejar consultas y quejas,
                y trabajar eficientemente en un entorno de ritmo rápido.
              </p>
            </section>

            <v-col cols="12">
              <v-card class="mx-auto" max-width="1200">
                <v-card-text>
                  <v-row class="remuneracion-row">
                    <v-col cols="12" md="4" class="text-center">
                      <h3 class="text-lg font-semibold text-[#068180]">Remuneración por hora</h3>
                      <p class="text-xl font-bold text-[#068180]">$15 USD</p>
                    </v-col>
                    <v-col cols="12" md="4" class="text-center">
                      <h3 class="text-lg font-semibold text-[#068180]">Bonificaciones por rendimiento</h3>
                      <p class="text-xl font-bold text-[#068180]">Hasta $5 USD/hora</p>
                    </v-col>
                    <v-col cols="12" md="4" class="text-center">
                      <h3 class="text-lg font-semibold text-[#068180]">Puntos Alloxentric</h3>
                      <p class="text-xl font-bold text-[#068180]">100 pts/hora</p>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-4" color="#f5f5dc" tile>
              <v-row>
                <v-col cols="6">
                  <v-chip small label color="#008080" class="mr-2 white--text">
                    <v-icon left color="#008080">mdi-star</v-icon>
                    Experiencia
                  </v-chip>
                  <div>
                    <p class="text-lg font-bold text-[#008080]">Intermedia</p>
                  </div>
                </v-col>
                <v-col cols="6">
                  <v-chip small label color="#008080" class="mr-2 white--text">
                    <v-icon left color="#008080">mdi-translate</v-icon>
                    Idioma
                  </v-chip>
                  <div>
                    <p class="text-lg font-bold text-[#008080]">Español (Avanzado)</p>
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-4"></v-divider>

              <section class="text-center">
                <h2 class="text-xl font-semibold mb-2 text-[#008080]">Sobre el cliente</h2>
                <div class="d-flex align-center justify-center mt-2">
                  <v-rating
                    v-model="cliente.rating"
                    readonly
                    color="#008080"
                    background-color="grey lighten-1"
                    size="small"
                  ></v-rating>
                  <span class="ml-2">({{ cliente.rating }})</span>
                </div>
                <p class="text-gray-700 mt-2">Miembro desde {{ cliente.miembroDesde }}</p>
                <p class="font-semibold text-[#008080]">{{ cliente.nombre }}</p>
                <div class="d-flex align-center justify-center mt-2">
                  <v-icon small left color="#008080">mdi-map-marker</v-icon>
                  <span>{{ cliente.pais }}</span>
                </div>
              </section>
            </v-card>
          </v-col>
        </v-row>

        <section class="mb-6">
          <v-card class="pa-4 mx-1" color="#b3e5f0"> 
            <h2 class="text-xl font-semibold mb-4 text-[#1e343d]">Horarios Disponibles</h2>
            <div class="overflow-x-auto" >
              <v-sheet class="inline-block min-w-full" color="#b3e5f0">
                <v-row no-gutters>
                  <v-col cols="1" class="font-semibold text-center">Hora</v-col>
                  <v-col cols="11/7" v-for="day in days" :key="day" class="font-semibold text-center">
                    {{ day }}
                  </v-col>
                </v-row>
                <v-row no-gutters v-for="(time, index) in timeSlots" :key="index">
                  <v-col cols="1" class="text-center">{{ time }}</v-col>
                  <v-col cols="11/7" v-for="day in days" :key="`${day}-${time}`" class="d-flex justify-center pa-0">
                    <v-btn
                      class="mx-[-2px]"
                      :color="isSlotSelected(day, time) ? '#004d4d' : (isSlotAvailable(day, time) ? '#4caf50' : '#f44336 !important')"
                      :class="{ 'text-white': isSlotSelected(day, time) }"
                      large
                      @click="toggleSlot(day, time)"
                      :disabled="!isSlotAvailable(day, time)"
                    >
                      {{ isSlotSelected(day, time) ? '✓' : '' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-sheet>
            </div>
          </v-card>
        </section>

       
        <v-chip
          v-show="showEarnings"
          color="#008080"
          class="mb-6 transition-all duration-300"
          label
          text-color="white"   
        >
          <v-icon left>mdi-cash</v-icon>
          Ganancias Semanales Estimadas: ${{ weeklyEarnings }} USD
        </v-chip>
    

        <v-btn
          block
          color="#008080"
          class="white--text py-2 px-4 rounded transition-all duration-300 hover:scale-105"
          @click="postularse"
        >
          Postular a Horarios Seleccionados
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template> 
  
  <style scoped>
  .v-btn {
    width: 90%; 
  }
  </style>

<script>
  export default {
    data() {
      return {
        selectedSlots: [],
        timeSlots: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
        days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        availability: {
          "Lun": ["09:00", "10:00", "11:00", "14:00", "15:00"],
          "Mar": ["09:00", "11:00", "13:00", "16:00", "17:00"],
          "Mié": ["10:00", "12:00", "14:00", "15:00", "16:00"],
          "Jue": ["09:00", "10:00", "11:00", "13:00", "17:00"],
          "Vie": ["11:00", "12:00", "14:00", "15:00", "16:00"],
          "Sáb": ["10:00", "11:00", "12:00"],
          "Dom": ["14:00", "15:00", "16:00"],
        },
        items: [
          { title: 'Inicio', icon: 'mdi-home', to: '/' },
          { title: 'Ofertas', icon: 'mdi-briefcase', to: '/ofertas' },
          { title: 'Calendario', icon: 'mdi-calendar', to: '/calendario' },
          { title: 'Agente', icon: 'mdi-account', to: '/agente' },
        ],
        menuItems: [
          { title: 'Mario Doe' }
        ],
        idiomas: [
          { title: 'ES' }
        ],
        drawer: false,
        showEarnings: false,
        cliente: {
          nombre: 'Vitalia Tech',
          rating: 4.9,
          miembroDesde: '10 de diciembre 2023',
          pais: 'Mexico',
        },
      };

    },
    computed: {
      weeklyEarnings() {
        const hourlyRate = 15;
        return this.selectedSlots.length * hourlyRate;
      },
    },
    methods: {
      toggleSlot(day, time) {
        const slotKey = `${day}-${time}`;
        if (this.selectedSlots.includes(slotKey)) {
          this.selectedSlots = this.selectedSlots.filter(slot => slot !== slotKey);
        } else {
          this.selectedSlots.push(slotKey);
        }
        // Mostrar el chip de ganancias siempre que haya slots seleccionados
        this.showEarnings = this.selectedSlots.length > 0; 
      },
      isSlotAvailable(day, time) {
        return this.availability[day].includes(time);
      },
      isSlotSelected(day, time) {
        return this.selectedSlots.includes(`${day}-${time}`);
      },
    },
  };
</script>
<style scoped>
  .remuneracion-row {
    background-color: #b3e5f0;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .v-card {
    border: 2px solid #006064 !important; 
    border-radius: 4px; 
  }
  .v-chip {
    position: sticky;
    top: 12px; 
    z-index: 10;
    font-size: 18px; /* Ajusta el tamaño de la fuente */
    padding: 12px 20px; /* Ajusta el padding */
  }
  .ajustar-al-texto {
    display: inline-block; 
  }
  .experiencia-idioma {
    display: inline-flex; /* Ajusta el contenedor al contenido */
    flex-wrap: wrap; /* Permite que los elementos se ajusten en varias líneas si es necesario */
    justify-content: center; /* Centra los elementos horizontalmente */
  }
</style>