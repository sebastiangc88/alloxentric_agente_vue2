<template>
    <v-container class="bloque_principal">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="headline d-flex justify-space-between align-center">
              <h1 class ="text-h5 font-weight-bold text-primary white--text ">Cartola de Pagos</h1>
              <v-btn color="primary" fab small dark @click="descargarReporte">
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="bloque_contenido">
              <v-btn-toggle v-model="periodo" mandatory>
                <v-btn>Por Hora</v-btn>
                <v-btn>Diario</v-btn>
                <v-btn>Mensual</v-btn>
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
                      <td>{{ empresa.nombre }}</td>
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
  export default {
    data() {
      return {
        periodo: 0, // 0: Por Hora, 1: Diario, 2: Mensual
        empresas: [
          { nombre: 'Empresa A', pagoHora: 16, pagoDiario: 128, pagoMensual: 3840 },
          { nombre: 'Empresa B', pagoHora: 18, pagoDiario: 144, pagoMensual: 4320 },
          { nombre: 'Empresa C', pagoHora: 20, pagoDiario: 160, pagoMensual: 4800 },
        ],
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
        console.log('Detalles de la empresa:', empresa.nombre);
      },
    },
  };
  </script>
<style scoped>
.titulo{
    color:white;
   
    font-weight: bold;
    font-size:40px;
}
.headline{
    background-color: #008080;
}
.bloque_contenido{
    margin-top: 50px;
}
.bloque_principal{
  margin-top: 50px;
}
</style>