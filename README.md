윈도우용 git: https://www.git-scm.com/download/win
맥용 git:  $brew install git

**RST** Ethereum DevEnvironment (in testing) - yongary.kim@gmail.com

- 개발툴은 IntelliJ IDEA ULTIMATE,  2017.2.7 버전을 사용중 
  (https://www.jetbrains.com/idea/download/previous.html)
  
  프로젝트 로드: git clone으로 소스를 받은 후,  import project -> setting.gradle을 선택.  

### R (react.js - frontend )

1. npm 설치. https://nodejs.org/en/ ⇒ 8.X.X LTS버전 설치
  
   (Intellij 구동 후, 메뉴의 View->Tool View->Terminal 이용하면 편함)
   
2. npm install:  package.json수정시 및 최초구동시  tour/react-frontend폴더 밑에서 $ npm install  (필요 library들 다운로드 . node_modules폴더로)
3. npm start:    실행- tour/react-frontend$ npm start   ==> loalhost:3000으로 자동접속
    (가끔 빌드가 필요하면      $npm run build) 

4. UI: bootstrap4의 react버전인 reactstrap을 적용테스트 중.
링크의 우측메뉴에서 예쁜 Component골라서 쓰기 -  http://reactstrap.github.io/components/navbar/


### S (springBoot - backend)

1. JDK1.8  설치
2. IntelliJ에 Lombok plugin설치  (Lombok은 java class의 setter/getter를 자동으로 생성해주는 plugin) 
    - (Preference세팅메뉴) 의 plugins 서브메뉴에서 Lombok plugin 검색설치
    - (Preference세팅메뉴)  compiler->annotation processor에서 Enable Annotation Processor선택 

3. 실행법 :

   * Run Configuration에서 TourApplication골라서 실행 (하고나면 우측상단에서 버튼실행도 가능)
   * 혹은 좌측Tree에서 TourApplication골라서 context Menu로 실행 
   * 혹은 터미널에서 "gradle bootRun" 커맨드로 실행

 => 실행되면 SPRING 로고가 크게 보이면서 tomcat으로 http://localhost:8080 에서 backend서비스가 됨.

* 추가: mongoDB 로컬 설치
    - window용 : http://solarisailab.com/archives/1605 참조
    - mac용: $ brew install mongodb
* 확인 
    - $ mongod  - 설치 후 db서버 실행하는 명령어임
    - 초기data넣기 :  웹브라우저에서 localhost/dbtest   입력하면 test데이타 입력됨
    - $ mongo - 커맨드로 db 접속해서 db.user.find() 명령어로 확인가능


### T (truffle - solidity)

1. 설치

   * $ sudo npm install -g truffle@4.1.8  로 설치
   * ganache(로컬 test용 이더리움) 설치  http://truffleframework.com/ganache/
  
2. 실행

   * (tour/truffle폴더 밑에서)  $ truffle compile 로 컴파일해서
   * (tour/truffle폴더 밑에서)  $ truffle migrate (혹은 npm deploy) 로 deploy.

  => sol개발 완료 및 compile 후에, build/contracts 밑에 xxContract.json파일이 생성되면, 이파일을 tour/react-frontend/public 밑으로 복사해서 dApp개발.



### SimpleStorge 예제 실행방법 ###
(간단한 setValue, getValue만 있는 SimpleStorage Contract를 react.js에서 실행)

1. ganache 구동.

2. truffle폴더)$ truffle compile 및 $ truffle migrate

3. react-frontend폴더)$ npm start  

4. 브라우저에 화면이 나타나면  우상단 SimpleStorage_test링크 클릭.

    - MetaMask로그인 및 localhost:7545 혹은 127.0.0.1:7545 선택
    - 숫자입력 후 SET버튼 클릭 및 GET 버튼 클릭
