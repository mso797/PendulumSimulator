//defining the pendulum class
class Pendulum {
    constructor(id, mass, length, theta) {
        //defined properties
        this._id = id;
        this._mass = mass;
        this._length = length;
        this._theta = theta;
        this.b=0.998;

        //environmental properties
        this.wind = null;
        this.g = -9.81;

        //derived properties
        this.x=Math.sin(this.theta)*this.length;
        this.y=Math.cos(this.theta)*this.length;
        this.angVel=0.0;
        this.angAcc= this.g/this.length*Math.sin(this.theta);

        //define neighbors
        if(this.id>1){
            this.left=this.id-1;
        }
        else{
            this.left=null;
        }
        if(this.id<5){
            this.right=this.id+1;
        }
        else{
            this.right=null;
        }
    }
    set id(id) {
        this._id = parseInt(id);
    }
    get id() {
        return this._id;
    }
    set mass(mass) {
        this._mass = parseFloat(mass);
    }
    get mass() {
        return this._mass;
    }
    set length(length) {
        this._length = parseFloat(length);
    }
    get length() {
        return this._length;
    }
    set theta(theta) {
        this._theta = parseFloat(theta);
    }
    get theta() {
        return this._theta;
    }
    set b(b) {
        this._b = parseFloat(b);
    }
    get b() {
        return this._b;
    }

    roundProps(){
        //more efficient way to round since toFixed returns string
        this.theta=Math.round(this.theta*10000)/10000;
        this.x=Math.round(this.x*10000)/10000;
        this.y=Math.round(this.y*10000)/10000;
        this.angAcc=Math.round(this.angAcc*10000)/10000;
        this.angVel=Math.round(this.angVel*10000)/10000;
    }
    
    updatePos(timestep){ 
        this.angAcc = -this.b/this.mass*this.theta+this.g/this.length*Math.sin(this.theta);
        this.angVel +=this.angAcc*timestep;
        this.angVel *= this.b
        this.theta += this.angVel*timestep;
        this.x=Math.sin(this.theta)*this.length;
        this.y=Math.cos(this.theta)*this.length;
        this.roundProps();
        console.log(this.theta, this.x, this.y);
 
    }
}

module.exports = Pendulum;