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
                  <v-checkbox-group v-model="idiomasSeleccionados" class="mb-2">
                    <v-checkbox
                      v-for="idioma in idiomasDisponibles"
                      :key="idioma.codigo"
                      :label="idioma.nombre"
                      :value="idioma.codigo"
                      @change="toggleIdioma(idioma.codigo)"
                      dense
                    ></v-checkbox>
                  </v-checkbox-group>

                  <!-- Selector de nivel de idioma para cada idioma seleccionado -->
                  <div v-for="idiomaCodigo in idiomasSeleccionados" :key="idiomaCodigo" class="mt-2">
                    <v-select
                      v-if="idiomaCodigo !== 'otro'"
                      v-model="nivelesIdioma[idiomaCodigo]"
                      :items="niveles"
                      :label="`Nivel de ${obtenerNombreIdioma(idiomaCodigo)}`"
                      @change="cambiarNivelIdioma(idiomaCodigo, nivelesIdioma[idiomaCodigo])"
                      dense
                      outlined
                    ></v-select>
                    <!-- Campo de entrada para el idioma personalizado y nivel de idioma -->
                    <div v-if="idiomaCodigo === 'otro'">
                      <v-text-field
                        v-model="otroIdioma"
                        label="Especifique el idioma"
                        dense
                        outlined
                        class="mt-1"
                      ></v-text-field>
                      <v-select
                        v-model="nivelesIdioma[idiomaCodigo]"
                        :items="niveles"
                        label="Nivel de idioma personalizado"
                        @change="cambiarNivelIdioma(idiomaCodigo, nivelesIdioma[idiomaCodigo])"
                        dense
                        outlined
                        class="mt-1"
                      ></v-select>
                    </div>
                  </div>
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

    <v-dialog v-model="showBancoDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Ingresar datos bancarios</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="bancoForm" v-model="bancoValid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="banco" label="Banco" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="tipoCuenta" label="Tipo de cuenta" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="numeroCuenta" label="Número de cuenta" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showBancoDialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="guardarDatosBancarios">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showBancoDialog: false,
      banco: null,
      tipoCuenta: null,
      numeroCuenta: null,
      bancoValid: false,
      valid: false,
      menu: false,
      whatsappVerificado: false,
      fechaNacimiento: null,
      fechaNacimientoFormatted: "",
      nombreCompleto: "",
      idFiscal: "",
      telefono: "",
      genero: "",
      selectedPais: "",
      experiencia: "",
      habilidades: "",
      idiomasSeleccionados: [],
      nivelesIdioma: {},
      otroIdioma: "",
      tiposAgenteSeleccionados: [],
      paises: ["Argentina", "Chile", "México", "Perú"],
      generos: ["Masculino", "Femenino", "Otro"],
      tiposAgenteDisponibles: [
        "Agente de Soporte",
        "Agente de Servicios",
        "Agente de Cobranzas",
        "Agente de Ventas",
      ],
      idiomasDisponibles: [
        { codigo: "es", nombre: "Español" },
        { codigo: "en", nombre: "Inglés" },
        { codigo: "pt", nombre: "Portugués" },
        { codigo: "otro", nombre: "Otro" },
      ],
      niveles: ["Básico", "Intermedio", "Avanzado", "Nativo"],
    };
  },
  methods: {
    obtenerNombreIdioma(codigo) {
      const idioma = this.idiomasDisponibles.find((i) => i.codigo === codigo);
      return idioma ? idioma.nombre : "Desconocido";
    },
    simularVerificacionWhatsapp() {
      this.whatsappVerificado = true;
    },
    fechaNacimientoMenu(val) {
      this.menu = val;
    },
    ingresarDatosTributarios() {},
    volverAtras() {
      this.$router.push("/login");
    },
    async finalizarRegistro() {
      try {
        const token = localStorage.getItem("token");

        const idiomas = this.idiomasSeleccionados.map((codigo) => ({
          codigo,
          nivel: this.nivelesIdioma[codigo] || "Básico",
        }));

        await axios.post(
          "http://localhost:5001/api/agentes/registro",
          {
            nombreCompleto: this.nombreCompleto,
            idFiscal: this.idFiscal,
            telefono: this.telefono,
            whatsappVerificado: this.whatsappVerificado,
            fechaNacimiento: this.fechaNacimiento,
            genero: this.genero,
            pais: this.selectedPais,
            tiposAgenteSeleccionados: this.tiposAgenteSeleccionados,
            experiencia: this.experiencia,
            habilidades: this.habilidades,
            idiomas,
            otroIdioma: this.otroIdioma,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Registro completado con éxito");
        this.$router.push("/inicio");
      } catch (error) {
        console.error("Error al registrar agente:", error);
        alert("Hubo un problema al registrar los datos. Intenta nuevamente.");
      }
    },
    toggleIdioma(codigo) {
      const index = this.idiomasSeleccionados.indexOf(codigo);
      if (index > -1) {
        this.idiomasSeleccionados.splice(index, 1);
        this.$delete(this.nivelesIdioma, codigo);
        if (codigo === "otro") this.otroIdioma = "";
      } else {
        this.idiomasSeleccionados.push(codigo);
        this.$set(this.nivelesIdioma, codigo, "Básico");
      }
    },
    cambiarNivelIdioma(codigo, nivel) {
      if (this.idiomasSeleccionados.includes(codigo)) {
        this.$set(this.nivelesIdioma, codigo, nivel);
      }
    },
    async guardarDatosBancarios() {
      if (this.$refs.bancoForm.validate()) {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userID');

          await axios.post(
            `http://localhost:5001/api/agentes/${userId}/bancario`, 
            {
              banco: this.banco,
              tipoCuenta: this.tipoCuenta,
              numeroCuenta: this.numeroCuenta,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          this.showBancoDialog = false; // Cierra el diálogo después de guardar
          alert("Datos bancarios guardados con éxito");
        } catch (error) {
          console.error("Error al guardar datos bancarios:", error);
          alert("Hubo un problema al guardar los datos bancarios. Intenta nuevamente.");
        }
      }
    },
  },
};
</script>

<style scoped>
.d-flex.align-center {
  display: flex;
  align-items: center;
}
</style>
