import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import BaseInput from "@/components/Form/BaseInput.vue";

describe('BaseInput.vue', () => {
    it('matches snapshot', () => {
        const label = 'Test Label'
        const name = 'Test Name'
        const id = 'Test ID'
        const placeholder = 'Test Placeholder'
        const maxlength = '10'
        const modelValue = 'Test Value'
        const error = 'Test Error'

        const wrapper = mount(BaseInput, {
            props: {
                label,
                name,
                id,
                placeholder,
                maxlength,
                modelValue,
                error
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emits update:modelValue event on input', async () => {
        const wrapper = mount(BaseInput, {
            props: {
                label: 'Test Label',
                name: 'Test Name',
                modelValue: 'Test Value'
            }
        })

        await wrapper.find('input').setValue('New Value')

        // Check that the event has been emitted more than once
        expect(wrapper.emitted('update:modelValue').length).toBeGreaterThan(1)
        // Check that the last emitted value is 'New Value'
        expect(wrapper.emitted('update:modelValue').pop()).toMatchSnapshot()
    })
})
