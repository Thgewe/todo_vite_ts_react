export const debounce = (callback: Function, ms: number) => {
    let isDelay = false;

    return (...args: any) => {
        if (!isDelay) {
            callback(...args);
            isDelay = true;

            setTimeout(() => {
                isDelay = false;
            }, ms)
        }
    }
}