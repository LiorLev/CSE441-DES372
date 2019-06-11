
/* A simple program to sequentially turn on and turn off 3 LEDs */ 

int LED1 = 13;
int LED2 = 12;
int LED3 = 11;
int inputPin1 = 2;
int inputPin2 = 3;
int pirState = LOW;
int val1 = 0;
int val2 = 0;
void setup() {
   pinMode(LED1, OUTPUT);
   pinMode(LED2, OUTPUT);
   pinMode(LED3, OUTPUT);
   pinMode(inputPin1, INPUT);     // declare sensor as input
   pinMode(inputPin2, INPUT);     // declare sensor as input
   Serial.begin(9600);
}

void loop() {
    // check if the input is HIGH
    digitalWrite(LED1, HIGH);  // turn LED ON
    digitalWrite(LED2, HIGH);  // turn LED ON
    digitalWrite(LED3, HIGH);  // turn LED ON
}
