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
                          <td>{{ antecedente.fecha }}</td>
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
                          <td>{{ pago.fecha }}</td>
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
                          <td>{{ actividad.fecha }}</td>
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
                          <td>{{ recompensa.puntos }}</td>
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
export default {
  data() {
    return {
      antecedentes: [
        { fecha: '2023-01-15', descripcion: 'Inicio de contrato' },
        { fecha: '2023-06-30', descripcion: 'Renovación de licencia' },
      ],
      pagos: [
        { fecha: '2023-07-01', monto: '$1500', empresa: 'Empresa A', estado: 'Pagado' },
        { fecha: '2023-08-01', monto: '$1500', empresa: 'Empresa B', estado: 'Pendiente' },
      ],
      puntosAcumulados: 5000,
      actividades: [
        { fecha: '2023-08-15', actividad: 'Completar proyecto', puntos: '+1000' },
        { fecha: '2023-08-10', actividad: 'Referir cliente', puntos: '+500' },
      ],
      recompensas: [
        { nombre: 'Día libre', puntos: 5000 },
        { nombre: 'Bono en efectivo', puntos: 10000 },
      ],
    };
  },
  methods: {
    canjearRecompensa(recompensa) {
      // Lógica para canjear la recompensa
      console.log('Canjear recompensa:', recompensa.nombre);
    },
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