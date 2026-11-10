const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({ 
    target: 'https://www.instagram.com', 
    changeOrigin: true,
    // 인스타그램 봇 차단 시스템을 피하기 위해 일반 크롬 브라우저처럼 위장
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
    },
    // 쿠키 도메인 충돌 방지
    cookieDomainRewrite: "",
    onProxyRes: function (proxyRes, req, res) {
        // 보안 헤더(X-Frame-Options 등)를 제거하여 화면이 잘리거나 차단되는 것을 방지
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    }
}));

// Render에서 자동으로 할당하는 포트 사용
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`프록시 서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
