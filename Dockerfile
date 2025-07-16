# 1단계: 빌드 단계
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: NGINX를 이용해 정적 파일 서빙
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# ✅ nginx 설정 복사 (nginx/default.conf → nginx 컨테이너 내부)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
