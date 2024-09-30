function a(firstname){
    this.firstname = firstname;
}
a.prototype.speak = function(){
    console.log(`my name is ${this.firstname} ${this.lastname}`)
}
function b(firstname,lastname){
    a.call(this,firstname)
    this.lastname = lastname;
}

b.prototype = Object.create(a.prototype);
b.prototype.constructor = b;
b.prototype.run = function(){
    console.log(`${this.firstname} is running`)
}
const person2 = new b('mukesh','modi');
console.log({person2})
person2.speak();
person2.run();
