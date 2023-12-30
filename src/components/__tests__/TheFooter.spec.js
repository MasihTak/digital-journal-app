import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import TheFooter from "@/components/TheFooter.vue";

describe('Footer', () => {
    it('renders current year', () => {
        const currentYear = new Date().getFullYear();
        const wrapper = mount(TheFooter);
        expect(wrapper.text()).toEqual(`© ${currentYear} MasihTak.`);
    })
})
