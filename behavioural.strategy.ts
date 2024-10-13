/*
we use behaviour design patterns while we are having interactions between diffe
-rent kind of objects


in strategy pattern when we want to set strategy or algorithm to do any task 
and want to be able switch dynamically between different strategies.


Points in comparison to creational factory method, whenever we want to dynamic
ally change the behaviour of any object then we might choose it but factory m
ethod is helping creating the instance which is a permanent activity, and do not
change dynamically.
    
Example : when we create DIDs we can use factory but when we are choosing assigning 
these dids , then we can choose between the local or international strategy.

So in our project there were completely different ways for billing any number to 
some account based on if this number is international or local

if local we might apply some base rate plus regulatory fees
 but in internaitonal strategy we might add some extra fees for being international 
 and may applying vat on them like in europe and gst might be in case india
* */
abstract class BillingStrategy{
    abstract processBilling(phonenumber: string): boolean;
}
class LocalBilling extends BillingStrategy{
    processBilling(phonenumber: string): boolean{
        console.log('charging base fee!');
        console.log('charging regulatory fees!');
        console.log('billed local US number successfully');
        return true;
    }
}
class InternationalBilling extends BillingStrategy{
    processBilling(phonenumber: string): boolean{
        console.log('charging base fee!');
        console.log('charging GST.');
        console.log('additional fee on international numbers.');
        console.log('billed international number  successfully');
        return true;
    }
}
class Billing{
    strategy: BillingStrategy = null;
    setStrategy(numberType: string){
        const strategy = numberType === 'local'? new LocalBilling() : new InternationalBilling();
        this.strategy = strategy;
    }
    executeStrategy(number: string){
        this.strategy.processBilling(number);
    }
}


class BillingController{
    process(req, res){
        const billing = new Billing();
        billing.setStrategy(req.body.numberType);
        billing.executeStrategy(req.body.number);
        return res;
    }
}

// client side code
let req = {
    body:{
        numberType: 'local',
        number: '283748273' // local US number
    }
}
let res = {
    status: 200,
    data: null,
}

let resp = new BillingController().process(req, res)
console.log({resp});

req = {
    body:{
        numberType: 'international',
        number: '+918239238398' // local US number
    }
}
resp = new BillingController().process(req, res)
console.log({resp});

