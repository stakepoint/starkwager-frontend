import { useState, useEffect } from "react";

export function useCopyToClipboard(timeout = 1500) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), timeout);
    return () => clearTimeout(timer);
  }, [isCopied, timeout]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return { isCopied, copy };
}
