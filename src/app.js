import Cycle from '@cycle/xstream-run';
import xs from 'xstream';
import {map, merge} from 'ramda';
import {div, h1, button, makeDOMDriver} from '@cycle/dom';

function main({DOM}) {
    return {
        DOM: xs
            .of({})
            .map(() => h1('hello paradicsom'))
    };
}


Cycle.run(main, {
    DOM: makeDOMDriver('#app-container')
});
