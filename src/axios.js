import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://alb-spring-294846311.ap-northeast-2.elb.amazonaws.com:8080",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;