# DB 연결 오류 발생
`MongoDB Connection error:  MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the 
database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/ `

- 사용자 IP가 바껴서 mongoDB 사이트에서 해당 IP를 추가해줘야 한다.
- Network Access -> Add IP Address -> Current IP 추가



