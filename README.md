# **Reactstagram**
<br />

> 에듀캐스트 AskDjango 강의를 들으며 만들게 된 토이 프로젝트입니다.  
> Django + DRF + React.js 로 구현한 인스타그램 컨셉의 프로젝트입니다.  
> 강의 복습 및 개인 공부를 위해 더 기능을 추가하고 기록해보고자 시작하였습니다.  
<br />

### **사용 스택**
- Python (3.8.0)
- Django (3.0.5)
- Django Rest Framework
- PostgreSQL
- React.js
- Docker (Image & Container)
- Azure DB
- Azure Storages
- Azure App Service
<br />

### **How to Run on your Machine**
**Backend**
  1. pyenv activate `'Your virtualenv'`
  2. pip install -r requirements.txt
  3. python manage.py migrate
  4. python manage.py runserver 

**Frontend**
1. yarn install (프로젝트 폴더, 실행에 요구되는 패키지 다운로드)
2. yarn start
<br />

------
<br />

### 개발
<br />

✔️ **Back-End**

- 유저 인증 관련 기능 및 API 구현
- 기능 별 모델 설계 및 모델 간의 관계 정리(유저, 포스팅)
- 포스트 관련 CRUD API 설계
- 좋아요 / 댓글 / 팔로우 제안

✔️ **Front-End**

- Hooks, Context API를 통한 state 관리
- 메인 화면 포스팅, 개인 정보 수정, 유저 디테일 화면 구현
- Ant Design과 Scss를 활용한 UI 및 레이아웃 구성

✔️ **Deploy**

- Docker를 통한 빌드 진행 및 Docker Hub로 업로드 (백엔드 API 서버)
- Azure App Service를 활용한 Container로의 배포
- 서버와 Azure DB 연결 (PostgreSQL)
- 리액트 코드를 빌드하여 Azure Storage를 통한 static website 형태로 배포
<br />

### ETC
인스타그램의 모든 기능을 넣진 않았지만, 큼지막한 기능들은 구현해 본 것 같습니다.  
또한 React.js 입문 및 사용에 익숙해질 수 있던 기회였습니다.  
현재 백엔드 서버는 Heroku, 프론트 화면은 Azure를 통해 배포 중입니다.  
<br />

### **Contact**
- pilyeooong@gmail.com
