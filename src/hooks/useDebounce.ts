import { useRef, useCallback } from "react";

/**
 * 주어진 콜백 함수를 지연 호출하는 디바운스 훅
 *
 * @param {function} callback - 디바운스할 콜백 함수
 * @param {number} delay - 지연 시간 (밀리초)
 * @returns {function} 디바운스된 콜백 함수
 */

function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}

export default useDebounce;
