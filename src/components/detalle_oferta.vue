<template>
  <v-app>
    <v-main>
      <v-container class="p-8 overflow-y-auto">
        <div v-if="oferta">
          <!-- Información General -->
          <v-row>
            <v-col cols="12" md="8">
              <div class="mb-4">
                <p class="text-sm text-gray-500">Publicado {{ oferta.created_at | formatoFecha }}</p>
                <span class="badge bg-gray-200 text-gray-600 text-sm rounded px-2 py-1">Remoto</span>
              </div>
              <!-- ¿Qué Buscamos? -->
              <section class="mb-6">
                <h2 class="text-2xl font-bold mb-4">¿Qué Buscamos?</h2>
                <p class="text-gray-700 text-base">{{ oferta.jobDescription || 'Descripción del trabajo...' }}</p>
              </section>
              <!-- Tarjetas informativas -->
              <v-row class="mb-6">
                <v-col cols="12" md="4">
                  <v-card class="p-4 text-center">
                    <h3 class="text-lg font-semibold text-primary">Remuneración por hora</h3>
                    <p class="text-2xl font-bold text-primary">${{ oferta.hourlyRate }} USD</p>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="p-4 text-center">
                    <h3 class="text-lg font-semibold text-primary">Bonificaciones por rendimiento</h3>
                    <p class="text-lg text-gray-700">{{ oferta.bonificaciones || 'No hay bonificaciones' }}</p>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="p-4 text-center">
                    <h3 class="text-lg font-semibold text-primary">Puntos Alloxentric</h3>
                    <p class="text-2xl font-bold text-primary">{{ oferta.puntos_alloxentric || 'No hay puntos' }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <!-- Información del cliente -->
            <v-col cols="12" md="4">
              <v-card class="pa-4">
                <div class="d-flex justify-space-between align-center">
                  <v-chip class="mr-2" color="teal" dark>Experiencia: {{ oferta.experiencia }} años</v-chip>
                  <v-chip color="#008080" dark>{{ oferta.idioma }} ({{ oferta.nivel_idioma }})</v-chip>
                </div>
                <div class="mt-4">
                  <p class="font-weight-bold text-center">Sobre el cliente</p>
                  <div class="text-center">
                    <v-rating :value="oferta.cliente.rating" color="amber" dense readonly></v-rating>
                    <p class="text-sm grey--text">Miembro desde {{ oferta.cliente.miembroDesde }}</p>
                    <p class="font-weight-medium">{{ oferta.cliente.nombre }}</p>
                    <p class="text-sm grey--text">{{ oferta.cliente.pais }}</p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Horarios Disponibles -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <h2 class="text-xl font-semibold mb-4 text-primary">Horarios Disponibles</h2>
                <div class="horarios-disponibles">
                  <table class="horarios-tabla">
                    <thead>
                      <tr>
                        <th>Hora</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Sábado</th>
                        <th>Domingo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="time in timeSlots" :key="time">
                        <td>{{ time }}</td>
                        <td
                          v-for="day in days"
                          :key="day"
                          class="text-center"
                          @click="toggleSlot(day, time)"
                          :class="{
                            selected: isSlotSelected(day, time),
                            unavailable: !isSlotAvailableOnDay(day, time)
                          }"
                        >
                          {{ isSlotAvailableOnDay(day, time) ? (isSlotSelected(day, time) ? '✓' : '') : '' }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Ganancias Semanales Estimadas -->
          <v-row>
            <v-col cols="12">
              <v-chip
                v-if="selectedSlots.length > 0"
                color="teal"
                class="white--text mb-6"
                label
              >
                <v-icon left>mdi-cash</v-icon>
                Ganancias Semanales Estimadas: ${{ weeklyEarnings }} USD
              </v-chip>
            </v-col>
          </v-row>

          <!-- Botón de Postulación -->
          <v-row>
            <v-col cols="12">
              <v-btn
                block
                color="teal"
                class="white--text py-2 px-4 mt-4"
                @click="postularse"
              >
                POSTULAR A HORARIOS SELECCIONADOS
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <!-- Cargando -->
        <div v-else>
          <p>Cargando oferta...</p>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      selectedSlots: [], // Arreglo que guarda los horarios seleccionados
      timeSlots: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`), // Lista de horarios del día
      days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"], // Días de la semana
      oferta: null, // Objeto que contiene la oferta cargada
    };
  },
  computed: {
    // Calcula las ganancias semanales basadas en los slots seleccionados
    weeklyEarnings() {
      return this.selectedSlots.length * (this.oferta?.hourlyRate || 0); // Multipllica los slots seleccionados por la tarifa por hora de la oferta
    },
  },
  methods: {
    // Cambia el estado de un slot (lo selecciona o lo deselecciona)
    toggleSlot(day, time) {
      const slotKey = `${day}-${time}`; // Crea una clave única para el slot
      if (!this.isSlotAvailableOnDay(day, time)) return; // Si el slot no está disponible, no hace nada
      if (this.selectedSlots.includes(slotKey)) {
        this.selectedSlots = this.selectedSlots.filter((slot) => slot !== slotKey); // Deselecciona el slot
      } else {
        this.selectedSlots.push(slotKey); // Selecciona el slot
      }
    },
    // Verifica si un slot está disponible en un día específico
    isSlotAvailableOnDay(day, time) {
      const diaDisponibilidad = this.oferta?.disponibilidad?.find((disp) => disp.dia === day); // Busca el día en la disponibilidad de la oferta
      return diaDisponibilidad?.horas_disp?.includes(time); // Verifica si la hora está disponible en ese día
    },
    // Verifica si un slot está seleccionado
    isSlotSelected(day, time) {
      return this.selectedSlots.includes(`${day}-${time}`); // Verifica si el slot está en los seleccionados
    },
    // Realiza la postulación con los horarios seleccionados
    async postularse() {
      try {
        const ofertaId = this.$route.params.id; // Obtiene el ID de la oferta desde la ruta
        const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde el localStorage
        const response = await fetch(`http://localhost:5001/api/ofertas/${ofertaId}/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}` // Envía el token en los encabezados
          },
          body: JSON.stringify({
            horarios_seleccionados: this.selectedSlots.map((slot) => {
              const [day, time] = slot.split("-"); // Divide la clave del slot en día y hora
              return { dia: day, hora_postulacion: [time] }; // Crea el objeto con el día y hora para la postulación
            }),
          }),
        });
        if (response.ok) {
          alert("Postulación exitosa"); // Si la postulación fue exitosa, muestra un mensaje
        } else {
          throw new Error("Error en la postulación"); // Si hubo un error, muestra un mensaje de error
        }
      } catch (error) {
        console.error("Error:", error); // Muestra el error en la consola
        alert("Error al postularse"); // Muestra un mensaje de error
      }
    },
  },
  async mounted() {
    const ofertaId = this.$route.params.id; // Obtiene el ID de la oferta desde la ruta
    try {
      const response = await fetch(`http://localhost:5001/api/ofertas/${ofertaId}`); // Realiza la solicitud para cargar la oferta
      if (!response.ok) throw new Error("Error al cargar la oferta"); // Si hubo un error, lanza una excepción
      this.oferta = await response.json(); // Asigna la oferta cargada al objeto `oferta`
    } catch (error) {
      console.error("Error al cargar la oferta:", error); // Muestra el error en la consola
    }
  },
};
</script>


<style scoped>
.badge {
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
}

.text-primary {
  color: #008080;
}

.v-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.horarios-tabla {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.horarios-tabla th,
.horarios-tabla td {
  border: 1px solid #d3d3d3;
  text-align: center;
  height: 40px;
}

.horarios-tabla th {
  background-color: #e0f7fa;
  font-weight: bold;
}

.horarios-tabla td {
  background-color: #f1f1f1;
  cursor: pointer;
}

.horarios-tabla td.unavailable {
  background-color: #f8d7da;
  color: #721c24;
  cursor: not-allowed;
}

.horarios-tabla td.selected {
  background-color: #4caf50;
  color: white;
}
</style>