# process.env
- 시스템에 다양한 환경변수 설정
- process 변수
  - 전역 객체로 require()없이 어디서든 사용 가능
  - 현재 Node.js process의 제어 권한, 정보 등을 제공
- env: 환경변수 의미

```javascript
{ 
  ...
  LANG: 'ko_KR.UTF-8',
  LOCALAPPDATA: 'C:\\Users\\Administrator\\AppData\\Local',
  LOGONSERVER: '\\\\INTEL-I5',
  NODE: 'C:\\Program Files\\nodejs\\node.exe',
  NODE_EXE: 'C:\\Program Files\\nodejs\\\\node.exe',
  NPM_CLI_JS:
   'C:\\Program Files\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js',
  npm_config_access: '',
  ...
}
```

<출처>
- https://nodejs.org/dist/latest-v8.x/docs/api/process.html
