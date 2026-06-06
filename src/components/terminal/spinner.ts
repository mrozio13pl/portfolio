import ansis from 'ansis';

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const INTERVAL = 80;

export const CLEAR = '\r\x1b[2K';

type WriteFn = (data: string | Uint8Array) => void;

export function createTerminalSpinner(write: WriteFn, label: string) {
    let frameIndex = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const render = () => {
        write(ansis.dim`${CLEAR}${SPINNER_FRAMES[frameIndex]} ${label}`);
        frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
    };

    return {
        start() {
            if (interval) return;

            render();
            interval = setInterval(render, INTERVAL);
        },
        stop() {
            if (!interval) return false;

            clearInterval(interval);
            interval = null;
            write(CLEAR);
            return true;
        },
    };
}
