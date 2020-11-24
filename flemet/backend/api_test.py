from twilio.rest import Client 
 
account_sid = 'ACb59160fe2c25c2b8764ed52d4da786a3' 
auth_token = 'e8606a9320d5247e1becdf33528274f9' 
client = Client(account_sid, auth_token) 
 
message = client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body='Hello! This is an editable text message. You are free to change it and write whatever you like.',      
                              to='whatsapp:+5215514752305' 
                          ) 
 
print(message.sid)