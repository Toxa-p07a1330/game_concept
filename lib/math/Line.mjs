import {Point} from "./Point";
class Line{
    point1;
    point2;
    constructor(point1, point2) {
        this.point1 = point1?point1:new Point();
        this.point2 = point2?point2:new Point();
    }
    getEquation(){
        let m = this.point2.x - this.point1.x;
        let n = this.point2.y - this.point1.y;
        let p = this.point2.z - this.point1.z;
        return {
            m:m,
            n:n,
            p:p,
            x1:this.point1.x,
            y1:this.point1.y,
            z1:this.point1.z
        }
    }
    equationToString(){
        return `(x - ${this.getEquation().x1})/${this.getEquation().m} = `+
            `(y - ${this.getEquation().y1})/${this.getEquation().n}`+
            `(z - ${this.getEquation().z1})/${this.getEquation().p}`;
    }
}
export {Line}
