<template id="letra">
  <v-container class="caja_certificaciones">
    <v-row>
      <v-col cols="12">
        <v-card class="contenido-caja">
          <v-card-title class="headline">
            <h1 class="titulo">Certificaciones y Cursos</h1>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="progreso-general">
                  <h2 class="subtitulo">Progreso General</h2>
                  <div class="nivel-certificacion">
                    <span>Nivel de Certificación</span>
                    <span class="ml-4 font-weight-bold">Avanzado</span>
                  </div>
                  <v-progress-linear
                    :value="75" 
                    color="#008080"
                    height="20"
                    class="mt-2"
                  ></v-progress-linear>
                  <span class="caption">Has completado el 75% de todas las certificaciones disponibles.</span>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="logradas">
                  <h2 class="subtitulo">Logradas</h2>
                  <v-card class="certificacion sombra-pronunciada" v-for="(certificacion, index) in certificaciones" :key="index">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon style="color:#008080">mdi-check-circle</v-icon> 
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ certificacion.nombre }}</v-list-item-title>
                        <v-list-item-subtitle>Completada</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="en-progreso">
                  <h2 class="subtitulo">En Progreso</h2>
                  <v-card class="certificacion sombra-pronunciada" v-for="(curso, index) in cursos" :key="index">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon style="color:#008080">mdi-progress-clock</v-icon> 
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ curso.nombre }}</v-list-item-title>
                        <v-list-item-subtitle>En progreso</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </div>
              </v-col>

              <v-col cols="12">
                <div class="cursos-disponibles">
                  <h2 class="subtitulo">Cursos Disponibles</h2>
                  <v-card class="curso sombra-pronunciada" v-for="(curso, index) in cursosDisponibles" :key="index">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ curso.nombre }}</v-list-item-title>
                        <v-list-item-subtitle>Duración: {{ curso.duracion }} horas</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn v-if="curso.certificado" color="white" text style="background-color: #008080;">
                           Completado
                        </v-btn>
                        <v-btn v-else color="#008080" class="white--text">
                          Iniciar Curso
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-card>
                </div>
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
      certificaciones: [
        { nombre: 'Atención al Cliente Avanzada' },
        { nombre: 'Gestión de Ventas Telefónicas' },
      ],
      cursos: [
        { nombre: 'Técnicas de Negociación' },
      ],
      cursosDisponibles: [
        { nombre: 'Introducción a CRM', duracion: 2, certificado: true },
        { nombre: 'Estrategias de Venta Avanzadas', duracion: 4, certificado: false },
        { nombre: 'Comunicación Efectiva', duracion: 3, certificado: false },
      ],
    };
  },
};
</script>

<style scoped>
.headline {
  background-color: #008080;
}

.titulo {
  color: white;
  font-weight: bold;
  font-size: 28px;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}

.caja_certificaciones {
  margin-top: 60px;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}

.contenido-caja {
  background-color: #ffffff;
  padding: 20px;
}

.subtitulo {
  color: #008080;
  font-weight: bold;
  margin-bottom: 10px;
}

.progreso-general {
  margin-top: 20px;
  margin-bottom: 20px;
}

.nivel-certificacion {
  display: flex;
  align-items: center;
}

.logradas, .en-progreso, .cursos-disponibles {
  margin-bottom: 20px;
}

.certificacion, .curso {
  background-color: #e6e6e6;
  margin-bottom: 10px;
}


</style>