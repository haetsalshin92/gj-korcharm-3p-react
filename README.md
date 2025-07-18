# Gemini AI 코드 리뷰 히스토리 React App

이 프로젝트는 PR(Pull Request) 코드 리뷰 이력을 시각적으로 보여주는 React 기반 웹 애플리케이션입니다.  
Diff2Html을 활용해 코드 변경(diff)을 보기 좋게 렌더링하며, 리뷰 내용과 작성일도 함께 제공합니다.

## 주요 기능

- `/api/reviews` 엔드포인트에서 코드 리뷰 목록을 불러와 화면에 표시
- 각 리뷰의 Diff(코드 변경 내역)를 side-by-side 형식으로 시각화
- 리뷰 내용 및 작성일 표시
- Diff 영역을 클릭하여 펼치기/접기 지원

## 주요 기술 스택

- React 19
- Axios (API 통신)
- Diff2Html (코드 diff 시각화)
- Nginx (Docker 컨테이너에서 정적 파일 서빙)
- Github Actions (CI/CD)

## 폴더 구조

- `src/App.js`: 메인 컴포넌트, 리뷰 목록 및 diff 렌더링
- `src/axios.js`: Axios 인스턴스 설정
- `nginx/default.conf`: Nginx 리버스 프록시 및 정적 파일 서빙 설정
- `Dockerfile`: 멀티스테이지 빌드 및 Nginx 배포 환경 구성
- `.github/workflows/react.yml`: Github Actions CI/CD 파이프라인

## 실행 방법

1. 의존성 설치
   npm install
2. 개발 서버 실행
   npm start
   브라우저에서 [http://localhost:3000](http://localhost:3000) 접속
3. 프로덕션 빌드
   npm run build
4. Docker로 빌드 및 실행
   docker build -t gemini-ai-review . docker run -p 80:80 gemini-ai-review


## API 예시

- `/api/reviews`  
  ```json
  [
    {
      "id": 1,
      "prNumber": 42,
      "diff": "diff --git ...",
      "review": "코드가 잘 작성되었습니다.",
      "createdAt": "2024-06-10T12:34:56Z"
    }
  ]

## 참고
- 코드 diff 시각화: diff2html
- React 공식문서: https://reactjs.org/
