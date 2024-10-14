<template>
    <v-app>
        <v-app-bar color="#008080" dark app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="d-flex align-center"> 
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alloxentric.png-WQlEJS2mNDVHfJLAmhR9JbaAD3urYs.webp"
                    alt="Alloxentric Logo"
                    style="width: 26px; height: 26px;"
                    class="mr-2"
                />
                Alloxentric
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom left> 
                <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-translate</v-icon> 
                </v-btn>
                </template>

                <v-list>
                <v-list-item
                    v-for="(item, index) in idiomas"
                    :key="index"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                </v-list>
            </v-menu>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-avatar>
                    <img
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        alt="Generic Profile"
                    />
                    </v-avatar>
                </v-btn>
                </template>

                <v-list>
                <v-list-item>
                    <v-list-item-title>Mario Doe</v-list-item-title> 
                </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer">
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" :to="item.to">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container class="p-8 overflow-y-auto">
                <div class="flex items-center mb-8">
                    <v-btn icon color="#008080" class="mr-4" @click="$router.go(-1)">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <h1 class="text-2xl font-bold text-[#068180]">Agente de Servicio Freelance</h1>
                </div>

                <v-row>
                <v-col cols="12" md="8">
                    <div class="mb-6">
                    <p class="text-sm text-gray-500">Publicado Hoy</p>
                    <p class="text-sm text-gray-500">
                        <v-icon small color="red">mdi-map-marker</v-icon> Mexico/Chile
                    </p>
                    </div>

                    <section class="mb-6">
                    <h2 class="text-xl font-semibold mb-2 text-[#068180]">¿Que Buscamos?</h2>
                    <p class="text-gray-700">
                        Buscamos un agente de servicio freelance con experiencia en atención al cliente y resolución de problemas.
                        El candidato ideal será capaz de proporcionar un excelente servicio al cliente, manejar consultas y quejas,
                        y trabajar eficientemente en un entorno de ritmo rápido.
                    </p>
                    </section>
                </v-col>

                <v-col cols="12">
                    <v-card class="mx-auto" max-width="1200">
                    <v-card-text>
                        <v-row>
                        <v-col cols="12" md="4" class="text-center">
                            <h3 class="text-lg font-semibold text-[#068180]">Remuneración por hora</h3>
                            <p class="text-xl font-bold text-[#068180]">$15 USD</p>
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                            <h3 class="text-lg font-semibold text-[#068180]">Bonificaciones por rendimiento</h3>
                            <p class="text-xl font-bold text-[#068180]">Hasta $5 USD/hora</p>
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                            <h3 class="text-lg font-semibold text-[#068180]">Puntos Alloxentric</h3>
                            <p class="text-xl font-bold text-[#068180]">100 pts/hora</p>
                        </v-col>
                        </v-row>
                    </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4" class="mt-md-0 mt-6 d-flex align-center">
                    <v-chip label color="#008080" class="mr-2">
                    <v-icon left>mdi-star</v-icon>
                    Experiencia
                    </v-chip>
                    <div>
                    <p class="text-lg font-bold text-[#068180]">Intermedia</p>
                    </div>
                </v-col>

                <v-col cols="12" md="4" class="mt-md-0 mt-6 d-flex align-center">
                    <v-chip label color="#008080" class="mr-2">
                    <v-icon left>mdi-translate</v-icon>
                    Idioma
                    </v-chip>
                    <div>
                    <p class="text-lg font-bold text-[#068180]">Español</p>
                    </div>
                </v-col>

                <v-col cols="12" md="8">
                    <section class="mb-6">
                    <h2 class="text-xl font-semibold mb-2 text-[#068180]">Sobre el cliente</h2>
                    <p class="text-gray-700">Miembro desde 10 de diciembre 2023</p>
                    <p class="font-semibold text-[#068180]">Vitalia Tech</p>
                    <div class="d-flex align-center mt-2">
                        <v-chip label color="#008080" small class="mr-2">
                        <v-icon left small>mdi-map-marker</v-icon>
                        País
                        </v-chip>
                        <span>Mexico</span>
                    </div>
                    <div class="d-flex align-center mt-2">
                        <v-chip label color="#008080" small class="mr-2">
                        <v-icon left small>mdi-shape</v-icon>
                        Categoría
                        </v-chip>
                        <span>Salud y Bienestar</span>
                    </div>
                    </section>
                </v-col>
                </v-row>

                <section class="mb-6">
                    <v-card class="pa-4 mx-1" color="#f0f4f8"> 
                        <h2 class="text-xl font-semibold mb-4 text-[#008080]">Horarios Disponibles</h2>
                        <div class="overflow-x-auto">
                        <v-sheet class="inline-block min-w-full">
                            <v-row no-gutters>
                            <v-col cols="1" class="font-semibold text-center">Hora</v-col>
                            <v-col cols="11/7" v-for="day in days" :key="day" class="font-semibold text-center">
                                {{ day }}
                            </v-col>
                            </v-row>
                            <v-row no-gutters v-for="(time, index) in timeSlots" :key="index">
                            <v-col cols="1" class="text-center">{{ time }}</v-col>
                            <v-col cols="11/7" v-for="day in days" :key="`${day}-${time}`" class="d-flex justify-center pa-0"> 
                                <v-btn
                                    class="mx-[-2px]" 
                                    :color="isSlotSelected(day, time) ? '#004d4d' : (isSlotAvailable(day, time) ? '#4caf50' : '#f44336 !important')"
                                    :class="{ 'text-white': isSlotSelected(day, time) }"
                                    large
                                    @click="toggleSlot(day, time)"
                                    :disabled="!isSlotAvailable(day, time)"
                                    >
                                    {{ isSlotSelected(day, time) ? '✓' : '' }}
                                </v-btn>
                            </v-col>
                            </v-row>
                        </v-sheet>
                        </div>
                    </v-card>
                </section>

                <div class="mb-6">
                    <h3 class="text-lg font-semibold text-[#008080]">Ganancias Semanales Estimadas</h3>
                    <p class="text-xl font-bold">${{ weeklyEarnings }} USD</p>
                </div>

                <v-btn
                block
                color="#008080"
                class="text-white py-2 px-4 rounded transition-all duration-300 hover:scale-105"
                @click="postularse"
                >
                Postular a Horarios Seleccionados
                </v-btn>
            </v-container>
        </v-main>
    </v-app>
  </template>
  
  <style scoped>
  .v-btn {
    width: 90%; /* Ajusta el ancho del botón al 100% de la columna */
    /* También puedes usar un valor fijo en píxeles, por ejemplo: width: 40px; */
  }
  </style>

  <script>
  export default {
    data() {
      return {
        selectedSlots: [],
        timeSlots: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
        days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        availability: {
          "Lun": ["09:00", "10:00", "11:00", "14:00", "15:00"],
          "Mar": ["09:00", "11:00", "13:00", "16:00", "17:00"],
          "Mié": ["10:00", "12:00", "14:00", "15:00", "16:00"],
          "Jue": ["09:00", "10:00", "11:00", "13:00", "17:00"],
          "Vie": ["11:00", "12:00", "14:00", "15:00", "16:00"],
          "Sáb": ["10:00", "11:00", "12:00"],
          "Dom": ["14:00", "15:00", "16:00"],
        },
        items: [
          { title: 'Inicio', icon: 'mdi-home', to: '/' },
          { title: 'Ofertas', icon: 'mdi-briefcase', to: '/ofertas' },
          { title: 'Calendario', icon: 'mdi-calendar', to: '/calendario' },
          { title: 'Agente', icon: 'mdi-account', to: '/agente' },
        ],
        menuItems: [
            { title: 'Mario Doe' }
        ],idiomas: [
            { title: 'ES' } 
        ],
        drawer: false,
      };
    },
    computed: {
      weeklyEarnings() {
        const hourlyRate = 15;
        return this.selectedSlots.length * hourlyRate;
      },
    },
    methods: {
      toggleSlot(day, time) {
        const slotKey = `${day}-${time}`;
        if (this.selectedSlots.includes(slotKey)) {
          this.selectedSlots = this.selectedSlots.filter(slot => slot !== slotKey);
        } else {
          this.selectedSlots.push(slotKey);
        }
      },
      isSlotAvailable(day, time) {
        return this.availability[day].includes(time);
      },
      isSlotSelected(day, time) {
        return this.selectedSlots.includes(`${day}-${time}`);
      },
    },
  };
  </script>