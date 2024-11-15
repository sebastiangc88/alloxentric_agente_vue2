<template>
  <v-app>
    <v-main>
      <v-container class="p-8 overflow-y-auto">
        <div v-if="oferta">
          <v-row justify="center">
            <v-col cols="12" md="8">
              <div class="mb-6 text-center">
                <p class="text-sm text-gray-500">Publicado {{ oferta.created_at | formatoFecha }}</p>
                <p class="text-sm text-gray-500">
                  <v-icon small color="red">mdi-map-marker</v-icon> {{ oferta.localizacion }}
                </p>
              </div>

              <section class="mb-6 text-center">
                <h2 class="text-xl font-semibold mb-2 text-primary">¿Que Buscamos?</h2>
                <p class="text-gray-700">{{ oferta.jobDescription }}</p>
              </section>

              <v-col cols="12">
                <v-card class="mx-auto" max-width="1200">
                  <v-card-text>
                    <v-row class="remuneracion-row">
                      <v-col cols="12" md="4" class="text-center">
                        <h3 class="text-lg font-semibold text-primary">Remuneración por hora</h3>
                        <p class="text-xl font-bold text-primary">${{ oferta.hourlyRate }} USD</p>
                      </v-col>
                      <v-col cols="12" md="4" class="text-center">
                        <h3 class="text-lg font-semibold text-primary">Bonificaciones por rendimiento</h3>
                        <p class="text-xl font-bold text-primary">{{ oferta.bonificaciones ? oferta.bonificaciones : 'No hay bonificaciones' }}</p>
                      </v-col>
                      <v-col cols="12" md="4" class="text-center">
                        <h3 class="text-lg font-semibold text-primary">Puntos Alloxentric</h3>
                        <p class="text-xl font-bold text-primary">{{ oferta.puntos_alloxentric ? oferta.puntos_alloxentric : 'No hay puntos' }}</p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="pa-4" color="#daf1f9" tile>
                <v-row>
                  <v-col cols="6" style="text-align: center;">
                    <v-chip small label color="#008080" class="mr-2 white--text icon-small">
                      <v-icon left color="white">mdi-star</v-icon>
                      Experiencia
                    </v-chip>
                    <div>
                      <p class="text-lg font-bold text-[#008080]">{{ oferta.experiencia }}</p>
                    </div>
                  </v-col>
                  <v-col cols="6" style="text-align: center;">
                    <v-chip small label color="#008080" class="mr-2 white--text">
                      <v-icon small left color="white">mdi-translate</v-icon>
                      Idioma
                    </v-chip>
                    <div>
                      <p class="text-lg font-bold text-[#008080]">{{ oferta.idioma }} ({{ oferta.nivel_idioma }})</p>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <section class="text-center">
                  <h2 class="text-xl font-semibold mb-2 text-[#008080]">Sobre el cliente</h2>
                  <div class="d-flex align-center justify-center mt-2">
                    <v-rating
                      v-model="oferta.cliente.rating"
                      readonly
                      color="#008080"
                      background-color="grey lighten-1"
                      size="small"
                    ></v-rating>
                    <span class="ml-2">({{ oferta.cliente.rating }})</span>
                  </div>
                  <p class="text-gray-700 mt-2">Miembro desde {{ oferta.cliente.miembroDesde }}</p>
                  <p class="font-semibold text-[#008080]">{{ oferta.cliente.nombre }}</p>
                  <div class="d-flex align-center justify-center mt-2">
                    <v-icon small left color="#008080">mdi-map-marker</v-icon>
                    <span>{{ oferta.cliente.pais }}</span>
                  </div>
                </section>
              </v-card>
            </v-col>
          </v-row>

          <section class="mb-6">
            <v-card class="pa-4 mx-1" color="#daf1f9">
              <h2 class="text-xl font-semibold mb-4 text-[#1e343d]">Horarios Disponibles</h2>
              <div class="overflow-x-auto" >
                <v-sheet class="inline-block min-w-full" color="#daf1f9">
                  <v-row no-gutters>
                    <v-col cols="1" class="font-semibold text-center">Hora</v-col>
                    <v-col cols="11/7" v-for="(day, index) in days" :key="index" class="font-semibold text-center">
                      {{ day }}
                    </v-col>
                  </v-row>
                  <div v-for="(time, timeIndex) in timeSlots" :key="timeIndex">
                    <v-row no-gutters>
                      <v-col cols="1" class="text-center">{{ time }}</v-col>
                      <v-col  cols="11/7" v-for="(day, dayIndex) in days" :key="dayIndex" class="d-flex justify-center pa-0">
                        <v-btn 
                          v-if="isSlotAvailableOnDay(day, time)"
                          class="mx-[-2px]"
                          :color="isSlotSelected(day, time) ? '#004d4d' : '#4caf50'" 
                          :class="{ 'text-white': isSlotSelected(day, time) }"
                          large
                          @click="toggleSlot(day, time)"
                        >
                        {{ isSlotSelected(day, time) ? '✓' : '' }}
                        </v-btn>
                        <v-btn v-else
                        class="mx-[-2px]"
                        color="#f44336"
                        large
                        disabled
                        >
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
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
            fixed
            top
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
        </div>
        <div v-else>
          <p>Cargando oferta...</p> 
        </div>
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
      days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      oferta: null, // Inicialmente null, se cargará con fetch
      showEarnings: false,
    };
  },
  computed: {
  weeklyEarnings() {
    const hourlyRate = this.oferta ? this.oferta.hourlyRate : 0; 
    return this.selectedSlots.length * hourlyRate;
  },
},
async mounted() {
  const ofertaId = this.$route.params.id;
  try {
    console.log("ID de la oferta:", ofertaId);
    // Modifica la URL de la solicitud fetch
    const response = await fetch(`http://localhost:5001/api/ofertas/${ofertaId}`); 
    if (!response.ok) {
      if (response.status === 404) {
        this.errorMessage = 'La oferta que buscas no existe.';
      } else {
        this.errorMessage = 'Hubo un error al cargar la oferta.';
      }
      throw new Error('Error en la solicitud Fetch');
    }
    this.oferta = await response.json();
  } catch (error) {
    console.error("Error al obtener la oferta:", error);
    alert(this.errorMessage);
  }
},
methods: {
  toggleSlot(day, time) {
    const slotKey = `${day}-${time}`;
    if (this.selectedSlots.includes(slotKey)) {
      this.selectedSlots = this.selectedSlots.filter(slot => slot !== slotKey);
    } else {
      this.selectedSlots.push(slotKey);
    }
    this.showEarnings = this.selectedSlots.length > 0;
  },
  isSlotAvailableOnDay(day, time) {
    console.log("Day:", day);
    console.log("Time:", time);
    console.log("Oferta:", this.oferta);
    if (!this.oferta) return false;
    // Buscar el día en la disponibilidad de la oferta
    const diaDisponibilidad = this.oferta.disponibilidad.find(disp => disp.dia === day);
    console.log("disp:", this.diaDisponibilidad);
    // Verificar si la hora está presente en el array horas_disp
    return diaDisponibilidad && diaDisponibilidad.horas_disp.includes(time); 
  },
  isSlotSelected(day, time) {
    return this.selectedSlots.includes(`${day}-${time}`);
  },
  async postularse() {
    try {
      const ofertaId = this.$route.params.id;
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:5001/api/ofertas/${ofertaId}/post`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          horarios_seleccionados: this.selectedSlots.map(slot => {
            const [day, time] = slot.split('-');
            return { dia: day, hora_postulacion: [time] }; 
          })
        })
      });

      if (response.ok) {
        console.log('Postulación exitosa');
      } else {
        console.error('Error en la postulación'); 
      }
    } catch (error) {
      console.error('Error al enviar la postulación:', error);
    }
  }
},
};
</script>
<style scoped>
  .remuneracion-row {
    background-color: #daf1f9;
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