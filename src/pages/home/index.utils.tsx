import EventEmitter from 'eventemitter3';
import { sleep } from '@/utils/index';
import {PageIDType } from '@/constant/index';
import { indexOf, mean } from 'lodash-es';

export const EE = new EventEmitter();

// 测试代码
// sleep(2000).then(()=> {
//     EE.emit('done', 1)
// })
const emitArray = [PageIDType.Vision, `${PageIDType.Infra}.deer`, `${PageIDType.Infra}.cloud1`, `${PageIDType.Infra}.cloud2`, `${PageIDType.Infra}.cloud3`]
const percentArray = [0,0,0,0,0]

emitArray.forEach(item=> {
    EE.on(`progress.${item}`, (percent) => {
        const index = indexOf(emitArray, item);
        percentArray[index] = percent;
        // 95%，一共5个模型，防止进位导致没加载完成，显示为完成
        const avgPercent = mean(percentArray).toFixed(2);
        EE.emit('progress', avgPercent);
        if(Number(avgPercent) === 1){
            EE.emit('done')
        }
    })
})