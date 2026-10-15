import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

const Ctx = createContext<(message: string) => void>(() => undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [on, setOn] = useState(false);
  const timer = useRef(0);
  const push = useCallback((next: string) => {
    setMessage(next);
    setOn(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOn(false), 2200);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="toast" data-on={on} role="status">
        {message}
      </div>
    </Ctx.Provider>
  );
}

export function useToast(): (message: string) => void {
  return useContext(Ctx);
}
