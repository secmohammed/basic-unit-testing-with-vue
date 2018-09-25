import { mount } from 'vue-test-utils';
import expect from 'expect';
import Reminders from '../src/components/Reminders.vue'
describe('Reminders' , () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount (Reminders);
    })
    it('hides the reminders list if there are none',() => {
        expect(wrapper.contains('ul')).toBe(false)
    })
    it('can add reminders', () => {
        addReminder('Go To the store');
        expect(remindersList()).toContain('Go To the store');
    });
    it('can remove any reminder', () => {
        addReminder('Go To the store');
        addReminder('finish screencast');
        expect(wrapper.vm.reminders.length).toBe(2)
        let deleteButton = wrapper.find('ul > li:first-child .remove');
        deleteButton.trigger('click');
        expect(wrapper.vm.reminders.length).toBe(1)
        // expect(remindersList()).not.toContain('Go To the store');
    })
    function addReminder(body){
        let newReminder = wrapper.find('.new-reminder');
        newReminder.element.value = 'Go To the store';
        newReminder.trigger('input');
        wrapper.find('button').trigger('click');
    }
    function remindersList(){
        return wrapper.find('ul').text();
    }
});