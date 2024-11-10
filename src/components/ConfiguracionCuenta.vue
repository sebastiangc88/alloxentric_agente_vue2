<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">Configuración de Cuenta</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="actualizarCuenta">
                <!-- Nombre Completo -->
                <v-text-field
                  label="Nombre Completo"
                  v-model="nombreCompleto"
                  required
                ></v-text-field>
  
                <!-- Identificación Fiscal -->
                <v-text-field
                  label="Identificación Fiscal Personal"
                  v-model="idFiscal"
                  required
                ></v-text-field>
  
                <!-- Teléfono -->
                <v-text-field
                  label="Número de Teléfono (WhatsApp)"
                  v-model="telefono"
                  required
                ></v-text-field>
  
                <!-- Fecha de Nacimiento -->
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="fechaNacimientoFormatted"
                      label="Fecha de Nacimiento"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="fechaNacimiento" @input="menu = false"></v-date-picker>
                </v-menu>
  
                <!-- País -->
                <v-select
                  :items="paises"
                  label="País"
                  v-model="pais"
                  required
                ></v-select>
  
                <!-- Género -->
                <v-select
                  :items="generos"
                  label="Género"
                  v-model="genero"
                  required
                ></v-select>
  
                <!-- Tipo de Agente -->
                <v-select
                  :items="tiposAgenteDisponibles"
                  label="Tipo de Agente"
                  v-model="tiposAgenteSeleccionados"
                  multiple
                  required
                ></v-select>
  
                <!-- Email (No editable) -->
                <v-text-field
                  label="Email"
                  v-model="email"
                  readonly
                ></v-text-field>
  
                <!-- Nueva Contraseña -->
                <v-text-field
                  label="Nueva Contraseña"
                  v-model="password"
                  type="password"
                ></v-text-field>
  
                <!-- Botón para Actualizar -->
                <v-btn type="submit" color="primary" block>Guardar Cambios</v-btn>
                <p v-if="mensaje" class="success-message">{{ mensaje }}</p>
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
    name: 'ConfiguracionCuenta',
    data() {
      return {
        nombreCompleto: '',
        idFiscal: '',
        telefono: '',
        fechaNacimiento: null,
        fechaNacimientoFormatted: '',
        pais: '',
        genero: '',
        tiposAgenteSeleccionados: [],
        email: '',
        password: '',
        menu: false,
        mensaje: '',
        error: '',
        paises: ['Argentina', 'Chile', 'México', 'Perú'],
        generos: ['Masculino', 'Femenino', 'Otro'],
        tiposAgenteDisponibles: ['Agente de Soporte', 'Agente de Servicios', 'Agente de Cobranzas', 'Agente de Ventas']
      };
    },
    async mounted() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/agentes/datos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
  
        // Asigna los datos al formulario
        this.nombreCompleto = data.nombreCompleto || '';
        this.idFiscal = data.idFiscal || '';
        this.telefono = data.telefono || '';
        this.fechaNacimiento = data.fechaNacimiento || '';
        this.fechaNacimientoFormatted = this.formatDate(data.fechaNacimiento) || '';
        this.pais = data.pais || '';
        this.genero = data.genero || '';
        this.tiposAgenteSeleccionados = data.tiposAgenteSeleccionados || [];
        this.email = data.email || '';
      } catch (error) {
        console.error('Error al cargar datos:', error);
        this.error = 'Error al cargar datos. Intente nuevamente.';
      }
    },
    methods: {
      async actualizarCuenta() {
        try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:5001/api/agentes/actualizar', {
            nombreCompleto: this.nombreCompleto,
            idFiscal: this.idFiscal,
            telefono: this.telefono,
            fechaNacimiento: this.fechaNacimiento,
            pais: this.pais,
            genero: this.genero,
            tiposAgenteSeleccionados: this.tiposAgenteSeleccionados,
            password: this.password ? this.password : undefined // Solo envía si se ha cambiado
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.mensaje = 'Datos actualizados con éxito';
          this.error = '';
        } catch (error) {
          console.error('Error al actualizar datos:', error);
          this.error = 'Error al actualizar los datos. Intente nuevamente.';
          this.mensaje = '';
        }
      },
      formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .error-message {
    color: red;
    margin-top: 10px;
  }
  .success-message {
    color: green;
    margin-top: 10px;
  }
  </style>
  