import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./styles/tailwind.css";
import App from "./App.jsx";
import "./i18n";
import { TranslationProvider } from "./context/TranslationContext";

// 로컬 스토리지의 특정 키를 매일 자정에 초기화하는 유틸
function scheduleDailyLocalStorageClear(keys = ["game_user_id", "game_try_times"]) {
  try {
    const MS_PER_DAY = 24 * 60 * 60 * 1000;

    const clearKeys = () => {
      try {
        keys.forEach((k) => localStorage.removeItem(k));
        // 마지막 삭제 일자를 기록 (YYYY-MM-DD)
        const today = new Date();
        localStorage.setItem("game_cleared_date", today.toISOString().slice(0, 10));
      } catch {
        // 안전하게 무시 (로컬스토리지 접근 실패 시)
      }
    };

    // 이미 오늘 초기화가 실행됐는지 확인
    const lastCleared = localStorage.getItem("game_cleared_date");
    const todayStr = new Date().toISOString().slice(0, 10);
    if (lastCleared !== todayStr) {
      // 아직 수행되지 않았다면 즉시 수행
      clearKeys();
    }

    // 다음 자정까지 남은 시간 계산
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); // 다음날 00:00
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    // 다음 자정에 실행하고, 이후 매일 반복
    setTimeout(() => {
      clearKeys();
      setInterval(clearKeys, MS_PER_DAY);
    }, msUntilMidnight);
  } catch {
    // 무시
  }
}

// Query Client 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </QueryClientProvider>
  </StrictMode>
);

// 앱 시작 시 로컬 스토리지 초기화 스케줄 설정
scheduleDailyLocalStorageClear();
