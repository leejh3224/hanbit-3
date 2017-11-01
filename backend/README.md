# Complete Guide to Passport Authentication

Passport.js를 사용하는 한국어 사용자를 위해 작성된 문서입니다.
일반적으로 Passport.js에 설명은 local starategy 위주로 다룹니다.
하지만 대부분의 개발자는 naver, facebook 등의 social starategy를 사용해야 할 일이 더 많습니다. 
이 프로젝트는 redis/passport 위주의 인증작업을 다루고 있으며, view template으로 pug를 사용하고 있습니다.

## 시작하기

### 준비

Mongodb가 필요합니다.
Mongodb가 처음이시라면 벨로퍼트(Velopert)님의 게시물(https://velopert.com/436)을 참조하시기 바랍니다. 
혹은 mlab(https://mlab.com/)을 방문해서 무료 저장소를 만드시기 바랍니다.

다음은 Redis입니다. 
맥 OS 사용자시라면 brew install redis를 통해 설치를 하시고,
터미널에서 redis-server 명령어를 실행해줍니다.
만약 key 등을 확인하고 싶다면 다른 터미널을 켜서 redis-cli를 실행하면 간단한 명령어를 입력해볼 수 있습니다.
윈도우즈 사용자는 링크(http://thingsthis.tistory.com/182)를 참조해주시기 바랍니다.

다음은 .env 파일입니다.
본 프로젝트는 dotenv 모듈을 사용하고 있으며, 본 저장소에는 .env 파일이 제외되어 있기 때문에 파일을 만들고,

```
  PORT=8080
  MONGO_URI=몽고디비 uri
  NAVER_CLIENT_ID=네이버 클라이언트 아이디
  NAVER_CLIENT_SECRET=네이버 클라이언트 시크릿
  FACEBOOK_CLIENT_ID=페이스북 클라이언트 아이디
  FACEBOOK_CLIENT_SECRET=페이스북 클라이언트 시크릿
```

다음과 같이 정리해두시면 간단하게 설정 파일을 관리할 수 있습니다.
만약 배포를 앞두고 계시다면 배포 서버에 위의 환경변수를 추가해주세요.
클라이언트 아이디와 같은 민감한 정보는 절대 저장소에 포함되어서는 안 됩니다.

### 주의 사항

1. redis-server 명령어를 통해 redis 가 켜져있어야 제대로 로그인 성공 페이지로 리다이렉트 됩니다.
(redis-server 명령어 입력)

2. localhost로 접속 시 네이버 로그인이 안 되므로 127.0.0.1로 접속할 것.
만약 페이스북 로그인은 되는데 네이버 로그인만 안 된다면 호스트를 확인해주자.

### 시작

```
  git clone https://github.com/leejh3224/Complete-Guide-Passport.js.git
  cd Complete-Guide-Passport.js

  /* 
    시작전 .env 파일에 준비 사항에 표시된 변수들을 저장해주세요.
    몽고디비 uri나 클라이언트 아이디, 시크릿 등이 없으면
    인증작업을 테스트해볼 수 없습니다.
  */
  touch .env
  
  npm install or yarn
  npm run dev or yarn dev
```

