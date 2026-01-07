import { InfoIcon, XIcon } from "@phosphor-icons/react";
import cn from "classnames";
import useControlHintOpen from "./hooks/useControlHintOpen";

export default function ControlHint() {
  const { isOpen, openHint, closeHint } = useControlHintOpen();

  const handleOpen = () => {
    openHint();
  };

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    closeHint();
  };

  return (
    <div
      className={cn(
        isOpen ? "px-4 py-3" : "p-2",
        "bg-content text-foreground rounded-md border border-border fixed bottom-2 left-2 opacity-90 space-y-4"
      )}
      onClick={handleOpen}
    >
      {isOpen ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <InfoIcon size={24} />
              <p className="text-xl">Controls</p>
            </div>

            <button onClick={handleClose}>
              <XIcon size={16} />
            </button>
          </div>
          <div className="space-y-4">
            <p>
              Use <kbd>→</kbd> and <kbd>←</kbd> to move the player.
            </p>
            <p>
              Use <kbd>x</kbd> to smoke.
            </p>
            <p>
              Use <kbd>Space</kbd> near the bench to sit.
            </p>
          </div>
        </>
      ) : (
        <InfoIcon size={24} className="cursor-pointer" />
      )}
    </div>
  );
}
