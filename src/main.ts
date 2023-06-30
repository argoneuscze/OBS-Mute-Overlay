import "./style.css";
import {setupOverlay} from "./obs-mute.ts";

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="mute-image"></div>
  </div>
`;

    setupOverlay(document.querySelector<HTMLDivElement>("#mute-image")!);
})
