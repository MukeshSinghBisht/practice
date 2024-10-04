/* requirement: create api req handler for payment on behalf of amazon for indian
 store and american store. And each store can have mutiple  different or similar
  payment methods. 
*/

/* steps:
  1.we will create abstract class for payment methods
  2.then concrete payment methods: 1. credit card 2.paypal 3. upi 4.paytm 5.venmo
  3.then abstract class for factories of payment methods
  4.then concrete factories for these payment methods: indian store and american store 
  5.then create abstractPaymentfactory for choosing a factory
  6.then controller for client code where we will create a factory 
  7.then on that payment factory will get payment method 
  8. then on that we will call processpayment method
  9. and for mocking request from UI we will call api which will be handled 
  defined in controller
*/
abstract class PaymentMethod {
  constructor(){
  }
  abstract processPayment(amount: number): void;
}

class CreditCardPayment extends PaymentMethod{
  constructor(){
    super();
  }
  processPayment(amount: number): boolean {
    console.log(`processing credit card payment of ${amount}`);
    return true;
  }
}

class PaypalPayment extends PaymentMethod{
  constructor(){
    super();
  }
  processPayment(amount: number): boolean{
    console.log(`processing paypal payment of amount ${amount}`);
    return true;
  }
}

class PaytmPayment extends PaymentMethod{
  constructor(){
    super();
  }
  processPayment(amount: number): boolean{
    console.log(`processing paytm payment of amount ${amount}`);
    return true;
  }
}

class VenmoPayment extends PaymentMethod{
  constructor(){
    super();
  }
  processPayment(amount: number): boolean{
    console.log(`processing Venmo payment of amount ${amount}`);
    return true;
  }
}

class UpiPayment extends PaymentMethod{
  constructor(){
    super();
  }
  processPayment(amount: number): boolean{
    console.log(`processing upi payment of amount ${amount}`);
    return true;
  }
}

abstract class PaymentMethodFactory {
  constructor(){
  }
  abstract createPaymentMethod(method: string): PaymentMethod
}

class IndianPaymentMethodFactory extends PaymentMethodFactory{
  constructor(){
    super();
  }
  createPaymentMethod(method: string): PaymentMethod {
    switch (method){
      case 'creditcard':
        return new CreditCardPayment();
      case 'paypal':
        return new PaypalPayment();
      case 'upi':
        return new UpiPayment();
      case 'paytm':
        return new PaytmPayment();
      case 'venmo':
        throw new Error('Not available for india yet!')
      default:
        throw new Error('Payment method not found!')
    }
  }
}

class USAPaymentMethodFactory extends PaymentMethodFactory{
  constructor(){
    super();
  }
  createPaymentMethod(method: string): PaymentMethod {
    switch (method){
      case 'creditcard':
        return new CreditCardPayment();
      case 'paypal':
        return new PaypalPayment();
      case 'upi':
        throw new Error('Not available for USA yet!');
      case 'paytm':
        throw new Error('Not available for USA yet!')
      case 'venmo':
        return new VenmoPayment();
      default:
        throw new Error('Payment method not found!')
    }
  }
}

class AbstractPaymentFactory {
  static createPaymentFactory(type: string): PaymentMethodFactory{
    switch(type){
      case 'india':
        return new IndianPaymentMethodFactory();
      case 'usa': 
        return new USAPaymentMethodFactory();
      default:
        throw 'Payment method factory not available!'
    }
  }
}

class PaymentController{
  processPayment(req, res): any {
    const data = req.body;
    const factory = AbstractPaymentFactory.createPaymentFactory(data.type);
    const method = factory.createPaymentMethod(data.method);
    method.processPayment(data.amount);
    return res.send(200, { sucesss: true })
  }
}

// client code
let req = {
  body: {
    method: 'paytm',
    type: 'india',
    amount: 100
  }
}
let res = {
  send: (status, response)=>{
    console.log({status, response})
  }
}
new PaymentController().processPayment(req, res);

req = {
  body: {
    method: 'venmo',
    type: 'usa',
    amount: 100
  }
}
res = {
  send: (status, response)=>{
    console.log({status, response})
  }
}
new PaymentController().processPayment(req, res);