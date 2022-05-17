import EventEmitter from 'eventemitter3';
import { sleep } from '@/utils/index';

export const EE = new EventEmitter();


sleep(10000).then(()=> {
    EE.emit('done', 1)
})