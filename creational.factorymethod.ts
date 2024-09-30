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

class PaymentFactory {
  static createPaymentMethod(type: string): PaymentMethod {
    switch (type) {
      case 'credit-card':
        return new CreditCard('Credit Card', 'Pay with your credit card');
      case 'razorpay':
        return new Razorpay('Razorpay', 'Pay with your bank account');
      case 'paytm':
        return new Paytm('Paytm', 'Pay with your Paytm wallet');
      case 'ccavenue':
        return new CCAVENUE('CCAvenue', 'Pay with your CCAvenue account');
      case 'paypal':
        return new Paypal('PayPal', 'Pay with your PayPal account');
      case 'gpay':
        return new GPay('GPay', 'Pay with your GPay account');
      default:
        throw new Error(`Invalid payment method: ${type}`);
    }
  }
}

// controller api handler


class PaymentController {
  static processPayment(req, res) {
    const paymentMethod = PaymentFactory.createPaymentMethod(req.body.paymentMethod);
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
PaymentController.processPayment(req, res);

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

