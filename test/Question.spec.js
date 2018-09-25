import Question from '../src/components/Question.vue'
import { mount } from 'vue-test-utils';
import expect from 'expect';
import moxios from 'moxios'
describe('Question',() => {
    let wrapper;
    beforeEach(() => {
        moxios.install();
        wrapper = mount(Question,{
            propsData : {
                dataQuestion : {
                    title : 'The title',
                    body : 'The body'
                }
            }
        });
    });
    afterEach(() => moxios.uninstall())
    it('presents the title and the body', () => {
        see('The title')
        see('The body')
    })
    it('can be edited',() => {
        expect(wrapper.contains('input[name=title]')).toBe(false);

        click('#edit')
        expect(wrapper.find('input[name=body]').element.value).toBe('The body');
        expect(wrapper.find('input[name=title]').element.value).toBe('The title');
    });
    it('hides the edit button during edit mode' , () => {
        click('#edit')
        expect(wrapper.contains('#edit')).toBe(false)
    })
    it.only('updates the question after being edited', (done) => {
        click('#edit')
        type('input[name=title]','Changed title')
        type('input[name=body]','Changed body')
        moxios.stubRequest(/questions\/.+/,{
            status : 200,
            response : {
                title : 'Changed title',
                body : 'Changed body'
            }
        })
        click('#update');
        see('Changed title')
        see('Changed body')
        moxios.wait(() => {
            // see('QQQQ')
            see('Your Question is updated')
            done()
        })
    })
    it('can cancel out the edit mode', () => {
        click('#edit')
        type('input[name=title]','Changed title');
        click('#cancel')
        see('The title')
    })
    let see = (text,selector = null) => {
        let wrap = selector ? wrapper.find(selector) : wrapper
        expect(wrap.html()).toContain(text);

    }
    let type = (selector,text) => {
        let node = wrapper.find(selector)
        node.element.value = text;
        node.trigger('input');
    }
    let click = selector => {
        wrapper.find(selector).trigger('click')
    }
})