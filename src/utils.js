const pad2 = (num) => (num < 10 ? '0' : '') + num;

export const formatTime = (time) => {
    //const hour = time % (60 * 60 * 1000);
    //const min = (time - hour * 60 * 60 * 1000) % (60 * 1000);

    if (time === 0){
        return '00:00';
    } else {
        const min = Math.floor(time / 60000);
        const sec = (time - min * 60000) / 1000;
        return `${pad2(min)}:${pad2(sec)}`
    }
};