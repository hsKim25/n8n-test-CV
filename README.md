# 소프트웨어 엔지니어 Personal CV WebApp

김태현 소프트웨어 엔지니어의 개인 이력서를 위한 모던하고 반응형인 One-Page 웹 애플리케이션입니다.

## 🚀 현재 완료된 기능

### ✨ 핵심 기능
- **반응형 One-Page 디자인** - 모든 디바이스에서 최적화된 사용자 경험
- **인터랙티브 네비게이션** - 스무스 스크롤과 활성 섹션 하이라이팅
- **모던한 UI/UX** - 그라디언트, 애니메이션, 호버 효과
- **타이핑 애니메이션** - 직업 타이틀의 동적 타이핑 효과
- **스크롤 애니메이션** - Intersection Observer를 활용한 요소별 페이드인 효과
- **스킬 바 애니메이션** - 스크롤 시 기술 숙련도 시각화
- **카운터 애니메이션** - 경력, 프로젝트 수 등의 숫자 애니메이션
- **다크/라이트 테마 토글** - 사용자 선호도에 따른 테마 전환
- **연락처 폼** - 실시간 검증과 알림 시스템

### 📱 반응형 디자인
- **데스크톱** (1200px+) - 풀 레이아웃
- **태블릿** (768px-1199px) - 적응형 그리드
- **모바일** (320px-767px) - 햄버거 메뉴, 세로 레이아웃

### 🎨 디자인 특징
- **모던한 색상 팔레트** - 블루/퍼플 그라디언트 테마
- **Inter 폰트** - 깔끔하고 읽기 쉬운 타이포그래피
- **Font Awesome 아이콘** - 일관성 있는 아이콘 시스템
- **CSS Grid & Flexbox** - 유연한 레이아웃 시스템
- **CSS 변수** - 효율적인 스타일 관리

## 📂 프로젝트 구조

```
/
├── index.html          # 메인 HTML 파일
├── style.css          # CSS 스타일시트
├── script.js          # JavaScript 인터랙션
└── README.md          # 프로젝트 문서
```

## 🎯 현재 기능 URI 경로

### 메인 섹션들
- **/** - 홈페이지 (Hero Section)
- **/#home** - 메인 소개 섹션
- **/#about** - 자기소개 및 통계
- **/#experience** - 경력 타임라인
- **/#projects** - 포트폴리오 프로젝트
- **/#skills** - 기술 스택 및 숙련도
- **/#contact** - 연락처 정보 및 폼

### 인터랙티브 요소들
- 모바일 햄버거 메뉴
- Back to Top 버튼
- 스무스 스크롤 네비게이션
- 프로젝트 카드 호버 효과
- 소셜 미디어 링크
- 테마 토글 버튼

## 💻 기술 스택

### Frontend Technologies
- **HTML5** - 시멘틱 마크업
- **CSS3** - 고급 스타일링 및 애니메이션
- **Vanilla JavaScript** - 인터랙티브 기능 구현

### 외부 라이브러리
- **Inter Font** - Google Fonts
- **Font Awesome 6.4.0** - 아이콘 라이브러리
- **CSS Variables** - 동적 테마 시스템

### 최적화 기술
- **Intersection Observer** - 성능 최적화된 스크롤 애니메이션
- **Throttle/Debounce** - 이벤트 핸들링 최적화
- **CSS Grid & Flexbox** - 효율적인 레이아웃
- **Smooth Scroll Polyfill** - 브라우저 호환성

## 🚧 구현되지 않은 기능들

### 백엔드 기능
- 실제 연락처 폼 서버 처리
- 이메일 전송 시스템
- 방문자 통계 및 분석
- 컨텐츠 관리 시스템(CMS)

### 추가 고려사항
- 다국어 지원 (i18n)
- SEO 최적화 (메타 태그, 스키마)
- PWA (Progressive Web App) 기능
- 실제 프로필 이미지 업로드
- 프로젝트 상세 페이지
- 블로그 섹션

## 🛠 권장 다음 개발 단계

### 1. 컨텐츠 개인화 (우선순위: 높음)
- [ ] 실제 프로필 사진 추가
- [ ] 개인 정보 및 경력 사항 업데이트
- [ ] 실제 프로젝트 링크 및 이미지 추가
- [ ] 소셜 미디어 링크 연결

### 2. SEO 및 성능 최적화 (우선순위: 중간)
- [ ] 메타 태그 최적화
- [ ] Open Graph 태그 추가
- [ ] 이미지 최적화 및 WebP 지원
- [ ] Critical CSS 인라인화
- [ ] 서비스 워커 구현 (PWA)

### 3. 고급 기능 구현 (우선순위: 낮음)
- [ ] 연락처 폼 백엔드 연동
- [ ] Google Analytics 연동
- [ ] 실시간 채팅 위젯
- [ ] 포트폴리오 필터링 시스템
- [ ] 다운로드 가능한 PDF 이력서

### 4. 접근성 및 호환성 (우선순위: 중간)
- [ ] ARIA 라벨링 강화
- [ ] 키보드 네비게이션 개선
- [ ] 스크린 리더 지원 강화
- [ ] 구형 브라우저 호환성 테스트

## 🎨 디자인 시스템

### 색상 팔레트
```css
--primary-color: #667eea    /* 메인 블루 */
--secondary-color: #764ba2  /* 퍼플 */
--accent-color: #f093fb     /* 핑크 악센트 */
--text-dark: #2d3748        /* 다크 텍스트 */
--text-light: #718096       /* 라이트 텍스트 */
--bg-light: #f7fafc         /* 라이트 배경 */
```

### 타이포그래피
- **Primary Font**: Inter (Google Fonts)
- **Heading Weights**: 600, 700
- **Body Weight**: 400, 500
- **Small Text Weight**: 300

### 스페이싱 시스템
- **섹션 패딩**: 8rem (128px)
- **컨테이너 최대 너비**: 1200px
- **기본 갭**: 1rem, 1.5rem, 2rem, 4rem

## 📱 브라우저 지원

### 완전 지원
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 기본 지원 (Polyfill 적용)
- Internet Explorer 11 (제한적)
- 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 🚀 배포 가이드

### GitHub Pages 배포
1. GitHub 저장소에 파일들 업로드
2. Settings > Pages에서 source branch 설정
3. 자동 배포된 URL 확인

### Netlify 배포
1. 프로젝트 폴더를 Netlify에 드래그 앤 드롭
2. 자동 빌드 및 배포
3. 커스텀 도메인 설정 (선택사항)

### Vercel 배포
```bash
# Vercel CLI 설치 후
vercel --prod
```

## 📧 연락처 정보

- **Email**: kim.taehyun@email.com
- **Phone**: +82 10-1234-5678
- **Location**: 서울, 대한민국
- **GitHub**: github.com/username
- **LinkedIn**: linkedin.com/in/username

## 📄 라이선스

이 프로젝트는 개인용 포트폴리오 목적으로 제작되었습니다. 
참고용으로 자유롭게 사용하실 수 있으나, 상업적 용도로 사용 시 연락 부탁드립니다.

---

**Made with ❤️ by Software Engineer**  
*Last Updated: 2024년 12월*