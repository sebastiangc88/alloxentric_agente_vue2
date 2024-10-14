<template>
    <v-app>
      
      <!-- Contenido Principal -->
        <v-main class="pt-15">
            <v-container fluid>
                <!-- Sección de Control de Entrada -->
                <v-card class="control-de-entrada mb-6 w-100%" outlined>
                <v-card-title class="text-h5 font-weight-bold text-[#008080]">
                    Control de Entrada
                </v-card-title>
                <v-card-text>
                    <v-row align="center" justify="center">
                    <v-col cols="12" md="4" class="text-center">
                        <v-icon color="#008080" size="48">mdi-clock-outline</v-icon>
                        <span class="text-h4 font-weight-bold ml-2">
                        {{ timeRemaining ? timeRemaining : 'Calculando...' }}
                        </span>
                    </v-col>

                    <v-col cols="12" md="8">
                        <p>
                        <strong>Próximo Evento:</strong>
                        <span v-if="nearestEvent"> {{ nearestEvent.title }} </span>
                        <span v-else>No hay eventos próximos.</span>
                        </p>
                        <p>
                        <strong>Horario:</strong>
                        <span v-if="nearestEvent">
                            {{ nearestEvent.date.format('HH:mm') }}
                        </span>
                        <span v-else>--:--</span>
                        </p>
                    </v-col>
                    </v-row>

                    <v-btn color="#008080" dark block @click="iniciarTurno">
                    Iniciar Turno
                    </v-btn>
                </v-card-text>
                </v-card>

                <!-- Sección del Calendario -->
                <div class="control-de-calendario">
                <h1 class="text-3xl font-bold mb-6 text-[#008080]">
                    Calendario de Actividades
                </h1>
                <v-row>
                    <v-col cols="12" md="12">
                    <v-card>
                        <v-card-title class="justify-space-between">
                        <v-btn icon @click="mesAnterior">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <span class="text-xl font-semibold">{{ mesActual }}</span>
                        <v-btn icon @click="mesSiguiente">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                        </v-card-title>
                        <v-divider></v-divider>

                        <!-- Mostrar los días de la semana -->
                        <v-sheet class="d-flex flex-wrap">
                        <div
                            v-for="(diaSemana, index) in diasSemana"
                            :key="index"
                            class="pa-2 text-center font-weight-bold"
                            :style="{
                            width: '14.28%',
                            borderBottom: '2px solid #ddd',
                            color: diaSemana === 'Dom' ? 'red' : 'inherit',
                            }"
                        >
                            {{ diaSemana }}
                        </div>
                        </v-sheet>

                        <v-sheet class="d-flex flex-wrap">
                            <div
                                v-for="(dia, index) in datosMes"
                                :key="index"
                                class="pa-2"
                                :style="{
                                width: '14.28%',
                                border: '1px solid #ddd',
                                color: esFeriado(dia) || (dia && new Date(dia).getDay() === 0) ? 'red' : 'inherit',
                                flex: '0 0 14.28%' 
                                }"
                            >
                                <span v-if="dia">{{ dia.getDate() }}</span>
                                <span v-if="esFeriado(dia)" class="text-red--text">{{ obtenerNombreFeriado(dia) }}</span>
                                <v-list v-if="dia && getDayActivities(dia).length">
                                <v-list-item
                                    v-for="activity in getDayActivities(dia)"
                                    :key="activity.id"
                                >
                                    <v-list-item-content>
                                    <v-list-item-title>{{ activity.date.format('HH:mm') }} - {{ activity.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                </v-list>
                            </div>
                        </v-sheet>
                    </v-card>
                    </v-col>
                </v-row>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>
        
    
<script>
import moment from 'moment-timezone';
import Holidays from 'date-holidays';

export default {
  name: 'calendarioActividades',
  data() {
    const hd = new Holidays('CL'); // Instancia de date-holidays para Chile
    const currentYear = moment().tz('America/Santiago').year(); // Año actual basado en la zona horaria de Chile
    const holidays = hd.getHolidays(currentYear); // Obtenemos los feriados para el año actual

    return {
      fecha: moment().tz('America/Santiago').toDate(),
      selectedDate: moment().tz('America/Santiago').toDate(),
      activities: [
        {
          id: 1,
          title: 'GESTIÓN DE PROYECTO',
          date: moment.tz(
            `${currentYear}-10-15 11:00`,
            'YYYY-MM-DD HH:mm',
            'America/Santiago'
          ),
        },
        {
          id: 2,
          title: 'Atención telefónica',
          date: moment.tz(
            `${currentYear}-10-17 08:00`,
            'YYYY-MM-DD HH:mm',
            'America/Santiago'
          ),
        },
      ],
      holidays: holidays.map((holiday) => ({
        date: moment.tz(holiday.date, 'America/Santiago').toDate(),
        name: holiday.name,
      })),
      timeRemaining: '',
      diasSemana: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      nearestEvent: null,
      interval: null,
      drawer: false, // Estado del drawer lateral
      idiomas: [
        { title: 'Español' },
        { title: 'Inglés' },
        // Agrega más idiomas si es necesario
      ],
    };
  },
  computed: {
    mesActual() {
      return moment(this.fecha).tz('America/Santiago').format('MMMM YYYY');
    },
    datosMes() {
      const startOfMonth = moment(this.fecha)
        .tz('America/Santiago')
        .startOf('month');
      const endOfMonth = moment(this.fecha).tz('America/Santiago').endOf('month');
      const daysInMonth = endOfMonth.date();

      const startDayOfWeek = startOfMonth.day();
      const daysArray = [];

      for (let i = 0; i < startDayOfWeek; i++) {
        daysArray.push(null);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(
          moment
            .tz(this.fecha, 'America/Santiago')
            .date(i)
            .toDate()
        );
      }

      return daysArray;
    },
  },
  mounted() {
    this.actualizarFechaActual();
    this.findNextEvent();
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    iniciarTurno() {
      console.log('Turno iniciado');
      // Aquí puedes añadir la lógica para iniciar el turno.
    },
    actualizarFechaActual() {
      this.fecha = moment().tz('America/Santiago').toDate();
      this.selectedDate = this.fecha;
    },
    findNextEvent() {
      const now = moment().tz('America/Santiago');
      const upcomingEvents = this.activities.filter((activity) => {
        const activityTime = activity.date;
        return activityTime.isAfter(now);
      });

      if (upcomingEvents.length > 0) {
        upcomingEvents.sort((a, b) => a.date.diff(b.date));
        this.nearestEvent = upcomingEvents[0];
        this.actualizarCuentaRegresiva();
      } else {
        this.nearestEvent = null;
        this.timeRemaining = 'No hay eventos próximos.';
      }
    },
    actualizarCuentaRegresiva() {
      if (this.nearestEvent) {
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
          const now = moment().tz('America/Santiago');
          const eventTime = this.nearestEvent.date;
          const duration = moment.duration(eventTime.diff(now));

          if (duration.asMilliseconds() <= 0) {
            this.timeRemaining = '¡El evento ha comenzado!';
            clearInterval(this.interval);
            this.interval = null;
            this.findNextEvent(); // Busca el siguiente evento
          } else {
            this.timeRemaining = `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
          }
        }, 1000);
      } else {
        this.timeRemaining = 'No hay eventos próximos.';
      }
    },
    mesAnterior() {
      this.fecha = moment(this.fecha)
        .tz('America/Santiago')
        .subtract(1, 'months')
        .startOf('month')
        .toDate();
    },
    mesSiguiente() {
      this.fecha = moment(this.fecha)
        .tz('America/Santiago')
        .add(1, 'months')
        .startOf('month')
        .toDate();
    },
    esFeriado(dia) {
      return this.holidays.some((holiday) =>
        moment(holiday.date)
          .tz('America/Santiago')
          .isSame(moment(dia).tz('America/Santiago'), 'day')
      );
    },
    obtenerNombreFeriado(dia) {
      const holiday = this.holidays.find((holiday) =>
        moment(holiday.date)
          .tz('America/Santiago')
          .isSame(moment(dia).tz('America/Santiago'), 'day')
      );
      return holiday ? holiday.name : '';
    },
    getDayActivities(dia) {
      return this.activities.filter((activity) =>
        activity.date.isSame(moment(dia).tz('America/Santiago'), 'day')
      );
    },
  },
};
</script>

<style scoped>
.control-de-entrada {
  width: 85%;
  position: fixed;
  top: 70px;
  z-index: 50;
  left: 275px;
}

.control-de-calendario {
  width: 85%;
  position: fixed;
  top: 300px;
  z-index: 10;
  left: 275px;
}
</style>