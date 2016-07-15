const pad2 = (num) => (num < 10 ? '0' : '') + num;

export const formatTime = (time) => {
    //const hour = time % (60 * 60 * 1000);
    //const min = (time - hour * 60 * 60 * 1000) % (60 * 1000);

    if (isNaN(time) || time === Infinity || time === -Infinity){
        return '00:00';
    } else {
        const sign = time < 0 ? '-' : '';
        const absTime = Math.abs(time);
        const min = Math.floor(absTime / 60);
        const sec = Math.floor((absTime - min * 60));

        return `${sign}${pad2(min)}:${pad2(sec)}`
    }
};