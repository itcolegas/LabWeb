from twilio.rest import Client 
 
account_sid = 'ACb59160fe2c25c2b8764ed52d4da786a3' 
auth_token = 'fe19c0322460ac08a2df059a8dd9c8c4' 
client = Client(account_sid, auth_token) 
 
message = client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body='¿Qué pedo?',      
                              to='whatsapp:+5215514752305' 
                          ) 
 
print(message.sid)
