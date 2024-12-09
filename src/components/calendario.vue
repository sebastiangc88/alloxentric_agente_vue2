<template>
  <v-app>
    <!-- Contenido Principal -->
    <v-main class="pt-15">
      <v-container fluid class="mx-8">
        <!-- Sección de Control de Entrada -->
        <v-card class="control-de-entrada mb-6 w-100%" outlined>
          <v-card-title class="text-h4 font-weight-bold text-[#008080] text-center">
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
                    {{ nearestEvent.fecha_inicio.format('HH:mm') }}
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
        <v-card class="control-de-calendario mb-6" outlined>
          <v-card-title class="font-weight-bold text-[#008080] text-center ml-0" :style="{ marginLeft: '640px', fontSize: '30px' }">
            Calendario de Actividades
          </v-card-title>
          <v-card-subtitle class="text-h5 font-weight-bold text-[#008080] text-center">
            {{ mesActual }}
          </v-card-subtitle>
          <v-sheet tile height="54" class="d-flex">
            <v-btn icon class="ma-2" @click="mesAnterior">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-2" @click="mesSiguiente">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-sheet>
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
          <v-sheet class="d-flex flex-wrap" :style="{ border: '2px solid #008080', borderRadius: '8px', padding: '10px', marginTop: '20px' }">
            <div
              v-for="(dia, index) in datosMes"
              :key="index"
              class="pa-4 d-flex align-center justify-center"
              :style="{
                width: '14.28%',
                height: '120px',
                border: '1px solid #ddd',
                color:
                  esFeriado(dia) || (dia && new Date(dia).getDay() === 0)
                    ? 'red'
                    : 'inherit',
              }"
            >
              <div class="text-center">
                <span v-if="dia" class="text-xl font-weight-bold">{{ dia.getDate() }}</span>
                <div v-if="esFeriado(dia)" class="mt-2 text-red--text">{{ obtenerNombreFeriado(dia) }}</div>
                <v-tooltip bottom v-if="getDayActivities(dia).length">
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on">
                    <span v-if="getDayActivities(dia).length > 0">
                      {{ getDayActivities(dia).length }} actividad(es)
                    </span>
                  </div>
                </template>
                <v-list class="mt-2">
                  <v-list-item v-for="activity in getDayActivities(dia)" :key="activity._id">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ obtenerHoraInicio(activity) }} - {{ activity.titulo }}
                      </v-list-item-title>
                      <v-list-item-subtitle v-if="activity.descripcion">
                        {{ activity.descripcion }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-tooltip>
              </div>
            </div>
          </v-sheet>
        </v-card>
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
    const hd = new Holidays('CL');
    const currentYear = moment().tz('America/Santiago').year();
    const holidays = hd.getHolidays(currentYear);

    return {
      fecha: moment().tz('America/Santiago').toDate(),
      selectedDate: moment().tz('America/Santiago').toDate(),
      activities: [],
      holidays: holidays.map((holiday) => ({
        date: moment.tz(holiday.date, 'America/Santiago').toDate(),
        name: holiday.name,
      })),
      timeRemaining: '',
      diasSemana: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      nearestEvent: null,
      interval: null,
      drawer: false,
    };
  },
  computed: {
    mesActual() {
      return moment(this.fecha).locale('es').tz('America/Santiago').format('MMMM YYYY');
    },
    datosMes() {
      const startOfMonth = moment(this.fecha).tz('America/Santiago').startOf('month');
      const endOfMonth = moment(this.fecha).tz('America/Santiago').endOf('month');
      const daysInMonth = endOfMonth.date();
      const firstDay = startOfMonth.day();

      const daysArray = [];

      for (let i = 0; i < firstDay; i++) {
        daysArray.push(null);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(startOfMonth.clone().add(i - 1, 'days').toDate());
      }

      return daysArray;
    },
  },
  mounted() {
    this.actualizarFechaActual();
    this.findNextEvent();
    this.fetchEvents();
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    iniciarTurno() {
      console.log('Turno iniciado');
    },
    actualizarFechaActual() {
      this.fecha = moment().tz('America/Santiago').toDate();
      this.selectedDate = this.fecha;
    },
    findNextEvent() {
      const now = moment().tz('America/Santiago');
      let upcomingEvents = this.activities.filter((activity) => {
        if (activity.tipo === 'oferta' && activity.horas_seleccionadas) {
          return activity.horas_seleccionadas.some(horario => {
            const [hour, minute] = horario.hora_inicio[0].split(':');
            const activityTime = moment(this.fecha)
              .tz('America/Santiago')
              .day(horario.dia)
              .set({ hour: parseInt(hour), minute: parseInt(minute) });
            return activityTime.isAfter(now);
          });
        } else {
          const activityTime = moment(activity.fecha_inicio).tz('America/Santiago');
          return activityTime.isAfter(now);
        }
      });

      if (upcomingEvents.length > 0) {
        upcomingEvents.sort((a, b) => {
          let aTime = moment(a.fecha_inicio).tz('America/Santiago');
          let bTime = moment(b.fecha_inicio).tz('America/Santiago');

          if (a.tipo === 'oferta' && a.horas_seleccionadas) {
            const horarioA = a.horas_seleccionadas.find(horario =>
              aTime.isSame(moment(this.fecha).day(horario.dia), 'day')
            );
            if (horarioA) {
              aTime = aTime.set({
                hour: horarioA.hora_inicio[0].split(':')[0],
                minute: horarioA.hora_inicio[0].split(':')[1]
              });
            }
          }

          if (b.tipo === 'oferta' && b.horas_seleccionadas) {
            const horarioB = b.horas_seleccionadas.find(horario =>
              bTime.isSame(moment(this.fecha).day(horario.dia), 'day')
            );
            if (horarioB) {
              bTime = bTime.set({
                hour: horarioB.hora_inicio[0].split(':')[0],
                minute: horarioB.hora_inicio[0].split(':')[1]
              });
            }
          }

          return aTime.diff(bTime);
        });
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

          let eventTime = moment(this.nearestEvent.fecha_inicio).tz('America/Santiago');
          if (this.nearestEvent.tipo === 'oferta' && this.nearestEvent.horas_seleccionadas) {
            const horario = this.nearestEvent.horas_seleccionadas.find(horario =>
              eventTime.isSame(moment(this.fecha).day(horario.dia), 'day')
            );
            if (horario) {
              eventTime = eventTime.set({
                hour: horario.hora_inicio[0].split(':')[0],
                minute: horario.hora_inicio[0].split(':')[1]
              });
            }
          }

          const duration = moment.duration(eventTime.diff(now));

          if (duration.asMilliseconds() <= 0) {
            this.timeRemaining = '¡El evento ha comenzado!';
            clearInterval(this.interval);
            this.interval = null;
            this.findNextEvent();
          } else {
            this.timeRemaining = `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
          }
        }, 1000);
      } else {
        this.timeRemaining = 'No hay eventos próximos.';
      }
    },
    mesAnterior() {
      this.fecha = moment(this.fecha).tz('America/Santiago').subtract(1, 'months').startOf('month').toDate();
      this.fetchEvents();
    },
    mesSiguiente() {
      this.fecha = moment(this.fecha).tz('America/Santiago').add(1, 'months').startOf('month').toDate();
      this.fetchEvents();
    },
    esFeriado(dia) {
      return this.holidays.some((holiday) =>
        moment(holiday.date).tz('America/Santiago').isSame(moment(dia).tz('America/Santiago'), 'day')
      );
    },
    obtenerNombreFeriado(dia) {
      const holiday = this.holidays.find((holiday) =>
        moment(holiday.date).tz('America/Santiago').isSame(moment(dia).tz('America/Santiago'), 'day')
      );
      return holiday ? holiday.name : '';
    },
    getDayActivities(dia) {
      console.log("Filtering activities for day:", dia);
      const actividadesDelDia = this.activities.filter((activity) => {
        const isSame = moment(activity.fecha_inicio).tz('America/Santiago').isSame(moment(dia).tz('America/Santiago'), 'day');
        console.log("Comparing activity date", activity.fecha_inicio, "with", dia, "result:", isSame);
        return isSame;
      });

      // Ordena las actividades por hora de inicio
      actividadesDelDia.sort((a, b) => moment(a.fecha_inicio).tz('America/Santiago').diff(moment(b.fecha_inicio).tz('America/Santiago')));

      return actividadesDelDia;
    },
    async fetchEvents() {
      try {
        const userId = localStorage.getItem('userID');
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:5001/api/calendario/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener eventos del calendario');
        }
        this.activities = await response.json();
        this.findNextEvent();
      } catch (error) {
        console.error(error);
      }
    },
    obtenerHoraInicio(activity) {
      return activity.horas_seleccionadas[0][0];
    }
  },
};
</script>

<style scoped>
.control-de-entrada {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  left: 100px;


}

.control-de-calendario {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #008080;
  border-radius: 8px;
  width: 90%;
  left: 100px;
}
.day-cell {
  overflow-y: auto;
}
</style>
