# PM2 (Process Manager 2)
- Node.js 프로세스 관리 프로그램
- 백그라운드 실행, 실행 중인 App 로그 보기 등

### 설치
- npm i --g pm2

### 실행
- `pm2 start <filename>[bin/www]`
- `pm2 start <filename> --name=<app name>` // 별도 이름 지정
<br/><br/>
### 목록 보기
- pm2 list

### 상태 보기
- `pm2 show <id>`
- `pm2 show <name>`
- 실행 중인 App의 간략한 정보


### 로그 보기
- `pm2 log`
- `pm2 log <id>`
- `pm2 log <name>`

<br/><br/>
### 재시작

- `pm2 restart <id/name>`

### 중지
- `pm2 stop <id/name>`

### 삭제
- `pm2 delete <id/name>`

<br/>
<출처>
- https://jetalog.net/75
