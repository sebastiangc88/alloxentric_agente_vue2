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
          <h2 class ="text-h5 font-weight-bold text-[#008080] ">
            {{ mesActual }} <!-- Mostrar el mes en grande aquí -->
          </h2>
          <v-sheet tile height="54" class="d-flex">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select
              v-model="type"
              :items="types"
              dense
              outlined
              hide-details
              class="ma-2"
              label="Tipo"
            ></v-select>
            <v-select
              v-model="mode"
              :items="modes"
              dense
              outlined
              hide-details
              label="Modo de Superposición de Eventos"
              class="ma-2"
            ></v-select>
            <v-select
              v-model="weekday"
              :items="weekdays"
              dense
              outlined
              hide-details
              label="Días de la Semana"
              class="ma-2"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :type="type"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="getEvents"
            ></v-calendar>
          </v-sheet>
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
      tipos: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Dom - Sáb', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Lun - Dom', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Lun - Vie', value: [1, 2, 3, 4, 5] },
        { text: 'Lun, Mié, Vie', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1',
      ],
      names: [
        'Reunión',
        'Feriado',
        'Días libres',
        'Viaje',
        'Evento',
        'Cumpleaños',
        'Conferencia',
        'Fiesta',
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
          moment.tz(this.fecha, 'America/Santiago').date(i).toDate()
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
            this.findNextEvent(); // Buscar el próximo evento
          } else {
            this.timeRemaining = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
          }
        }, 1000);
      }
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style scoped>
.control-de-entrada {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
}

.control-de-calendario {
  margin-top: 20px;
}
</style>
