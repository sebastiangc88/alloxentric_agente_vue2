<template>
  <v-container>
    <!-- Título de bienvenida -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mt-6">
          Bienvenido, 
          <span v-if="!agenteRegistrado">
            <a @click.prevent="redirigirRegistro">Regístrese sus datos aquí</a>
          </span>
          <span v-else>
            {{ nombreCompleto }}
          </span>
        </h1>
      </v-col>
    </v-row>

    <!-- Sección de estadísticas -->
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-card class="pa-4 bordered-card" style="border-color: #007f7f">
          <h2 class="text-xl font-weight-bold text-primary">Postulaciones Activas</h2>
          <div>
            <p class="text-h5 font-weight-bold">{{ enProceso }}</p>
            <p class="text-caption">(+{{ nuevasPostulaciones }} desde la última semana)</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 bordered-card" style="border-color: #007f7f">
          <h2 class="text-xl font-weight-bold text-primary">Ganancias del Mes</h2>
          <div>
            <p class="text-h5 font-weight-bold">${{ gananciasMes }}</p>
            <p class="text-caption">
              {{ mesAnterior === 0 ? '(+100% respecto al mes anterior)' : `(+${calcularPorcentajeGanancia()}% respecto al mes anterior)` }}
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 bordered-card" style="border-color: #007f7f">
          <h2 class="text-xl font-weight-bold text-primary">Puntos Acumulados</h2>
          <div>
            <p class="text-h5 font-weight-bold">{{ puntosAcumulados }}</p>
            <v-progress-linear
              style="border-radius:15px"
              color="#007f7f"
              height="20"
              :value="puntosAcumuladosPorcentaje"
            ></v-progress-linear>
            <p class="text-caption mt-2">({{ siguienteNivel - puntosAcumulados }} puntos para el siguiente nivel)</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Próximas entrevistas -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-card class="pa-4 bordered-card" style="border-color: #007f7f">
          <v-card-title class="text-xl font-weight-bold text-primary">Próximas Entrevistas</v-card-title>
          <v-card-subtitle class="text-caption">Sus entrevistas programadas para los próximos días</v-card-subtitle>
          <v-card-text class="pt-4">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Empresa</th>
                  <th class="text-left">Posición</th>
                  <th class="text-left">Fecha</th>
                  <th class="text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="postulacion in formattedPostulaciones" :key="postulacion._id">
                  <td>{{ postulacion.empresa }}</td>
                  <td>{{ postulacion.posicion }}</td>
                  <td>{{ postulacion.fecha }}</td>
                  <td>
                    <v-chip :color="getColor(postulacion.estado)" dark>
                      {{ postulacion.estado }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#007f7f" block class="white--text mt-4" @click="goToCalendar">Ver Calendario Completo</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Resumen de postulaciones -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 bordered-card" style="border-color: #007f7f">
          <h2 class="text-xl font-weight-bold text-primary">Resumen de Postulaciones</h2>
          <p class="text-caption">Estado actual de sus postulaciones</p>
          <div>
            <p>Aceptadas</p>
            <v-progress-linear
              style="border-radius:15px"
              color="#008080"
              height="12"
              :value="aceptadasPorcentaje"
            ></v-progress-linear>
            <span>{{ aceptadas }}</span>
          </div>
          <div class="mt-2">
            <p>En Proceso</p>
            <v-progress-linear
              style="border-radius:15px"
              color="#008080"
              height="12"
              :value="enProcesoPorcentaje"
            ></v-progress-linear>
            <span>{{ enProceso }}</span>
          </div>
          <div class="mt-2">
            <p>Rechazadas</p>
            <v-progress-linear
              style="border-radius:15px"
              color="#008080"
              height="12"
              :value="rechazadasPorcentaje"
            ></v-progress-linear>
            <span>{{ rechazadas }}</span>
          </div>
          <v-btn color="#007f7f" block class="white--text mt-4" @click="goToApplications">Ver Todas las Postulaciones</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombreCompleto: '',
      postulaciones: [],
      aceptadas: 0,
      rechazadas: 0,
      enProceso: 0,
      nuevasPostulaciones: 0,
      puntosAcumulados: 0,
      gananciasMes: 0,
      siguienteNivel: 10000,
      mesAnterior: 0,
      agenteRegistrado: null,
    };
  },

  computed: {
    formattedPostulaciones() {
      return this.postulaciones.map(post => ({
        ...post,
        fecha: this.formatDate(post.fecha),
      }));
    },
    aceptadasPorcentaje() {
      return (this.aceptadas / this.postulaciones.length) * 100 || 0;
    },
    enProcesoPorcentaje() {
      return (this.enProceso / this.postulaciones.length) * 100 || 0;
    },
    rechazadasPorcentaje() {
      return (this.rechazadas / this.postulaciones.length) * 100 || 0;
    },
    puntosAcumuladosPorcentaje() {
      return Math.min((this.puntosAcumulados / 5000) * 100, 100); // Ejemplo: 5000 puntos para el siguiente nivel
    },
  },

  async mounted() {
    this.nombreCompleto = localStorage.getItem('nombreCompleto') || 'Usuario';

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userID');

      // Obtener postulaciones
      const responsePostulaciones = await axios.get('http://localhost:5001/api/solicitudes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.postulaciones = responsePostulaciones.data;

      // Ajustar la lógica para obtener los totales
      this.aceptadas = this.postulaciones.filter(postulacion => postulacion.estado === 'aceptada').length;
      this.rechazadas = this.postulaciones.filter(postulacion => postulacion.estado === 'rechazada').length;
      this.enProceso = this.postulaciones.filter(postulacion => postulacion.estado !== 'aceptada' && postulacion.estado !== 'rechazada').length;
      const ultimaSemana = new Date();
      ultimaSemana.setDate(ultimaSemana.getDate() - 7);
      this.nuevasPostulaciones = this.postulaciones.filter(post => new Date(post.fecha) >= ultimaSemana).length;

      // Obtener reportes
      const responseReportes = await axios.get('http://localhost:5001/api/reportes/reporte', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reportes = responseReportes.data;

      // Calcular puntos acumulados
      this.puntosAcumulados = reportes.reduce((total, reporte) => {
        return (
          total +
          reporte.bonificaciones.actividades.reduce(
            (sum, actividad) => sum + actividad.puntos,
            0
          )
        );
      }, 0);

      // Calcular ganancias del mes
      this.gananciasMes = reportes.reduce((total, reporte) => {
        return total + reporte.pagos.reduce((sum, pago) => sum + pago.monto, 0);
      }, 0);

      // Verificar si el agente ya está registrado
      const responseAgente = await axios.get(`http://localhost:5001/api/agentes/${userId}/verificar`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.agenteRegistrado = responseAgente.data.registrado; // Actualizar la variable según la respuesta del backend

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  },

  methods: {
    goToCalendar() {
      this.$router.push({ name: 'Calendario' });
    },
    goToApplications() {
      this.$router.push({ name: 'postulaciones' });
    },
    formatDate(date) {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    },
    getColor(estado) {
      return estado === 'Aceptada' ? 'green' : estado === 'Rechazada' ? 'red' : '#008080';
    },
    calcularPorcentajeGanancia() {
    if (this.mesAnterior === 0) return 100; // Si el mes anterior es 0, es un 100% de incremento
    return ((this.gananciasMes - this.mesAnterior) / this.mesAnterior * 100).toFixed(2);
  },
    redirigirRegistro() {
      const userId = localStorage.getItem('userID');
      this.$router.push({ name: 'RegistroAgente', params: { id: userId } });
    },
  },
};
</script>

<style scoped>
.bordered-card {
  border: 2px solid;
}
</style>
