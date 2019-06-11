
int trigPin = 11;    // Trigger
int echoPin = 12;    // Echo
int trigPin2 = 2;
int echoPin2 = 3;
int pirState = LOW;
int val = 0;
long duration, cm, inches, duration2, cm2, inches2;
 
void setup() {
  Serial.begin (9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(13, OUTPUT);
  pinMode(10, OUTPUT);
}
 
void loop() {
  digitalWrite(13, HIGH);  // turn LED ON
  digitalWrite(10, HIGH);  // turn LED ON  
  measure();
  if((inches < 48 && inches > 42) || (inches2 < 48 && inches2 > 42)) {
    for(int i = 0; i < 25; i++) {
      delayMicroseconds(25);
      measure(); 
      if(!(inches < 48 && inches > 42) || !(inches2 < 48 && inches2 > 42)) { 
        break;  
      }          
    }
    digitalWrite(13, HIGH); 
    digitalWrite(10, HIGH); 
    delay(900);
    digitalWrite(13, LOW);  
    digitalWrite(10, LOW);
    delay(900);         
  } else if((inches <= 42 && inches > 30) || (inches2 <= 42 && inches2 > 30)) {
     for(int i = 0; i < 25; i++) {
      delayMicroseconds(25);
      measure(); 
      if(!(inches <= 42 && inches > 30) || !(inches2 <= 42 && inches2 > 30)) { 
        break;  
      }          
    }   
    digitalWrite(13, HIGH); 
    digitalWrite(10, HIGH); 
    delay(300);
    digitalWrite(13, LOW); 
    digitalWrite(10, LOW); 
    delay(300);        
  } else if((inches >= 16 && inches < 30) || (inches2 >= 16 && inches2 < 30)) {
     for(int i = 0; i < 25; i++) {
      delayMicroseconds(25);
      measure(); 
      if(!(inches >= 16 && inches < 30) || !(inches2 >= 16 && inches2 < 30)) { 
        break;  
      }          
    }   
    digitalWrite(13, HIGH); 
    digitalWrite(10, HIGH);  
    delay(100);
    digitalWrite(13, LOW);  
    digitalWrite(10, LOW);
    delay(100);   
  }
  digitalWrite(13, HIGH);  // turn LED ON
  digitalWrite(10, HIGH);  // turn LED ON 
  Serial.print(inches);
  Serial.print("in, ");
  Serial.print(inches2);
  Serial.print("in, ");
  Serial.println();
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
