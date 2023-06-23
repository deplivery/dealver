# Base image
FROM node:18

# 작업 디렉토리 생성
WORKDIR /app

# 패키지 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 컨테이너 실행 명령
CMD [ "npm", "run", "start:dev" ]
