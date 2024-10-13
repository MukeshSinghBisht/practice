console.log('creational design pattern helps in robust ways to craete objects to achieve some specific objective.')
console.log('client is assumed to be controller method, which is handling req res only.')
console.log(' factory method: creates desired payment method object based on type of payment method, and client not need to decide which class to instantiate.')

abstract class PaymentMethod {
    name: string;
    description: string;
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
  getDetails() {
    return `Payment Method: ${this.name} - ${this.description}`;
  }
  getPaymentMethod() {
    return this.name;
  }
  getDescription() {
    return this.description;
  }
  abstract processPayment(): string;
}

class CreditCard extends PaymentMethod {
  constructor(name: string, description: string) {
    super(name, description);
  }
  processPayment(): string {
    return `Processing credit card payment...`;
  }
}

class Razorpay extends PaymentMethod {
  constructor(name: string, description: string) {
    super(name, description);
  }
  processPayment(): string {
    return `Processing Razorpay bank transfer payment...`;
  }
}

class Paytm extends PaymentMethod {
  constructor(name: string, description: string) {
    super(name, description);
  }
  processPayment(): string {
    return `Processing Paytm payment...`;
  }
}

class CCAVENUE extends PaymentMethod {
  constructor(name: string, description: string) {
    super(name, description);
  }
  processPayment(): string {
    return `Processing CCAvenue payment...`;
  }
}

class Paypal extends PaymentMethod {
  constructor(name: string, description: string) {
    super(name, description);
  }
  processPayment(): string {
    return `Processing PayPal payment...`;
  }
}
class GPay extends PaymentMethod {
  constructor(name: string, description: string) {
    super(name, description);
  }
  processPayment(): string {
    return `Processing GPay payment...`;
  }
}

// controller api handler


class PaymentController {
  static processPayment(req, res) {
    const type = req.body.paymentMethod;
    let paymentMethod = null;
    switch (type) {
      case 'credit-card':
        paymentMethod = new CreditCard('Credit Card', 'Pay with your credit card');
        break;
      case 'razorpay':
        paymentMethod = new Razorpay('Razorpay', 'Pay with your bank account');
        break;
      case 'paytm':
        paymentMethod = new Paytm('Paytm', 'Pay with your Paytm wallet');
        break;
      case 'ccavenue':
        paymentMethod =  new CCAVENUE('CCAvenue', 'Pay with your CCAvenue account');
        break;
      case 'paypal':
        paymentMethod = new Paypal('PayPal', 'Pay with your PayPal account');
        break;
      case 'gpay':
        paymentMethod = new GPay('GPay', 'Pay with your GPay account');
        break;
      default:
        throw new Error(`Invalid payment method: ${type}`);
    }
    const paymentResult = paymentMethod.processPayment();
    console.log(paymentResult, 'payment result');
    res.status(200).json({ message: 'Payment successful! for payment method: '+ paymentMethod.getPaymentMethod() });
  }
}

let req = {
    body: {
        paymentMethod: 'credit-card',
    },
};
let res = {
    status: (code: number) => ({
        json: (data: any) => {
            console.log(`Response status: ${code}`);
            console.log(data, 'response data');
        }
    })
}
PaymentController.processP  ayment(req, res);

req = {
    body: {
        paymentMethod: 'razorpay',
    },
};
res = {
    status: (code: number) => ({
        json: (data: any) => {
            console.log(`Response status: ${code}`);
            console.log(data, 'response data');
        }
    })
}
PaymentController.processPayment(req, res);

