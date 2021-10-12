import {useInstance} from 'intact';
import type {Slider} from './';
import {useReceive} from '../../hooks/useReceive';
import {NormalizedGetStep} from '../spinner/useStep';
import {minMaxStep} from '../spinner/useValue';
import {error} from 'intact-shared';
import {isEqualArray} from '../utils';
import {useState} from '../../hooks/useState';

export type Value = number | [number, number];

export function useValue(getStep: NormalizedGetStep) {
    const instance = useInstance() as Slider;
    const showValue = useState<Value>(instance.get('value')!);

    useReceive<Slider>(['min', 'max', 'step', 'value'], () => {
        fixValue(instance.get('value')!);
    });

    function fixValue(value: Value) {
        const fixedValue = getFixedValue(value); 
        showValue.set(fixedValue);
        instance.set({value: fixedValue});
    }

    function getFixedValue(value: Value): Value {
        const {min, isRange} = instance.get();

        let fixedValue: Value;
        if (isRange) {
            if (!Array.isArray(value)) {
                const tmp = fix(value);
                fixedValue = [tmp, tmp];
            } else {
                fixedValue = [fix(value[0]), fix(value[1])];
                if (isEqualArray(fixedValue, value)) {
                    return value;
                }
            }
        } else {
            fixedValue = fix(value as number);
        }

        return fixedValue;
    }

    function fix(value: number): number {
        const {max} = instance.get();
        const [step, min] = getStep(value);
        
        if (min > max!) {
            if (process.env.NODE_ENV !== 'production') {
                error(`[Slider] min must less than or equal to max, but got min: ${min} max: ${max}`);
                return 0;
            }
        }

        return minMaxStep(value, min, max!, step);
    }

    function onSpinnerChange(v: number) {
        showValue.set(v);
        instance.set({value: v});
    }

    return {showValue, getFixedValue, onSpinnerChange};
}
