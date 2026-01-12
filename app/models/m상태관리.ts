


import type { Reactive } from 'vue';
import { reactive, watch } from 'vue';

export class m상태관리 {


    _state = reactive({ 최초값: undefined, is수정됨: false });
    // _configis수정됨 = { show: false }
    get is수정됨() { return this._state.is수정됨 }

    _do상태초기화 = (_state: any) => {
        this._state.최초값 = JSON.stringify((_state))
        this._state.is수정됨 = false;
    };
    _do상태감지 = (a: Reactive<any>) => {
        setTimeout(() => {
            if (this._state.최초값 == undefined) {
                this._do상태초기화(a);
                watch(a, (v) => this._state.is수정됨 = (this._state.최초값 != JSON.stringify(v)));
            }
        }, 1);//reactive state 생성이 끝난후 접근해야함. 
    }
}