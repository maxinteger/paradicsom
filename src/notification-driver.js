import xs from 'xstream';
import delay from 'xstream/extra/delay';
import {identity} from 'ramda';


export const makeNotificationDriver = () => {
    const notifySupported = typeof Notification !== 'undefined';
    let notifyAllowed = false;

    if (notifySupported) {
        Notification.requestPermission().then(function (result) {
            notifyAllowed = result === 'granted';
        });
    }

    return sink_ => {
        sink_.addListener({
            next: ({msg, body, icon}) => {
                xs
                    .of(new Notification(msg, {body, icon}))
                    .compose(delay(3000))
                    .map(n => n.close())
                    .addListener({next: identity, error: identity, complete: identity});
            },
            complete: identity,
            error: identity
        });

        return {}
    }
};