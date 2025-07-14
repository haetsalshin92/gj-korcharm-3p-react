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

# NGINX 설정 파일 복사 (선택사항)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
