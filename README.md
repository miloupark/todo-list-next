# ![](/public/img/logo_sm.svg) Todo List

> 프론트엔드 단기심화 과정 과제 · Next.js(App Router) 기반 Todo List 웹 애플리케이션

![](/public/docs/thumb.png)

<br>

## 🛠 Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Deployment**: Vercel

<br>

## 🚀 Getting Started

```bash
# 1. 프로젝트 클론
git clone https://github.com/miloupark/todo-list-next.git

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하면 확인할 수 있습니다.

<br>

## ✨ Features

### 할 일 목록 페이지 `/`

- 할 일 목록 조회 (진행 중 / 완료 구분)
- 새로운 할 일 추가
- 체크박스를 통한 완료 / 진행 상태 토글
- 로고 클릭 시 목록 페이지로 이동

### 할 일 상세 페이지 `/items/{itemId}`

- 할 일 제목 수정
- 진행 상태 수정
- 메모 추가 / 수정
- 이미지 첨부
  - 파일명은 영어만 허용
  - 최대 5MB 이하
- 수정 완료 시 목록 페이지로 이동
- 할 일 삭제 기능

<br>

## 🔗 Resources

- **Font**: [NanumSquare](https://github.com/moonspam/NanumSquare)
- **Font**: [HsSantoki](https://noonnu.cc/font_page/809)
- **Design**: [Figma 시안](https://www.figma.com/design/zcM3VfCNbtiqt5aLhlv4sV/-KDT-%EB%8B%A8%EA%B8%B0%EC%8B%AC%ED%99%94--%EC%A7%80%EC%9B%90%EC%9E%90-%EA%B3%BC%EC%A0%9C?node-id=53-2&t=lvOhagyGtQYFGfIF-1)
- **API Docs**: [Swagger](https://assignment-todolist-api.vercel.app/docs/)

<br>

## 🚀 Deployment

- Vercel을 이용해 배포했습니다.
- 배포 링크는 외부 계정에서도 정상적으로 접근 가능합니다.
- https://todo-list-next-vert.vercel.app/
