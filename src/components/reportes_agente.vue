<template>
  <v-container class="bloque_principal">
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="headline">Reportes de Agente</v-card-title>
          <v-card-text>
            <v-row>
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
                        <tr v-for="(antecedente, index) in antecedentes" :key="index">
                          <td>{{ formatDate(antecedente.fecha) }}</td>
                          <td>{{ antecedente.descripcion }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>

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
                        <tr v-for="(pago, index) in pagos" :key="index">
                          <td>{{ formatDate(pago.fecha) }}</td>
                          <td>{{ pago.monto }}</td>
                          <td>{{ pago.empresa }}</td>
                          <td class="estados">
                            <v-chip :color="pago.estado === 'Pagado' ? '#008080': '#F57170'" class="white--text text-uppercase mb-1" >
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

        <v-card>
          <v-card-title class="headline">Sistema de Bonificaciones y Canje de Puntos</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <div class="cuadro_puntos">
                  <div class="font-weight-bold mb-2">Puntos Acumulados</div>
                  <div class="display-1">{{ puntosAcumulados }}</div>
                </div>
              </v-col>

              <v-col cols="12" md="8">
                <v-row>
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
                        <tr v-for="(actividad, index) in actividades" :key="index">
                          <td>{{ formatDate(actividad.fecha) }}</td>
                          <td>{{ actividad.actividad }}</td>
                          <td>{{ actividad.puntos }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-col>

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
                        <tr v-for="(recompensa, index) in recompensas" :key="index" style="margin-top: 10px;">
                          <td>{{ recompensa.nombre }}</td>
                          <td>{{ recompensa.puntosRequeridos }}</td>
                          <td>
                            <v-btn 
                              color="white" 
                              text 
                              size="small"  
                              style="background-color: #008080;"
                              class="mb-1"
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
      antecedentes: [],
      pagos: [],
      puntosAcumulados: 0,
      actividades: [],
      recompensas: [],
    };
  },
  methods: {
    async fetchReportes() {
      try {
        const response = await axios.get('http://localhost:5001/api/reporte');
        const data = response.data;
        this.antecedentes = data.antecedentes || [];
        this.pagos = data.pagos || [];
        this.puntosAcumulados = data.bonificaciones.puntosAcumulados || 0;
        this.actividades = data.bonificaciones.actividades || [];
        this.recompensas = data.bonificaciones.recompensas || [];
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${month}-${day}-${year}`;
    },
    async canjearRecompensa(recompensa) {
      try {
        const response = await axios.post('http://localhost:5001/api/reporte/recompensa', {
          nombre: recompensa.nombre,
          puntosRequeridos: recompensa.puntosRequeridos,
        });
        if (response.status === 200) {
          alert(`Recompensa "${recompensa.nombre}" canjeada exitosamente.`);
          this.puntosAcumulados = response.data.bonificaciones.puntosAcumulados;
        } else {
          alert('Error al canjear la recompensa');
        }
      } catch (error) {
        console.error('Error al canjear recompensa:', error);
        alert('Error al canjear la recompensa');
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
