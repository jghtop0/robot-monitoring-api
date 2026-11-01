#include <WiFi.h>
#include <HTTPClient.h>

// 실행 전에 본인의 Wi-Fi와 서버 주소로 변경하세요.
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "http://YOUR_SERVER_IP:3000/robots/1/telemetry";

const int SOIL_PIN = 34;

void setup() {
  Serial.begin(115200);

  // Station Mode로 Wi-Fi에 연결하고 최대 30회 대기합니다.
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 30) {
    delay(500);
    Serial.print(".");
    retry++;
  }
  Serial.println();

  if (WiFi.status() != WL_CONNECTED) {
    Serial.print("WiFi connection failed. Status: ");
    Serial.println(WiFi.status());
    return;
  }

  Serial.println("WiFi connected");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());

  // GPIO34의 실제 토양 수분 ADC 값을 읽습니다.
  int soilValue = analogRead(SOIL_PIN);
  Serial.print("Soil value: ");
  Serial.println(soilValue);

  // temperature와 humidity는 센서 측정값이 아닌 고정 예시값입니다.
  // soilMoisture만 실제 센서의 ADC 값입니다.
  String json = "{\"temperature\":24.8,\"humidity\":55.3,\"soilMoisture\":";
  json += String(soilValue);
  json += "}";

  Serial.print("Request JSON: ");
  Serial.println(json);

  // JSON 데이터를 NestJS Telemetry API로 한 번 전송합니다.
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(json);
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  Serial.print("Server response: ");
  if (httpResponseCode > 0) {
    Serial.println(http.getString());
  } else {
    Serial.println(HTTPClient::errorToString(httpResponseCode));
  }

  http.end();
}

void loop() {
  // 1회 전송 테스트이므로 반복 작업은 없습니다.
}
