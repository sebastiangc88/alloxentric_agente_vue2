require('dotenv').config();
console.log("Mongo URI:", process.env.MONGO_URI);
console.log("JWT Secret:", process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error de conexión:', error));

// Importar rutas
const faqRoutes = require('./routes/faqRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const agenteRoutes = require('./routes/agenteRoutes');
const ofertasRoutes = require('./routes/ofertasRoutes');
const calendarioRoutes = require('./routes/CalendarioRoutes'); // Asegúrate de que el archivo esté en minúsculas si así lo has nombrado
const pagosRoutes = require('./routes/pagosRoutes');
const solicitudRoutes = require('./routes/solicitudRoutes');
const evaluacionRoutes = require('./routes/EvaluacionRoutes');
const certificacionesRoutes = require('./routes/certificacionesRoutes');
const reporteRoutes = require('./routes/reporteRoutes'); // Importar las rutas del reporte




// Usar rutas
app.use('/api/soporte/faqs', faqRoutes);
app.use('/api/soporte/tickets', ticketRoutes);
app.use('/api/soporte', userRoutes);
app.use('/api/agentes', agenteRoutes);
app.use('/api/ofertas', ofertasRoutes);
app.use('/api/calendario', calendarioRoutes);
app.use('/api', pagosRoutes);
app.use('/api', solicitudRoutes);
app.use('/api/reportes', reporteRoutes); 
app.use('/api/evaluaciones', evaluacionRoutes);
app.use('/api/certificaciones', certificacionesRoutes);

module.exports = app;
