<template>
  <v-container class="bloque_principal">
    <v-row>
      <!-- Título Principal -->
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="headline">Reportes de Agente</v-card-title>
          <v-card-text>
            <v-row>
              <!-- Antecedentes del Agente -->
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title class="subtitle-1 font-weight-bold">
                    Antecedentes del Agente
                  </v-card-title>
                  <v-card-text>
                    <v-simple-table dense>
                      <thead>
                        <tr>
                          <th class="text-left">Fecha</th>
                          <th class="text-left">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- Iterar sobre todos los antecedentes de todos los reportes -->
                        <tr
                          v-for="(antecedente, reporteIndex) in getAllAntecedentes()"
                          :key="reporteIndex"
                        >
                          <td>{{ formatDate(antecedente.fecha) }}</td>
                          <td>{{ antecedente.descripcion }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Pagos al Agente -->
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title class="subtitle-1 font-weight-bold">
                    Pagos al Agente
                  </v-card-title>
                  <v-card-text>
                    <v-simple-table dense>
                      <thead>
                        <tr>
                          <th class="text-left">Fecha</th>
                          <th class="text-left">Monto</th>
                          <th class="text-left">Empresa</th>
                          <th class="text-left">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- Iterar sobre todos los pagos de todos los reportes -->
                        <tr
                          v-for="(pago, pagoIndex) in getAllPagos()"
                          :key="pagoIndex"
                        >
                          <td>{{ formatDate(pago.fecha) }}</td>
                          <td>{{ pago.monto }}</td>
                          <td>{{ pago.empresa }}</td>
                          <td>
                            <v-chip
                              :color="pago.estado === 'Pagado' ? '#008080' : '#F57170'"
                              class="white--text text-uppercase mb-1"
                            >
                              {{ pago.estado }}
                            </v-chip>
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Sistema de Bonificaciones y Canje de Puntos -->
        <v-card>
          <v-card-title class="headline">
            Sistema de Bonificaciones y Canje de Puntos
          </v-card-title>
          <v-card-text>
            <v-row>
              <!-- Puntos Acumulados -->
              <v-col cols="12" md="4">
                <div class="cuadro_puntos">
                  <div class="font-weight-bold mb-2">Puntos Acumulados</div>
                  <div class="display-1">{{ getTotalPuntosAcumulados() }}</div>
                </div>
              </v-col>

              <v-col cols="12" md="8">
                <v-row>
                  <!-- Actividades -->
                  <v-col cols="12" md="6">
                    <v-simple-table dense>
                      <thead>
                        <tr>
                          <th class="text-left">Fecha</th>
                          <th class="text-left">Actividad</th>
                          <th class="text-left">Puntos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- Iterar sobre todas las actividades de todos los reportes -->
                        <tr
                          v-for="(actividad, actividadIndex) in getAllActividades()"
                          :key="actividadIndex"
                        >
                          <td>{{ formatDate(actividad.fecha) }}</td>
                          <td>{{ actividad.actividad }}</td>
                          <td>{{ actividad.puntos }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-col>

                  <!-- Recompensas -->
                  <v-col cols="12" md="6">
                    <v-simple-table dense>
                      <thead>
                        <tr>
                          <th class="text-left">Recompensa</th>
                          <th class="text-left">Puntos Requeridos</th>
                          <th class="text-left">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- Iterar sobre todas las recompensas de todos los reportes -->
                        <tr
                          v-for="(recompensa, recompensaIndex) in getAllRecompensas()"
                          :key="recompensaIndex"
                        >
                          <td>{{ recompensa.nombre }}</td>
                          <td>{{ recompensa.puntosRequeridos }}</td>
                          <td>
                            <v-btn
                              :disabled="getTotalPuntosAcumulados() < recompensa.puntosRequeridos"
                              :color="getTotalPuntosAcumulados() >= recompensa.puntosRequeridos ? 'teal' : 'grey'"
                              text
                              size="small"
                              @click="canjearRecompensa(recompensa)"
                            >
                              Canjear
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
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
      reportes: [], // Arreglo para almacenar múltiples reportes
    };
  },
  methods: {
    async fetchReportes() {
    try {
      const token = localStorage.getItem('token'); // Obtener el token de autenticación
      const response = await axios.get('http://localhost:5001/api/reportes/reporte', {
        headers: {
          'Authorization': `Bearer ${token}` // Incluir el token en la cabecera Authorization
        }
      });
      this.reportes = response.data;
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  },
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    },
    getAllAntecedentes() {
      return this.reportes.flatMap((reporte) => reporte.antecedentes);
    },
    getAllPagos() {
      return this.reportes.flatMap((reporte) => reporte.pagos);
    },
    getAllActividades() {
      return this.reportes.flatMap(
        (reporte) => reporte.bonificaciones.actividades
      );
    },
    getAllRecompensas() {
      return this.reportes.flatMap(
        (reporte) => reporte.bonificaciones.recompensas
      );
    },
    getTotalPuntosAcumulados() {
      // Calcular la suma total de puntos directamente desde las actividades
      return this.reportes.reduce((total, reporte) => {
        return (
          total +
          reporte.bonificaciones.actividades.reduce(
            (sum, actividad) => sum + actividad.puntos,
            0
          )
        );
      }, 0);
    },
    async canjearRecompensa(recompensa) {
      try {
        const response = await axios.post(
          `http://localhost:5001/api/reporte/recompensa`,
          recompensa
        );
        if (response.status === 200) {
          alert(`Recompensa "${recompensa.nombre}" canjeada exitosamente.`);
          await this.fetchReportes(); // Refresca los datos
        }
      } catch (error) {
        console.error('Error al canjear recompensa:', error);
        alert('Error al intentar canjear la recompensa.');
      }
    },
  },
  async created() {
    await this.fetchReportes();
  },
};
</script>

<style scoped>
.bloque_principal {
  margin-top: 50px;
}
.estados {
  color: white;
  font-weight: bold;
  padding: 20px;
}
.cuadro_puntos {
  background-color: #354b4b2a;
  width: 150px;
  text-align: center;
  padding: 10px;
  margin-left: 200px;
  margin-top: 13px;
  border-radius: 25%;
}
.headline {
  color: white;
  font-weight: bold;
  background-color: #008080;
}
</style>