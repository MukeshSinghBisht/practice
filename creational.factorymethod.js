var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log('example creational pattern: factory method!');
console.log('creational design pattern helps in robust ways to craete objects to achieve some specific objective.');
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod(name, description) {
        this.name = name;
        this.description = description;
    }
    PaymentMethod.prototype.getDetails = function () {
        return "Payment Method: ".concat(this.name, " - ").concat(this.description);
    };
    PaymentMethod.prototype.getPaymentMethod = function () {
        return this.name;
    };
    PaymentMethod.prototype.getDescription = function () {
        return this.description;
    };
    return PaymentMethod;
}());
var CreditCard = /** @class */ (function (_super) {
    __extends(CreditCard, _super);
    function CreditCard(name, description) {
        return _super.call(this, name, description) || this;
    }
    CreditCard.prototype.processPayment = function () {
        return "Processing credit card payment...";
    };
    return CreditCard;
}(PaymentMethod));
var Razorpay = /** @class */ (function (_super) {
    __extends(Razorpay, _super);
    function Razorpay(name, description) {
        return _super.call(this, name, description) || this;
    }
    Razorpay.prototype.processPayment = function () {
        return "Processing Razorpay bank transfer payment...";
    };
    return Razorpay;
}(PaymentMethod));
var Paytm = /** @class */ (function (_super) {
    __extends(Paytm, _super);
    function Paytm(name, description) {
        return _super.call(this, name, description) || this;
    }
    Paytm.prototype.processPayment = function () {
        return "Processing Paytm payment...";
    };
    return Paytm;
}(PaymentMethod));
var CCAVENUE = /** @class */ (function (_super) {
    __extends(CCAVENUE, _super);
    function CCAVENUE(name, description) {
        return _super.call(this, name, description) || this;
    }
    CCAVENUE.prototype.processPayment = function () {
        return "Processing CCAvenue payment...";
    };
    return CCAVENUE;
}(PaymentMethod));
var Paypal = /** @class */ (function (_super) {
    __extends(Paypal, _super);
    function Paypal(name, description) {
        return _super.call(this, name, description) || this;
    }
    Paypal.prototype.processPayment = function () {
        return "Processing PayPal payment...";
    };
    return Paypal;
}(PaymentMethod));
var GPay = /** @class */ (function (_super) {
    __extends(GPay, _super);
    function GPay(name, description) {
        return _super.call(this, name, description) || this;
    }
    GPay.prototype.processPayment = function () {
        return "Processing GPay payment...";
    };
    return GPay;
}(PaymentMethod));
var PaymentFactory = /** @class */ (function () {
    function PaymentFactory() {
    }
    PaymentFactory.createPaymentMethod = function (type) {
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
                throw new Error("Invalid payment method: ".concat(type));
        }
    };
    return PaymentFactory;
}());
// controller api handler
var PaymentController = /** @class */ (function () {
    function PaymentController() {
    }
    PaymentController.processPayment = function (req, res) {
        var paymentMethod = PaymentFactory.createPaymentMethod(req.body.paymentMethod);
        var paymentResult = paymentMethod.processPayment();
        console.log(paymentResult, 'payment result');
        res.status(200).json({ message: 'Payment successful! for payment method: ' + paymentMethod.getPaymentMethod() });
    };
    return PaymentController;
}());
var req = {
    body: {
        paymentMethod: 'credit-card',
    },
};
var res = {
    status: function (code) { return ({
        json: function (data) {
            console.log("Response status: ".concat(code));
            console.log(data, 'response data');
        }
    }); }
};
PaymentController.processPayment(req, res);
req = {
    body: {
        paymentMethod: 'razorpay',
    },
};
res = {
    status: function (code) { return ({
        json: function (data) {
            console.log("Response status: ".concat(code));
            console.log(data, 'response data');
        }
    }); }
};
PaymentController.processPayment(req, res);
