import { render } from "preact";
import Root from "./Root";
import "../main.css";
import Loader from "./Loader";

export function initUI() {
  const uiRoot = document.getElementById("ui")!;
  render(<Root />, uiRoot);
}

export function initLoaderUI() {
  const loaderRoot = document.getElementById("loader")!;
  render(<Loader progress={0} />, loaderRoot);
}

export function updateLoaderUI(progress: number) {
  const loaderRoot = document.getElementById("loader")!;
  render(<Loader progress={progress} />, loaderRoot);
}
