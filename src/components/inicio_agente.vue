<template>
    <v-container>
      <v-row class="mb-6">
        <v-col cols="12">
          <h1 class="text-h4 font-weight-bold text-primary">
            ¡Bienvenido, Mario Doe!
          </h1>
        </v-col>
      </v-row>
  
      <v-row class="mb-4">
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h2 class="text-xl font-weight-medium text-primary">Ofertas</h2>
            <p>Explora nuevas oportunidades laborales y encuentra el trabajo ideal para ti.</p>
            <v-btn color="#008080" class="white--text" to="/ofertas">Ver ofertas</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h2 class="text-xl font-weight-medium text-primary">Calendario</h2>
            <p>Gestiona tu disponibilidad horaria y mantén tu calendario actualizado.</p>
            <v-btn color="#008080" class="white--text" to="/calendario">Ver calendario</v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h2 class="text-xl font-weight-medium text-primary">Evaluaciones</h2>
            <p>Revisa tus evaluaciones y el feedback de tus clientes para mejorar tu desempeño.</p>
            <v-btn color="#008080" class="white--text" to="/agente/evaluaciones">Ver evaluaciones</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h2 class="text-xl font-weight-medium text-primary">Pagos</h2>
            <p>Consulta tu historial de pagos y gestiona tus métodos de pago de forma segura.</p>
            <v-btn color="#008080" class="white--text" to="/agente/pagos">Ver pagos</v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12">
          <v-card class="pa-4">
            <h2 class="text-xl font-weight-medium text-primary">Reportes</h2>
            <p>Genera reportes de tu actividad y analiza tu desempeño como agente.</p>
            <v-btn color="#008080" class="white--text" to="/agente/reportes">Ver reportes</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'MainInicio',
  };
  </script>