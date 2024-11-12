<template>
  <v-container class="bloque_principal">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline d-flex justify-space-between align-center">
            <h1 class="text-h5 font-weight-bold text-primary white--text">Cartola de Pagos</h1>
            <v-btn color="#FFB74D" fab small dark @click="descargarReporte">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="bloque_contenido">
            <v-btn-toggle v-model="periodo" mandatory>
              <v-btn @click="cambiarPeriodo(0)">Por Hora</v-btn>
              <v-btn @click="cambiarPeriodo(1)">Diario</v-btn>
              <v-btn @click="cambiarPeriodo(2)">Mensual</v-btn>
            </v-btn-toggle>

            <v-simple-table class="mt-4">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Empresa</th>
                    <th class="text-left">Pago por {{ periodoLabel }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(empresa, index) in empresas"
                    :key="index"
                    @click="mostrarDetalles(empresa)"
                    style="cursor: pointer"
                  >
                    <td>{{ empresa.nombreEmpresa }}</td>
                    <td>{{ calcularPago(empresa) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
      periodo: 0, // 0: Por Hora, 1: Diario, 2: Mensual
      empresas: [], // Vacío inicialmente, se llenará con los datos del backend
    };
  },
  computed: {
    periodoLabel() {
      switch (this.periodo) {
        case 0:
          return 'Hora';
        case 1:
          return 'Día';
        case 2:
          return 'Mes';
        default:
          return 'Hora';
      }
    },
  },
  methods: {
    async obtenerPagos() {
      try {
        const response = await axios.get('http://localhost:5001/api/pagos');
        this.empresas = response.data;
      } catch (error) {
        console.error('Error al obtener los pagos:', error);
      }
    },
    calcularPago(empresa) {
      switch (this.periodo) {
        case 0:
          return `$${empresa.pagoHora.toFixed(2)}`;
        case 1:
          return `$${empresa.pagoDiario.toFixed(2)}`;
        case 2:
          return `$${empresa.pagoMensual.toFixed(2)}`;
        default:
          return `$${empresa.pagoHora.toFixed(2)}`;
      }
    },
    descargarReporte() {
      // Lógica para descargar el reporte
      console.log('Descargar reporte');
    },
    mostrarDetalles(empresa) {
      // Lógica para mostrar los detalles de la empresa
      console.log('Detalles de la empresa:', empresa.nombreEmpresa);
    },
    cambiarPeriodo(nuevoPeriodo) {
      this.periodo = nuevoPeriodo;
    }
  },
  created() {
    // Obtener los pagos al cargar el componente
    this.obtenerPagos();
  }
};
</script>

<style scoped>
.titulo {
  color: white;
  font-weight: bold;
  font-size: 40px;
}
.headline {
  background-color: #008080;
}
.bloque_contenido {
  margin-top: 50px;
}
.bloque_principal {
  margin-top: 50px;
}
</style>
