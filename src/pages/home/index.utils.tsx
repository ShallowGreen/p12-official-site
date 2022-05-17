import EventEmitter from 'eventemitter3';
import { sleep } from '@/utils/index';

export const EE = new EventEmitter();

// 测试代码
sleep(2000).then(()=> {
    EE.emit('done', 1)
})