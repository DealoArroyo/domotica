require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/led', async (req, res) => {
  const { state } = req.body; // "on" o "off"

  if (!['on', 'off'].includes(state)) {
    return res.status(400).json({ error: 'Estado inválido, usa "on" o "off"' });
  }

  try {
    const esp32IP = process.env.ESP32_IP;
    await axios.get(`http://${esp32IP}/led?state=${state}`);

    res.json({ message: `LED ${state === 'on' ? 'encendido' : 'apagado'}` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'No se pudo contactar al ESP32' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
