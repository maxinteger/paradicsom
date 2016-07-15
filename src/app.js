import Cycle from '@cycle/xstream-run';
import xs from 'xstream';
import flattenConcurrently  from "xstream/extra/flattenConcurrently";
import {map, merge, identity, assoc, lens, prop, set, view, equals, pipe} from 'ramda';
import {div, h1, button, makeDOMDriver} from '@cycle/dom';

import {formatTime} from './utils';
import {makeNotificationDriver} from "./notification-driver";

const STOP = 'stop';
const PLAY = 'play';
const PAUSE = 'pause';

const typeL = lens(prop('type'), assoc('type'));
const timeL = lens(prop('time'), assoc('time'));
const endL = lens(prop('end'), assoc('end'));

const setTimer = (time) =>
    xs
        .periodic(1000)
        .fold(
            (o, i) => set(timeL, o.time - 1, o),
            {type: PLAY, time: time * 60, start: Date.now()}
        );

function main({DOM, Notify}) {
    const stop_ = DOM.select('#stop').events('click');
    const start_ = DOM.select('.start').events('click');

    const countDown_ =
        start_
            .map( e => event.target.dataset.time )
            .debug(console.log.bind(console))
            .map( () => {
            const timer_ = setTimer(.05);
            const timerWithEnd_ = timer_
                .endWhen(
                    xs.merge(
                        start_,
                        stop_,
                        timer_.filter( ({time}) => time < 0 )
                    )
                );

            return xs.merge(
                timerWithEnd_,
                timerWithEnd_
                    .last()
                    .map( pipe(set(typeL, STOP), set(endL, Date.now())) )
                    .debug(console.log.bind(console))
            )
        })
        .compose(flattenConcurrently);


    return {
        Notify: countDown_
            .filter( pipe(view(typeL), equals(STOP)) )
            .mapTo({msg: 'Hellllokk'}),

        DOM: countDown_
            .startWith({time: 0})
            .map(({time}) =>
                div('.container.text-center', [
                    h1('hello paradicsom'),
                    div('.row', [
                        button('.start.btn.btn-success-outline', {props: {time: 20}}, 'start 20 min'),
                        ' ',
                        //button('#stop.btn.btn-warning-outline', 'Pause!'),
                        ' ',
                        button('#stop.btn.btn-danger-outline', 'Stop!')
                    ]),
                    h1(formatTime(time))
                ])
            )
    };
}

Cycle.run(main, {
    DOM: makeDOMDriver('#app-container'),
    Notify: makeNotificationDriver()
});
