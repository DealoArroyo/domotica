
#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>
#include <SinricPro.h>
#include <SinricProSwitch.h>

// ------------------- WiFi -------------------
const char* ssid = "IZZI-7EA3_plus";
const char* password = "Encuentro12";

// ------------------- Sinric Pro -------------------
#define APP_KEY     "4662f993-966b-4e65-ab5d-b576cca0a62d"
#define APP_SECRET  "b4605b68-b0e8-45b9-9496-f8e4c9486586-5319f126-55c8-42d7-91e0-93000e4bbcad"

#define DEVICE_COCINA       "68919314678c5bc9ab260143"
#define DEVICE_COMEDOR      "68919782678c5bc9ab2602d1"
#define DEVICE_SALA         "DEVICE_ID_SALA"
#define DEVICE_BANO_P       "689193dbddd2551252bd24af"
#define DEVICE_VESTIDOR     "DEVICE_ID_VESTIDOR"
#define DEVICE_RECAMARA     "DEVICE_ID_RECAMARA"
#define DEVICE_VEST2        "DEVICE_ID_VEST2"
#define DEVICE_BANO_S       "DEVICE_ID_BANO_S"
#define DEVICE_RECAMARA2    "689197cf678c5bc9ab260302"
#define DEVICE_BANO_V       "DEVICE_ID_BANO_V"
#define DEVICE_BUZZER       "DEVICE_ID_BUZZER"
#define DEVICE_PUERTA       "6891939d7104f15ae53367d4"

// ------------------- Pines -------------------
#define PIN_COCINA     25
#define PIN_COMEDOR    33
#define PIN_SALA       26
#define PIN_BANO_P     16
#define PIN_VESTIDOR   15
#define PIN_RECAMARA   27
#define PIN_VEST2      12
#define PIN_BANO_S     14
#define PIN_RECAMARA2  13
#define PIN_BANO_V     32
#define PIN_HUMEDAD    35
#define PIN_BUZZER     19
#define PIN_SERVO_PUERTA 17

// ------------------- Objetos y variables -------------------
WebServer server(80);
Servo servoPuerta;

unsigned long previousHumedadMillis = 0;
const unsigned long intervaloHumedad = 2000;
int porcentajeHumedad = 0;
bool alarmaActiva = false;
int pasoAlarma = 0;
unsigned long tiempoAlarma = 0;
int repeticiones = 1;

// ------------------- Funciones comunes -------------------
void controlarDispositivo(int pin, bool estado) {
  digitalWrite(pin, estado ? HIGH : LOW);
}

bool onPowerState(const String &deviceId, bool &state) {
  if (deviceId == DEVICE_COCINA) controlarDispositivo(PIN_COCINA, state);
  else if (deviceId == DEVICE_COMEDOR) controlarDispositivo(PIN_COMEDOR, state);
  else if (deviceId == DEVICE_SALA) controlarDispositivo(PIN_SALA, state);
  else if (deviceId == DEVICE_BANO_P) controlarDispositivo(PIN_BANO_P, state);
  else if (deviceId == DEVICE_VESTIDOR) controlarDispositivo(PIN_VESTIDOR, state);
  else if (deviceId == DEVICE_RECAMARA) controlarDispositivo(PIN_RECAMARA, state);
  else if (deviceId == DEVICE_RECAMARA2) controlarDispositivo(PIN_RECAMARA2, state);
  else if (deviceId == DEVICE_BANO_V) controlarDispositivo(PIN_BANO_V, state);
  else if (deviceId == DEVICE_VEST2) controlarDispositivo(PIN_VEST2, state);
  else if (deviceId == DEVICE_BANO_S) controlarDispositivo(PIN_BANO_S, state);
  else if (deviceId == DEVICE_BUZZER) controlarDispositivo(PIN_BUZZER, state);
  else if (deviceId == DEVICE_PUERTA) {
    servoPuerta.write(state ? 90 : 0);
  }
  return true;
}

void setupSinric() {
  SinricProSwitch& cocina = SinricPro[DEVICE_COCINA]; cocina.onPowerState(onPowerState);
  SinricProSwitch& comedor = SinricPro[DEVICE_COMEDOR]; comedor.onPowerState(onPowerState);
  SinricProSwitch& sala = SinricPro[DEVICE_SALA]; sala.onPowerState(onPowerState);
  SinricProSwitch& banoP = SinricPro[DEVICE_BANO_P]; banoP.onPowerState(onPowerState);
  SinricProSwitch& vestidor = SinricPro[DEVICE_VESTIDOR]; vestidor.onPowerState(onPowerState);
  SinricProSwitch& recamara = SinricPro[DEVICE_RECAMARA]; recamara.onPowerState(onPowerState);
  SinricProSwitch& recamara2 = SinricPro[DEVICE_RECAMARA2]; recamara2.onPowerState(onPowerState);
  SinricProSwitch& banoV = SinricPro[DEVICE_BANO_V]; banoV.onPowerState(onPowerState);
  SinricProSwitch& vest2 = SinricPro[DEVICE_VEST2]; vest2.onPowerState(onPowerState);
  SinricProSwitch& banoS = SinricPro[DEVICE_BANO_S]; banoS.onPowerState(onPowerState);
  SinricProSwitch& buzzer = SinricPro[DEVICE_BUZZER]; buzzer.onPowerState(onPowerState);
  SinricProSwitch& puerta = SinricPro[DEVICE_PUERTA]; puerta.onPowerState(onPowerState);

  SinricPro.begin(APP_KEY, APP_SECRET);
  SinricPro.restoreDeviceStates(true);
}

void setupServidorReactNative() {
  server.on("/cocina/on", []() { digitalWrite(PIN_COCINA, HIGH); server.send(200, "text/plain", "Cocina ON"); });
  server.on("/cocina/off", []() { digitalWrite(PIN_COCINA, LOW); server.send(200, "text/plain", "Cocina OFF"); });

  server.on("/comedor/on", []() { digitalWrite(PIN_COMEDOR, HIGH); server.send(200, "text/plain", "Comedor ON"); });
  server.on("/comedor/off", []() { digitalWrite(PIN_COMEDOR, LOW); server.send(200, "text/plain", "Comedor OFF"); });

  server.on("/sala/on", []() { digitalWrite(PIN_SALA, HIGH); server.send(200, "text/plain", "Sala ON"); });
  server.on("/sala/off", []() { digitalWrite(PIN_SALA, LOW); server.send(200, "text/plain", "Sala OFF"); });

  server.on("/banoprincipal/on", []() { digitalWrite(PIN_BANO_P, HIGH); server.send(200, "text/plain", "Baño Principal ON"); });
  server.on("/banoprincipal/off", []() { digitalWrite(PIN_BANO_P, LOW); server.send(200, "text/plain", "Baño Principal OFF"); });

  server.on("/vestidor/on", []() { digitalWrite(PIN_VESTIDOR, HIGH); server.send(200, "text/plain", "Vestidor ON"); });
  server.on("/vestidor/off", []() { digitalWrite(PIN_VESTIDOR, LOW); server.send(200, "text/plain", "Vestidor OFF"); });

  server.on("/recamarasecundaria/on", []() { digitalWrite(PIN_RECAMARA, HIGH); server.send(200, "text/plain", "Recámara Secundaria ON"); });
  server.on("/recamarasecundaria/off", []() { digitalWrite(PIN_RECAMARA, LOW); server.send(200, "text/plain", "Recámara Secundaria OFF"); });

  server.on("/recamaraprincipal/on", []() { digitalWrite(PIN_RECAMARA2, HIGH); server.send(200, "text/plain", "Recámara Principal ON"); });
  server.on("/recamaraprincipal/off", []() { digitalWrite(PIN_RECAMARA2, LOW); server.send(200, "text/plain", "Recámara Principal OFF"); });

  server.on("/banovisitas/on", []() { digitalWrite(PIN_BANO_V, HIGH); server.send(200, "text/plain", "Baño visitas ON"); });
  server.on("/banovisitas/off", []() { digitalWrite(PIN_BANO_V, LOW); server.send(200, "text/plain", "Baño visitas OFF"); });

  server.on("/vestidorsecundario/on", []() { digitalWrite(PIN_VEST2, HIGH); server.send(200, "text/plain", "Vestidor Secundario ON"); });
  server.on("/vestidorsecundario/off", []() { digitalWrite(PIN_VEST2, LOW); server.send(200, "text/plain", "Vestidor Secundario OFF"); });

  server.on("/banosecundario/on", []() { digitalWrite(PIN_BANO_S, HIGH); server.send(200, "text/plain", "Baño Secundario ON"); });
  server.on("/banosecundario/off", []() { digitalWrite(PIN_BANO_S, LOW); server.send(200, "text/plain", "Baño Secundario OFF"); });

  server.on("/ambiente/on", []() {
    digitalWrite(PIN_COCINA, HIGH);
    digitalWrite(PIN_COMEDOR, HIGH);
    digitalWrite(PIN_SALA, HIGH);
    server.send(200, "text/plain", "Ambiente ON");
  });
  server.on("/ambiente/off", []() {
    digitalWrite(PIN_COCINA, LOW);
    digitalWrite(PIN_COMEDOR, LOW);
    digitalWrite(PIN_SALA, LOW);
    server.send(200, "text/plain", "Ambiente OFF");
  });

  server.on("/puerta/abrir", []() { servoPuerta.write(90); server.send(200, "text/plain", "Puerta abierta"); });
  server.on("/puerta/cerrar", []() { servoPuerta.write(0); server.send(200, "text/plain", "Puerta cerrada"); });

  server.on("/humedad", []() {
    server.send(200, "text/plain", String(porcentajeHumedad) + " %");
  });

  server.begin();
}

// ------------------- SETUP -------------------
void setup() {
  Serial.begin(115200);
  pinMode(PIN_COCINA, OUTPUT); pinMode(PIN_COMEDOR, OUTPUT); pinMode(PIN_SALA, OUTPUT);
  pinMode(PIN_BANO_P, OUTPUT); pinMode(PIN_VESTIDOR, OUTPUT); pinMode(PIN_RECAMARA, OUTPUT);
  pinMode(PIN_VEST2, OUTPUT); pinMode(PIN_BANO_S, OUTPUT); pinMode(PIN_RECAMARA2, OUTPUT);
  pinMode(PIN_BANO_V, OUTPUT); pinMode(PIN_BUZZER, OUTPUT);

  servoPuerta.attach(PIN_SERVO_PUERTA);
  servoPuerta.write(0);

  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\nWiFi conectado. IP: " + WiFi.localIP().toString());

  setupServidorReactNative();
  setupSinric();
}

// ------------------- LOOP -------------------
void loop() {
  server.handleClient();
  SinricPro.handle();

  unsigned long currentMillis = millis();

  if (currentMillis - previousHumedadMillis >= intervaloHumedad && !alarmaActiva) {
    previousHumedadMillis = currentMillis;
    int valorHumedad = analogRead(PIN_HUMEDAD);
    porcentajeHumedad = map(valorHumedad, 4095, 0, 0, 100);

    Serial.print("Humedad (%): ");
    Serial.println(porcentajeHumedad);

    if (porcentajeHumedad >= 95) {
      alarmaActiva = true;
      pasoAlarma = 0;
      repeticiones = 1;
      tiempoAlarma = currentMillis;
    } else {
      noTone(PIN_BUZZER);
    }
  }

  if (alarmaActiva) {
    switch (pasoAlarma) {
      case 0:
        tone(PIN_BUZZER, 1000, 100);
        tiempoAlarma = currentMillis;
        pasoAlarma = 1;
        break;
      case 1:
        if (currentMillis - tiempoAlarma >= 150) {
          pasoAlarma = 2;
          tiempoAlarma = currentMillis;
        }
        break;
      case 2:
        tone(PIN_BUZZER, 1000, 200);
        pasoAlarma = 3;
        tiempoAlarma = currentMillis;
        break;
      case 3:
        if (currentMillis - tiempoAlarma >= 1000) {
          if (repeticiones < 3) {
            repeticiones++;
            pasoAlarma = 0;
          } else {
            noTone(PIN_BUZZER);
            alarmaActiva = false;
          }
        }
        break;
    }
  }
}
