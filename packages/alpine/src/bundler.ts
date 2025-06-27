import VeePlugin from './module';

function waitForAlpine(): Promise<typeof window.Alpine> {
    return new Promise((resolve) => {
        if (window.Alpine)
            return resolve(window.Alpine);

        const int = setInterval(() => {
            if (window.Alpine) {
                clearInterval(int);
                resolve(window.Alpine);
            }
        }, 10);
    });
}

waitForAlpine().then((Alpine) => {
    if (!Alpine.__vee_registered) {
        Alpine.__vee_registered = true;
        Alpine.plugin(VeePlugin);
    }
});
