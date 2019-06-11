
/* A simple program to sequentially turn on and turn off 3 LEDs */ 

int LED1 = 2;
//int LED2 = 12;
//int LED3 = 11;
int inputPin1 = 6;
int inputPin2 = 7;
int pirState = LOW;
int val1 = 0;
int val2 = 0;
void setup() {
   pinMode(LED1, OUTPUT);
//   pinMode(LED2, OUTPUT);
//   pinMode(LED3, OUTPUT);
   pinMode(inputPin1, INPUT);     // declare sensor as input
   pinMode(inputPin2, INPUT);     // declare sensor as input
   Serial.begin(9600);
}

void loop() {
  val1 = digitalRead(inputPin1);  // read input value
  val2 = digitalRead(inputPin2);  // read input value
  if (val1 == HIGH || val2 == HIGH) { 
    // check if the input is HIGH
    digitalWrite(LED1, HIGH);  // turn LED ON
//    digitalWrite(LED2, HIGH);  // turn LED ON
//    digitalWrite(LED3, HIGH);  // turn LED ON
    if (pirState == LOW) {
      // we have just turned on
      Serial.println("Motion detected!");
      // We only want to print on the output change, not state
      pirState = HIGH;
    }
  } else {
    digitalWrite(LED1, LOW);  // turn LED OFF
//    digitalWrite(LED2, LOW);  // turn LED OFF
//    digitalWrite(LED3, LOW);  // turn LED OFF
    if (pirState == HIGH){
      // we have just turned of
      Serial.println("Motion ended!");
      // We only want to print on the output change, not state
      pirState = LOW;
    }
  }
}
