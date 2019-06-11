
int trigPin = 11;    // Trigger
int echoPin = 12;    // Echo
int trigPin2 = 9;
int echoPin2 = 10;
int motion = 6;
int motion2 = 7;
int val = 0;
int val2 = 0;
long duration, cm, inches, duration2, cm2, inches2;
 
void setup() {
  Serial.begin (9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(2, OUTPUT);
  pinMode(motion, INPUT);
  pinMode(motion2, INPUT);
}
 
void loop() {
  digitalWrite(2, HIGH);  // turn LED ON
  measure();
  val = digitalRead(motion);
  val2 = digitalRead(motion2);
  while(true) {
    if(inches >= 100 && inches2 >= 100) {
      while(inches >= 100 && inches2 >= 100) {
        digitalWrite(2, HIGH); 
        measure();     
      }     
    } else if(((inches < 84 && inches > 60) || (inches2 < 84 && inches2 > 60)) && (val == HIGH && val2 == HIGH)) {
      while(((inches < 84 && inches > 60) || (inches2 < 84 && inches2 > 60)) && (val == HIGH && val2 == HIGH)) {
        digitalWrite(2, HIGH); 
        delay(600);
        digitalWrite(2, LOW);  
        delay(600); 
        measure();
        val = digitalRead(motion);
        val2 = digitalRead(motion2);
      }        
    } else if(((inches <= 60 && inches > 36) || (inches2 <= 60 && inches2 > 36)) && (val == HIGH && val2 == HIGH)) {  
      while(((inches <= 60 && inches > 36) || (inches2 <= 60 && inches2 > 36)) && (val == HIGH && val2 == HIGH)) {
        digitalWrite(2, HIGH); 
        delay(200);
        digitalWrite(2, LOW); 
        delay(200);
        measure();
        val = digitalRead(motion);
        val2 = digitalRead(motion2);
      }        
    } else if(((inches >= 16 && inches < 36) || (inches2 >= 16 && inches2 < 36)) && (val == HIGH && val2 == HIGH)) {  
      while(((inches >= 16 && inches < 36) || (inches2 >= 16 && inches2 < 36))  && (val == HIGH && val2 == HIGH)) {
        digitalWrite(2, HIGH); 
        delay(25);
        digitalWrite(2, LOW);  
        delay(25);
        measure();
        val = digitalRead(motion);
        val2 = digitalRead(motion2);      
      }
    } else if(inches < 16 || inches2 < 16) {
         while (inches < 16 || inches2 < 16) {
          digitalWrite(2, HIGH); 
          measure();    
         }
      }
    digitalWrite(2, HIGH);  // turn LED ON
    Serial.print(inches);
    Serial.print("in, ");
    Serial.print(inches2);
    Serial.print("in, ");
    Serial.println();
    if(val == HIGH && val2 == HIGH) {
      Serial.println(val);
      Serial.println(val2);
    }
    val = digitalRead(motion);
    val2 = digitalRead(motion2); 
    measure();
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
