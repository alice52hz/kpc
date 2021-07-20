import {useInstance, Component} from 'intact';
import type {TimepickerProps} from './';
import {useState} from '../../hooks/useState';
import type {useDisabled} from '../datepicker/useDisabled';
import type {useFormats} from './useFormats';
import {NOW} from './constants'
import {Dayjs} from 'dayjs';
import {useReceive} from '../../hooks/useReceive';

type Option = {
    value: string,
    label: string
}

type StepComponent = Component<TimepickerProps>

export function useStep(
    {maxDate, minDate}: ReturnType<typeof useDisabled>,
    {getValueString, getShowString}: ReturnType<typeof useFormats>
) {
    const instance = useInstance() as StepComponent;
    const options = useState<Option[] | null>(null);

    useReceive<StepComponent>(['step', 'min', 'max'], generateOptions);

    function generateOptions() {
        const {step} = instance.get();

        if (step) {
            const data: Option[] = [];
            const maxValue = maxDate.value || NOW.hour(23).minute(59).second(59);
            const stepValue = parseTime(step);
            let value = minDate.value || NOW;

            const push = (value: Dayjs) => {
                data.push({
                    value: getValueString(value),
                    label: getShowString(value),
                });
            }

            for (; ; value = value.add(stepValue, 'second')) {
                if (value <= maxValue) {
                    push(value);
                    if (+value === +maxValue) break;
                } else if (data.length) {
                    // it the last value is less than maxValue,
                    // add the maxValue to the last
                    push(maxValue);
                    break;
                } else {
                    break;
                }
            }

            options.set(data);
        } else {
            options.set(null);
        }
    }

    function parseTime(time: string) {
        const [hours, minutes, seconds] = time.split(':').map(item => {
            return parseInt(item, 10);
        });

        return (hours * 60 + (minutes || 0)) * 60 + (seconds || 0);
    }

    return {options};
}
