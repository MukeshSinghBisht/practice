class Phonepay {
    pay(amount: number){
        console.log('paypal api charge method called! for amount: ',amount)
    }
}
class Clearjunction{
    pay(amount: number){
        console.log('razorpay apis charge called!for amount: ',amount)
    }
}
class Stripe{
    capture(amount: number){ // its pay method name is different
        console.log('razorpay apis capture called!for amount: ',amount)
    }
}
class StripePaymentMethodAdaptor{
    pay(amount: number): boolean {
        const stripe = new Stripe();
        stripe.capture(amount);
        return true;
    };
}


const phonepay = new Phonepay();
phonepay.pay(20);
const paypal = new Clearjunction();
paypal.pay(100);
const stripe = new StripePaymentMethodAdaptor();
stripe.pay(20);

console.log('this way in adaptor design pattern we can adapt a new payment method with differnt method name in our system!')