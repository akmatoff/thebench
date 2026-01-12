import { useEffect, useRef, useState } from "preact/hooks";

export default function useControlHintOpen() {
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("controlHintOpen");
    return storedValue === null ? true : JSON.parse(storedValue);
  });

  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape" && isOpenRef.current) {
        closeHint();
      } else if (event.code === "Backquote" && !isOpenRef.current) {
        openHint();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openHint = () => {
    setIsOpen(true);
    localStorage.setItem("controlHintOpen", JSON.stringify(true));
  };

  const closeHint = () => {
    setIsOpen(false);
    localStorage.setItem("controlHintOpen", JSON.stringify(false));
  };

  return {
    isOpen,
    openHint,
    closeHint,
  };
}
