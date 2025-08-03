# Beeam - 익명 커뮤니티 앱

Beeam은 React Native와 Firebase Firestore로 구축된 간단하고 익명성을 보장하는 커뮤니티 앱입니다.

## 🌟 주요 기능

- **익명 게시글 작성**: 모든 게시글과 댓글은 익명으로 작성됩니다
- **지역별 필터링**: 17개 지역별로 게시글을 필터링할 수 있습니다
- **실시간 업데이트**: Firebase Firestore를 통한 실시간 데이터 동기화
- **댓글 시스템**: 각 게시글에 댓글을 작성할 수 있습니다
- **깔끔한 UI**: 모던하고 직관적인 사용자 인터페이스

## 📱 화면 구성

### 1. 홈 스크린 (HomeScreen)
- 앱 이름 "Beeam." 헤더
- 지역 필터 드롭다운 (17개 지역 + "전체")
- 게시글 목록 (제목, 지역, 작성시간 표시)
- 플로팅 "+" 버튼으로 글 작성

### 2. 글 작성 스크린 (WriteScreen)
- 제목 입력 (최대 100자)
- 지역 선택
- 내용 입력 (최대 2000자)
- "글 올리기" 버튼

### 3. 게시글 상세 스크린 (PostDetailScreen)
- 게시글 제목, 메타 정보, 전체 내용
- 댓글 목록 (최신순 정렬)
- 댓글 입력 창 (최대 500자)

## 🏗️ 데이터 구조

### Firestore 컬렉션 구조
```
/posts (컬렉션)
  └─ <postId> (문서)
      • title: string (제목)
      • content: string (내용)
      • region: string (지역)
      • createdAt: timestamp
      └─ comments (서브컬렉션)
          └─ <commentId> (문서)
              • text: string (댓글 내용)
              • user: string ("익명")
              • createdAt: timestamp
```

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. Firebase 설정
1. Firebase 콘솔에서 새 프로젝트 생성
2. Firestore 데이터베이스 활성화
3. `firebaseConfig.js` 파일에서 Firebase 설정 정보 입력:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 3. 앱 실행
```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android
```

## 📦 주요 의존성

- **React Native**: 크로스플랫폼 모바일 앱 개발
- **Expo**: React Native 개발 환경
- **@react-navigation/native**: 화면 간 네비게이션
- **firebase**: Firebase SDK v9 (모듈러 버전)
- **@react-native-picker/picker**: 드롭다운 선택기

## 🎨 UI/UX 특징

- **카드 기반 디자인**: 둥근 모서리와 그림자 효과
- **일관된 타이포그래피**:
  - 제목: 볼드, ~20pt
  - 메타 텍스트: 연한 색상, ~12-13pt
  - 본문: 16pt, 적절한 줄 간격
- **반응형 레이아웃**: 다양한 화면 크기에 대응
- **키보드 대응**: KeyboardAvoidingView로 사용성 개선

## 🔧 유틸리티

### timeAgo 함수
JavaScript Date 객체를 한국어 상대 시간으로 변환:
- "방금전", "5분전", "2시간전", "3일전" 등

## 🌏 지역 목록

지원하는 17개 지역:
서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주

## 🔒 보안 고려사항

- **익명성**: 모든 사용자는 "익명"으로 표시
- **데이터 검증**: 클라이언트 측 입력 검증 구현
- **Firestore 보안 규칙**: 적절한 보안 규칙 설정 권장

## 📝 사용자 플로우

1. 앱 실행 → 모든 게시글 보기 또는 지역별 필터링
2. "+" 버튼 → 제목, 지역, 내용 입력 후 게시
3. 홈으로 돌아가기 → 새 게시글이 상단에 표시
4. 게시글 탭 → 전체 내용과 댓글 보기
5. 댓글 작성 → 하단 입력창에서 댓글 추가

## 🤝 기여하기

이 프로젝트는 오픈소스입니다. 버그 리포트, 기능 제안, 풀 리퀘스트를 환영합니다!

## 📄 라이선스

MIT License