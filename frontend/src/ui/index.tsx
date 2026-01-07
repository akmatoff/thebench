import { render } from "preact";
import Root from "./Root";
import "../main.css";

export function initUI() {
  const uiRoot = document.getElementById("ui")!;
  render(<Root />, uiRoot);
}
