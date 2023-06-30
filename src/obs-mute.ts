import OBSWebSocket from "obs-websocket-js";
import imgMicOn from "./img/mic-on.svg";
import imgMicOff from "./img/mic-off.svg";

async function connectOBS(): Promise<OBSWebSocket> {
    const obs = new OBSWebSocket();
    const host = import.meta.env.VITE_OBS_WEBSOCKET_HOST;
    const password = import.meta.env.VITE_OBS_WEBSOCKET_PASSWORD;
    console.log(host)
    await obs.connect(`ws://${host}`, password);
    return obs;
}

export async function setupOverlay(element: HTMLDivElement) {
    const obs = await connectOBS();
    const obsInputName = import.meta.env.VITE_OBS_INPUT_NAME;

    let {inputMuted: isInputMuted} = await obs.call("GetInputMute", {"inputName": obsInputName})

    const setIndicator = () => {
        const imgPath = isInputMuted ? imgMicOff : imgMicOn;
        element.innerHTML = `<img src="${imgPath}" alt="Microphone status"/>`
    }
    setIndicator();

    obs.on("InputMuteStateChanged", ({inputName, inputMuted}) => {
        if (inputName !== obsInputName) return;
        isInputMuted = inputMuted
        setIndicator();
    });
}
