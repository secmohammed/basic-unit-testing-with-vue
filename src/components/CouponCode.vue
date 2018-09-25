<template>
<div>
    <input type="text" class="coupon-code" v-model="code" @input="validate">
    <p v-text="feedback"></p>
</div>
</template>
<script>
    export default {
        data(){
            return {
                valid : false,
                coupons : [],
                code : ''
            }
        },
        methods : {
            validate(){
                // this.valid = this.coupons.map(coupon => coupon.code).includes(this.code);
                this.valid = !! this.selectedCoupon
                if (this.valid) {
                    this.$emit('applied',this.selectedCoupon.discount)
                }
            }
        },
        computed : {
            feedback(){
                if(this.valid){
                    return 'Coupon Redeemed: ' + this.message
                }
                return 'Invalid Coupon Code'
            },
            selectedCoupon(){
              return this.coupons.find(coupon => coupon.code == this.code)
            },
            message (){
                if (this.selectedCoupon) {
                  return this.selectedCoupon.message
                }
            }
        }
    };
</script>