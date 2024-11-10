/* eslint-disable vue/multi-word-component-names */

<!-- src/components/LoginAgente.vue -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Iniciar Sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                label="Email"
                v-model="email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                label="Contraseña"
                v-model="password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" block>Iniciar Sesión</v-btn>
              <p v-if="error" class="error-message">{{ error }}</p>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginAgente',
  data() {
    return {
      email: '',
      password: '',
      error: '' // Nueva propiedad para almacenar mensajes de error
    };
  },
  methods: {
    async login() {
      try {
        this.error = ''; // Reinicia el mensaje de error antes de intentar el login

        const response = await axios.post('http://localhost:5001/api/soporte/login', {
          email: this.email,
          password: this.password
        });
        
        // Guarda el token en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('correoUsuario', this.email); // Guarda el correo en localStorage
        
        // Redirige a la pantalla de inicio
        this.$router.push('/inicio');
      } catch (error) {
        // Verifica si el error es de autenticación
        if (error.response && error.response.status === 401) {
          this.error = 'Credenciales inválidas. Por favor, inténtelo de nuevo.';
        } else {
          console.error('Error al iniciar sesión:', error);
          this.error = 'Ocurrió un problema. Por favor, intente nuevamente más tarde.';
        }
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
