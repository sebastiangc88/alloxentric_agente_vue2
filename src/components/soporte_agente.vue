<template>
    <v-container class="caja_principal">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h5 font-weight-bold mb-4">Soporte al Agente</h1>
        </v-col>
  
        <v-col cols="12" md="8">
          <v-card class="mb-4">
            <v-card-title class="text-h6 font-weight-bold">Centro de Ayuda</v-card-title>
            <v-card-text>
              <v-btn-toggle mandatory>
                <v-btn>Buscar Ayuda</v-btn>
                <v-btn>Chat en Vivo</v-btn>
                <v-btn>Crear Ticket</v-btn>
              </v-btn-toggle>
  
              <v-text-field
                label="Buscar"
                append-icon="mdi-magnify"
                class="mt-4"
                @click:append="buscar"
              ></v-text-field>
            </v-card-text>
          </v-card>
  
          <v-card>
            <v-card-title class="text-h6 font-weight-bold">Preguntas Frecuentes</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(pregunta, index) in preguntasFrecuentes" :key="index">
                  <v-list-item-content class="preguntas_frecuentes">
                    <v-list-item-title @click="mostrarRespuesta(index)">
                      {{ pregunta }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold">{{ preguntaActual }}</v-card-title>
          <v-card-text>
            {{ respuestaActual }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        preguntasFrecuentes: [
          '¿Cómo actualizo mi perfil?',
          '¿Cómo puedo ver mis pagos pendientes?',
          '¿Cuál es el proceso para solicitar días libres?',
          '¿Cómo puedo reportar un problema técnico?',
        ],
        respuestasFrecuentes: [
          'Para actualizar tu perfil, ve a la sección "Mi Cuenta" y haz clic en "Editar Perfil". Allí podrás modificar tu información personal y guardar los cambios.',
          'Puedes ver tus pagos pendientes en la sección "Pagos". Encontrarás una lista de todos tus pagos, incluyendo los que están pendientes.',
          'Para solicitar días libres, debes enviar una solicitud a tu supervisor a través del sistema de gestión de personal. Asegúrate de incluir las fechas y el motivo de tu solicitud.',
          'Si tienes un problema técnico, puedes reportarlo a través del formulario de contacto en la sección "Soporte". También puedes contactarnos por correo electrónico o teléfono.',
        ],
        dialog: false,
        preguntaActual: '',
        respuestaActual: '',
      };
    },
    methods: {
      buscar() {
        // Lógica para realizar la búsqueda en la base de conocimientos
        console.log('Realizar búsqueda');
      },
      mostrarRespuesta(index) {
        this.preguntaActual = this.preguntasFrecuentes[index];
        this.respuestaActual = this.respuestasFrecuentes[index];
        this.dialog = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .caja_principal{
    margin-top: 60px;
  }
  .preguntas_frecuentes{
    align-items: center;
  padding: 10px;
  margin: 5px 0;
  font-weight: 500;
  color: #4a4a4a;
  text-decoration: none; 
  transition: background-color 0.2s ease;
  font-weight: bold;
  }
 .preguntas_frecuentes:hover{
    background-color: #e0e0e0;
  cursor: pointer;
 }
  </style>