import { useState } from "preact/hooks";

export default function useControlHintOpen() {
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("controlHintOpen");
    return storedValue === null ? true : JSON.parse(storedValue);
  });

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
