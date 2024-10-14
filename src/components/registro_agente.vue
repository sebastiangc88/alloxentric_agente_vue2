<template>
  <v-app>

    <v-main>
      <v-container class="fill-height d-flex flex-column justify-center align-center">
        <v-card class="mx-auto py-6 px-8" max-width="1200" elevation="3">
          <div class="pa-4" style="background-color: #008080; width: 100%;">
            <h2 class="mb-0 white--text">Registro de Agente</h2>
            <p class="white--text mb-0">Por favor, complete la información para registrarse como agente.</p>
          </div>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-row dense>
                <v-col cols="12" md="6" class="pr-4">
                  <v-label class="font-weight-bold black--text">Nombre completo</v-label>
                  <v-text-field v-model="nombreCompleto" label="Ingrese su nombre completo" dense outlined class="mt-1"></v-text-field>

                  <v-label class="font-weight-bold black--text mt-4">Identificación Fiscal Personal</v-label>
                  <v-text-field v-model="idFiscal" label="RUT o RFC personal" dense outlined class="mt-1"></v-text-field>

                  <v-label class="font-weight-bold black--text mt-4">Número de teléfono (WhatsApp)</v-label>
                  <v-text-field v-model="telefono" label="+56 9 1234 5678" dense outlined class="mt-1"></v-text-field>

                  <div class="d-flex align-center mt-2">
                    <v-btn :disabled="whatsappVerificado" color="#008080" class="white--text" @click="simularVerificacionWhatsapp">
                      {{ whatsappVerificado ? 'Verificado' : 'Verificar WhatsApp' }}
                    </v-btn>

                    <v-label class="font-weight-bold black--text ml-4">Fecha de nacimiento</v-label>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" offset-y max-width="290px" min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="fechaNacimientoFormatted" label="Seleccione una fecha" prepend-icon="mdi-calendar" readonly dense outlined v-on="on" class="mt-1 ml-4"></v-text-field>
                      </template>
                      <v-date-picker v-model="fechaNacimiento" @input="fechaNacimientoMenu(false)"></v-date-picker>
                    </v-menu>
                  </div>

                  <v-label class="font-weight-bold black--text mt-4">Género</v-label>
                  <v-select v-model="genero" :items="generos" label="Seleccione su género" dense outlined class="mt-1"></v-select>

                  <v-label class="font-weight-bold black--text mt-4">País</v-label>
                  <v-select v-model="selectedPais" :items="paises" label="Elija su país de residencia" dense outlined class="mt-1"></v-select>

                  <v-btn color="#008080" class="white--text mt-4" block @click="ingresarDatosTributarios">
                    Ingresar con datos tributarios
                  </v-btn>

                  <v-btn color="#008080" class="white--text mt-2" block @click="showBancoDialog = true">
                    Ingresar datos bancarios
                  </v-btn>
                </v-col>

                <v-col cols="12" md="6" class="pl-4">
                  <v-label class="font-weight-bold black--text">Tipo de Agente (selección múltiple)</v-label>
                  <v-checkbox-group v-model="tiposAgenteSeleccionados">
                    <v-checkbox v-for="tipo in tiposAgenteDisponibles" :key="tipo" :label="tipo" :value="tipo.toLowerCase()" dense></v-checkbox>
                  </v-checkbox-group>

                  <v-label class="font-weight-bold black--text mt-4">Años de experiencia</v-label>
                  <v-text-field v-model="experiencia" label="Ingrese sus años de experiencia" type="number" dense outlined class="mt-1"></v-text-field>

                  <v-label class="font-weight-bold black--text mt-4">Habilidades principales</v-label>
                  <v-textarea v-model="habilidades" label="Describa brevemente sus principales habilidades y competencias." dense outlined class="mt-1"></v-textarea>

                  <v-label class="font-weight-bold black--text mt-4">Idioma (selección múltiple)</v-label>
                  <v-checkbox-group v-model="idiomasSeleccionados">
                    <v-checkbox v-for="idioma in idiomasDisponibles" :key="idioma" :label="idioma" :value="idioma.toLowerCase()" dense></v-checkbox>
                  </v-checkbox-group>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="volverAtras">Volver atrás</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="#008080" class="white--text" :disabled="!valid" @click="finalizarRegistro">
              Finalizar registro
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      menu: false,
      whatsappVerificado: false,
      fechaNacimiento: null,
      fechaNacimientoFormatted: '',
      nombreCompleto: '',
      idFiscal: '',
      telefono: '',
      genero: '',
      selectedPais: '',
      experiencia: '',
      habilidades: '',
      idiomasSeleccionados: [],
      tiposAgenteSeleccionados: [],
      paises: ['Argentina', 'Chile', 'México', 'Perú'],
      generos: ['Masculino', 'Femenino', 'Otro'],
      tiposAgenteDisponibles: [
        'Agente de Soporte',
        'Agente de Servicios',
        'Agente de Cobranzas',
        'Agente de Ventas',
      ],
      idiomasDisponibles: ['Español', 'Inglés', 'Portugués', 'Otro'],
      drawer: false,
      items: [
        { title: 'Inicio', icon: 'mdi-home', to: '/' },
        { title: 'Ofertas', icon: 'mdi-briefcase', to: '/ofertas' },
        { title: 'Calendario', icon: 'mdi-calendar', to: '/calendario' },
        { title: 'Agente', icon: 'mdi-account', to: '/agente' },
      ],
      idiomas: [{ title: 'ES' }, { title: 'EN' }],
    };
  },
  methods: {
    simularVerificacionWhatsapp() {
      this.whatsappVerificado = true;
    },
    fechaNacimientoMenu(val) {
      this.menu = val;
    },
    ingresarDatosTributarios() {},
    volverAtras() {},
    finalizarRegistro() {
      // ... lógica para registrar al agente ...
      localStorage.setItem('agenteRegistrado', true);
      this.$router.push('/inicio'); 
    }
  },
};
</script>

<style scoped>
.d-flex.align-center {
  display: flex;
  align-items: center;
}
</style>
