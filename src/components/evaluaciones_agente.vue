<template>
  <v-container class="caja_calificaciones">
    <v-card>
      <v-card-title class="titulo">
        <h1 class="text-h4 font-weight-bold text-primary white--text">Evaluaciones</h1>
      </v-card-title>

      <v-card-subtitle class="contenido_calificaciones">
        <div>
          <span class="score-label">Calificación General</span>
          <v-rating v-model="generalRating" size="30" color="#008080" readonly></v-rating>
          <span class="general-rating">{{ generalRating }}</span>
          <div>Basado en {{ totalEvaluaciones }} evaluaciones</div>
        </div>
      </v-card-subtitle>

      <v-divider></v-divider>

      <v-card-text>
        <h3>Desglose de Evaluaciones</h3>
        <v-list>
          <v-list-item v-for="(score, index) in scores" :key="index">
            <v-list-item-content>
              <v-list-item-title class="score-label">{{ score.label }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-rating v-model="score.value" size="25" color="#008080" readonly></v-rating>
              <span class="score-value">{{ score.value }}</span>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
        <v-divider></v-divider>
        <h3>Comentarios Recientes</h3>
        <v-list>
          <v-list-item v-for="(comment, index) in recentComments" :key="index">
            <v-list-item-action>
              <v-icon size="40">mdi-account</v-icon> <!-- Ícono de cuenta -->
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="comment-text">{{ comment.text }}</v-list-item-title>
              <v-list-item-subtitle>{{ comment.date }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-rating v-model="comment.rating" size="25" color="#008080" readonly></v-rating>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="#008080" class="white--text" large>Ver Todas las Evaluaciones</v-btn>
        <v-btn color="#c59760" class="white--text" large>Descargar Reporte</v-btn> 
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      generalRating: 4.2,
      totalEvaluaciones: 150,
      scores: [
        { label: 'Atención al Cliente', value: 4.5 },
        { label: 'Resolución de Problemas', value: 4.2 },
        { label: 'Eficiencia', value: 4.0 },
        { label: 'Conocimiento del Producto', value: 4.3 },
      ],
      recentComments: [
        { text: 'Excelente atención, muy profesional y eficiente.', date: 'Hace 1 día', rating: 4.5 },
        { text: 'Resolví mi problema rápidamente. Muy satisfecho.', date: 'Hace 2 días', rating: 4.0 },
        { text: 'Buen servicio, pero tardó un poco en entender mi problema.', date: 'Hace 3 días', rating: 3.5 },
      ],
    };
  },
};
</script>

<style scoped>
.caja_calificaciones {
  margin-top: 50px;
  
}

.contenido_calificaciones {
  margin-top: 30px;
}

.titulo {
  background-color: #008080;
  padding: 20px;
}

h1 {
  color: #fffdfd;
  font-size: 36px;
}

h3 {
  font-weight: bold;
  color: #008080;
  font-size: 28px;
  margin-top: 20px;
}

.estrellas {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.score-label {
  flex: 1; /* Toma el espacio restante */
  font-size: 24px; /* Aumentar el tamaño de la fuente */
}

.score-value {
  font-size: 24px; /* Aumentar el tamaño de la fuente */
  margin-left: 20px;  /* Espacio entre la calificación y el texto */
}

.comment-text {
  font-size: 20px; /* Aumentar el tamaño del texto de los comentarios */
  color: #008080;
}

.v-list-item {
  padding: 15px 0;
}

.v-divider {
  margin: 5px 0;
}
</style>