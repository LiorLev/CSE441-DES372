
int trigPin = 11;    // Trigger
int echoPin = 12;    // Echo
int trigPin2 = 9;
int echoPin2 = 10;
int motion = 6;
int val = 0;
int light2 = 2;
int light3 = 3;
int light4 = 4;
int light5 = 5;
long duration, cm, inches, duration2, cm2, inches2;

void setup() {
  Serial.begin (9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(light2, OUTPUT);
  pinMode(light3, OUTPUT);
  pinMode(light4, OUTPUT);
  pinMode(light5, OUTPUT);
  pinMode(motion, INPUT);
}

void lightsOn() {
  digitalWrite(light2, HIGH);
  digitalWrite(light3, HIGH);
  digitalWrite(light4, HIGH);
  digitalWrite(light5, HIGH);
}

void lightsOff() {
  digitalWrite(light2, LOW);
  digitalWrite(light3, LOW);
  digitalWrite(light4, LOW);
  digitalWrite(light5, LOW); 
}

void loop() {
  lightsOn();
  val = digitalRead(motion);
  inches = 10000;
  inches = 10000;
  if(val == HIGH) {
    motionSensed();
  }
  if(((inches > 24 && inches2 > 24)) && (inches < 60 && inches2 < 60)) {
    if((inches < 60 && inches > 50) || (inches2 < 60 && inches2 > 50) && !(inches < 24 && inches2 < 24)) {
      while((inches < 60 && inches > 50) || (inches2 < 60 && inches2 > 50)) {
        printDistances();
        lightsOn();
        delay(600);
        lightsOff();
        delay(600);
        val = digitalRead(motion);
        if(val == HIGH) {
          motionSensed();
        } else {
          inches = 10000;
          inches2 = 10000;
          break;
        }
      }
    } else if((inches <= 50 && inches > 40) || (inches2 <= 50 && inches2 > 40) && !(inches < 24 && inches2 < 24)) {
      while((inches <= 50 && inches > 40) || (inches2 <= 50 && inches2 > 40)) {
        printDistances();
        lightsOn();
        delay(100);
        lightsOff();
        delay(100);
        val = digitalRead(motion);
        if(val == HIGH) {
          motionSensed();
        } else {
          inches = 10000;
          inches2 = 10000;
          break;
        }
      }
    } else if((inches >= 24 && inches < 40) || (inches2 >= 24 && inches2 < 40) && !(inches < 24 && inches2 < 24)) {
      while((inches >= 24 && inches < 40) || (inches2 >= 24 && inches2 < 40)) {
        printDistances();
        lightsOn();
        delay(25);
        lightsOff();
        delay(25);
        val = digitalRead(motion);
        if(val == HIGH) {
          motionSensed();
        } else {
          inches = 10000;
          inches2 = 10000;
          break;
        }
      }
    }
  }
  lightsOn();
}

void printDistances() {
  Serial.print(inches);
  Serial.print("in, ");
  Serial.print(inches2);
  Serial.print("in, ");
  Serial.println();
}

void motionSensed() {
  int farthestInches = -1;
  int farthestInches2 = -1;
//  for(int i = 0; i < 2; i++) {
    measure();
//    if(inches > farthestInches) {
//      farthestInches = inches;
//    }
//    if(inches2 > farthestInches2) {
//      farthestInches2 = inches2;
//    }
//    delayMicroseconds(5);
//  }
//22
  if(inches < 24 || inches2 < 24) {
    inches = 10000;
    inches2 = 10000;
    return;
  }
  if(inches >= 60 || inches2 >= 60) {
    inches = 10000;
    inches2 = 10000;
    return;
  }
}

void measure() {
  digitalWrite(trigPin, LOW);
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  pinMode(echoPin2, INPUT);
  duration2 = pulseIn(echoPin2, HIGH);
  inches = (duration/2) / 74;   // Divide by 74 or multiply by 0.0135
  inches2 = (duration2/2) / 74;   // Divide by 74 or multiply by 0.0135
}
