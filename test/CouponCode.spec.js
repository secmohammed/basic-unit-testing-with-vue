import { mount } from 'vue-test-utils';
import expect from 'expect';
import CouponCode from '../src/components/CouponCode.vue'

describe('CouponCode',() => {
    let wrapper ;
    beforeEach(() =>{
         wrapper = mount(CouponCode)
         wrapper.setData({
            coupons : [
                {
                    code : '50FF',
                    message : '50% off !',
                    discount : 50
                },
                {
                    code : 'FREE',
                    message : 'Entirely Free',
                    discount : 100
                }
            ]});
     })

    it('accepts a coupon code' , () => {
        expect(wrapper.contains('input.coupon-code')).toBe(true);
    })
    it('validates a real user-provided coupon code', () => {
        enterCoupon('50FF');
        expect(wrapper.vm.valid).toBe(true)
        expect(wrapper.html()).toContain('Coupon Redeemed: 50% off !');

    })
    it('validates a fake user-provided coupon code', () => {
        enterCoupon('not real one');
        expect(wrapper.vm.valid).toBe(false)
        expect(wrapper.html()).toContain('Invalid Coupon Code');

    })

    it('broadcasts the percentage discount when a valid coupon code is applied', () => {
        // wrapper.setData({
        //     code : '50FF'
        // })
        // wrapper.vm.validate();
        enterCoupon('50FF');
        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
    })
    function enterCoupon(code){
        let couponCode = wrapper.find('input.coupon-code');
        couponCode.element.value = code
        couponCode.trigger('input');
    }
})
