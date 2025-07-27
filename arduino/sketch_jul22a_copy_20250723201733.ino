#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>

// WiFi
const char* ssid = "Redmi Note 14";
const char* password = "unoalocho8";

// Web server
WebServer server(80);

// Pines de luces
#define PIN_COCINA    25
#define PIN_COMEDOR   33
#define PIN_SALA      26
#define PIN_BANO_P    27
#define PIN_VESTIDOR  16
#define PIN_RECAMARA  15
#define PIN_VEST2     14
#define PIN_BANO_S    12
#define PIN_RECAMARA2 13
#define PIN_BANO_V    32

// Servo para puerta
#define PIN_SERVO_PUERTA 17
Servo servoPuerta;

void setup() {
  Serial.begin(115200);

  // Pines de salida para luces
  pinMode(PIN_COCINA, OUTPUT);
  pinMode(PIN_COMEDOR, OUTPUT);
  pinMode(PIN_SALA, OUTPUT);
  pinMode(PIN_BANO_P, OUTPUT);
  pinMode(PIN_VESTIDOR, OUTPUT);
  pinMode(PIN_RECAMARA, OUTPUT);
  pinMode(PIN_VEST2, OUTPUT);
  pinMode(PIN_BANO_S, OUTPUT);
  pinMode(PIN_RECAMARA2, OUTPUT);
  pinMode(PIN_BANO_V, OUTPUT);

  // Iniciar WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConectado. IP:");
  Serial.println(WiFi.localIP());

  // Iniciar servo
  servoPuerta.attach(PIN_SERVO_PUERTA);
  servoPuerta.write(0);  // Puerta cerrada al inicio

  // Luces individuales
  server.on("/cocina/on",      []() { digitalWrite(PIN_COCINA, HIGH);  server.send(200, "text/plain", "Cocina ON"); });
  server.on("/cocina/off",     []() { digitalWrite(PIN_COCINA, LOW);   server.send(200, "text/plain", "Cocina OFF"); });

  server.on("/comedor/on",     []() { digitalWrite(PIN_COMEDOR, HIGH); server.send(200, "text/plain", "Comedor ON"); });
  server.on("/comedor/off",    []() { digitalWrite(PIN_COMEDOR, LOW);  server.send(200, "text/plain", "Comedor OFF"); });

  server.on("/sala/on",        []() { digitalWrite(PIN_SALA, HIGH);    server.send(200, "text/plain", "Sala ON"); });
  server.on("/sala/off",       []() { digitalWrite(PIN_SALA, LOW);     server.send(200, "text/plain", "Sala OFF"); });

  server.on("/banoprincipal/on",  []() { digitalWrite(PIN_BANO_P, HIGH); server.send(200, "text/plain", "Baño Principal ON"); });
  server.on("/banoprincipal/off", []() { digitalWrite(PIN_BANO_P, LOW);  server.send(200, "text/plain", "Baño Principal OFF"); });

  server.on("/vestidor/on",    []() { digitalWrite(PIN_VESTIDOR, HIGH); server.send(200, "text/plain", "Vestidor ON"); });
  server.on("/vestidor/off",   []() { digitalWrite(PIN_VESTIDOR, LOW);  server.send(200, "text/plain", "Vestidor OFF"); });

  server.on("/recamarasecundaria/on",  []() { digitalWrite(PIN_RECAMARA, HIGH); server.send(200, "text/plain", "Recámara Secundaria ON"); });
  server.on("/recamarasecundaria/off", []() { digitalWrite(PIN_RECAMARA, LOW);  server.send(200, "text/plain", "Recámara Secundaria OFF"); });

  server.on("/recamaraprincipal/on",   []() { digitalWrite(PIN_RECAMARA2, HIGH); server.send(200, "text/plain", "Recámara Principal ON"); });
  server.on("/recamaraprincipal/off",  []() { digitalWrite(PIN_RECAMARA2, LOW); server.send(200, "text/plain", "Recámara Principal OFF"); });

  server.on("/banovisitas/on",   []() { digitalWrite(PIN_BANO_V, HIGH); server.send(200, "text/plain", "Baño visitas ON"); });
  server.on("/banovisitas/off",  []() { digitalWrite(PIN_BANO_V, LOW); server.send(200, "text/plain", "Baño visitas OFF"); });

  server.on("/vestidorsecundario/on",  []() { digitalWrite(PIN_VEST2, HIGH); server.send(200, "text/plain", "Vestidor Secundario ON"); });
  server.on("/vestidorsecundario/off", []() { digitalWrite(PIN_VEST2, LOW);  server.send(200, "text/plain", "Vestidor Secundario OFF"); });

  server.on("/banosecundario/on",  []() { digitalWrite(PIN_BANO_S, HIGH); server.send(200, "text/plain", "Baño Secundario ON"); });
  server.on("/banosecundario/off", []() { digitalWrite(PIN_BANO_S, LOW);  server.send(200, "text/plain", "Baño Secundario OFF"); });

  // Ambiente completo
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

  // Puerta con servomotor
  server.on("/puerta/abrir", []() {
    servoPuerta.write(90);  // Abrir la puerta
    server.send(200, "text/plain", "Puerta abierta");
  });

  server.on("/puerta/cerrar", []() {
    servoPuerta.write(0);   // Cerrar la puerta
    server.send(200, "text/plain", "Puerta cerrada");
  });

  server.begin();
  Serial.println("Servidor HTTP iniciado.");
}

void loop() {
  server.handleClient();
}