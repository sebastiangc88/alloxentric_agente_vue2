<template>
    <v-app>
      
      <!-- Contenido Principal -->
      <v-main class="pt-15">
        <v-container fluid>
    
             
           <!-- Sección de Control de Entrada -->
    <!-- Sección de Control de Entrada -->
    <v-card class="control-de-entrada mb-6 w-100%" outlined>
        <v-card-title class="text-h5 font-weight-bold text-[#008080]">Control de Entrada</v-card-title>
        <v-card-text>
        <v-row align="center" justify="center">
            <v-col cols="12" md="4" class="text-center">
            <v-icon color="#008080" size="48">mdi-clock-outline</v-icon>
            <span class="text-h4 font-weight-bold ml-2">
                {{ timeRemaining ? timeRemaining : 'Calculando...' }}
            </span>
            </v-col>
    
            <v-col cols="12" md="8">
            <p><strong>Próximo Evento:</strong> 
                <span> {{this.activities[1].title}} </span> 
            </p>
            <p><strong>Horario:</strong> 
                <span v-if="nearestEvent">
                {{ moment(nearestEvent.date).format('HH:mm') }}
                </span>
                <span v-else>--:--</span>
            </p>
            </v-col>
        </v-row>
    
        <v-btn color="black" dark block @click="iniciarTurno">
            Iniciar Turno
        </v-btn>
        </v-card-text>
    </v-card>
    
    
    
        
                <div class="control-de-calendario">
                <h1 class=" text-3xl font-bold mb-6 text-[#008080]" >Calendario de Actividades</h1>
                <v-row>
                <v-col cols="12" md="12">
                    <v-card>
                    <v-card-title class=" justify-space-between">
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
        :style="{ width: '14.28%', borderBottom: '2px solid #ddd', color: diaSemana === 'Dom' ? 'red' : 'inherit' }"
        >
        {{ diaSemana }}
        </div>
    </v-sheet>
    
                    <!-- Mostrar los días del mes -->
                    <v-sheet class="d-flex flex-wrap">
                        <div 
        v-for="(dia, index) in datosMes" 
        :key="index" 
        class="pa-2" 
        :style="{ 
            width: '14.28%', 
            border: '4px solid #ddd', 
            color: esFeriado(dia) || (dia && new Date(dia).getDay() === 0) ? 'red' : 'inherit' 
        }"
        >
                        <span v-if="dia">{{ dia.getDate() }}</span>
                        <span v-if="esFeriado(dia)" class="text-red--text">{{ obtenerNombreFeriado(dia) }}</span>
                        <v-list v-if="dia && getDayActivities(dia).length">
                            <v-list-item v-for="activity in getDayActivities(dia)" :key="activity.id">
                            <v-list-item-content>
                                <v-list-item-title>{{ activity.time }} - {{ activity.title }}</v-list-item-title>
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
        x
        
    
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
            // Usamos la fecha actual del sistema y la ajustamos a la zona horaria de Chile
            fecha: moment().tz('America/Santiago').toDate(),
            selectedDate: moment().tz('America/Santiago').toDate(),
            activities: [
            { 
            id: 1, 
            title: "GESTION DE PROYECTO", 
            date: moment.tz(`${currentYear}-10-15`, 'America/Santiago').toDate(), 
            time: "11:00 AM" 
            },
            { 
            id: 2, 
            title: "Atencion telefonica", 
            date: moment.tz(`${currentYear}-10-17`, 'America/Santiago').toDate(), 
            time: "8:00 AM" 
            }
        ],
            holidays: holidays.map(holiday => ({
                date: moment.tz(holiday.date, 'America/Santiago').toDate(),
                name: holiday.name
            })),
            
            timeRemaining: '',
            diasSemana: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
            };
        },
        computed: {
            mesActual() {
            return moment(this.fecha).tz('America/Santiago').format('MMMM YYYY');
            },
            datosMes() {
            const startOfMonth = moment(this.fecha).tz('America/Santiago').startOf('month');
            const endOfMonth = moment(this.fecha).tz('America/Santiago').endOf('month');
            const daysInMonth = endOfMonth.date();
            
            // Obtener el índice del día de la semana en el que comienza el mes (0 = Domingo, 1 = Lunes, etc.)
            const startDayOfWeek = startOfMonth.day();
            
            // Generar un arreglo que incluya días vacíos al inicio para alinear correctamente
            const daysArray = [];
    
            // Agregar días vacíos al principio del arreglo si el primer día del mes no es lunes
            for (let i = 0; i < startDayOfWeek; i++) {
                daysArray.push(null);
            }
    
            // Llenar el resto del arreglo con los días reales del mes
            for (let i = 1; i <= daysInMonth; i++) {
                daysArray.push(moment.tz(this.fecha, 'America/Santiago').date(i).toDate());
            }
    
            return daysArray;
            }
        },
        mounted() {
            // Sincronizamos la fecha actual con la zona horaria de Chile en tiempo real al montar el componente
            this.actualizarFechaActual();
            this.encontrarEventoConID(2);
        },
        methods: {
            iniciarTurno() {
        console.log('Turno iniciado');
        // Aquí puedes añadir la lógica para iniciar el turno.
        },
            actualizarFechaActual() {
            // Actualiza la fecha actual del sistema a la zona horaria de Chile
            this.fecha = moment().tz('America/Santiago').toDate();
            this.selectedDate = this.fecha;
            },
            methods: {
            encontrarEventoConID(id) {
        const event = this.activities.find(activity => activity.id === id);
        if (event) {
        this.nearestEvent = event;
        this.$forceUpdate(); 
        this.actualizarCuentaRegresiva();
        } else {
        console.warn(`No se encontró un evento con ID: ${id}`);
        }
    },
        actualizarCuentaRegresiva() {
        if (this.nearestEvent) {
            const interval = setInterval(() => {
            const now = moment().tz('America/Santiago');
            const eventTime = moment(this.nearestEvent.date);
            const duration = moment.duration(eventTime.diff(now));
    
            if (duration.asMilliseconds() <= 0) {
                this.timeRemaining = "¡El evento ha comenzado!";
                clearInterval(interval);
            } else {
                this.timeRemaining = `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
            }
            }, 1000);
        } else {
            this.timeRemaining = "No hay eventos próximos.";
        }
        }
    },
    
            mesAnterior() {
            this.fecha = moment(this.fecha).tz('America/Santiago').subtract(1, 'months').startOf('month').toDate();
            },
            mesSiguiente() {
            this.fecha = moment(this.fecha).tz('America/Santiago').add(1, 'months').startOf('month').toDate();
            },
            esFeriado(dia) {
            return this.holidays.some(holiday => moment(holiday.date).tz('America/Santiago').isSame(moment(dia).tz('America/Santiago'), 'day'));
            },
            obtenerNombreFeriado(dia) {
            const holiday = this.holidays.find(holiday => moment(holiday.date).tz('America/Santiago').isSame(moment(dia).tz('America/Santiago'), 'day'));
            return holiday ? holiday.name : '';
            },
            getDayActivities(dia) {
            return this.activities.filter(activity => moment(activity.date).tz('America/Santiago').isSame(moment(dia).tz('America/Santiago'), 'day'));
            }
        }
        };
    </script>
    
    
    
        <style scoped>
        /* Se asegura que la barra lateral comience justo debajo del encabezado */
    
        /* Estilo para el encabezado (v-toolbar) */
        
    
    .control-de-entrada {
        width: 85%;
        position: fixed; /* Si quieres que esté fijo en la pantalla */
        top: 70px; /* Ajusta el valor según la posición que desees en la pantalla */
        z-index: 50; /* Valor ajustado para el orden de apilamiento */
        left: 275px; /* Para alinear al borde izquierdo */
    }
    
    .control-de-calendario {
        width: 85%;
        position: fixed; /* Si quieres que esté fijo en la pantalla */
        top: 300px; /* Ajusta el valor según la posición que desees en la pantalla */
        z-index: 10; /* Valor ajustado para el orden de apilamiento */
        left: 275px; /* Para alinear al borde izquierdo */
    }
    
    
    
    
        </style>