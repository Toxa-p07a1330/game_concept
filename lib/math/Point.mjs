class Point{
    x=0;
    y=0;
    z=0;
    constructor(x,y,z) {
        this.x = x?x:0;
        this.y = y?y:0;
        this.z = z?z:0;
    }
    get x(){
        return this.x;
    }
    set x(x){
        this.x = x;
    }

    get y(){
        return this.y;
    }
    set y(y){
        this.y = y;
    }

    get z(){
        return this.z;
    }
    set z(z){
        this.z = z;
    }

    toString(){
        return `{"x": ${this.x}, "y": ${this.y}, "z": ${this.z}}`;
        //for debug
    }
    /**
     * @param {object} point1 - coordinates of first point
     * @param {object} point2 - coordinates of second point
     * @returns {number} - distance between points
     */
    static getDistance(point1,  point2){
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) +Math.pow(point2.y - point1.y, 2)+
            Math.pow(point2.z - point1.z, 2)  )
    }

}

//console.log(new Point(2,3,4).toString()); //debug todo remove

export  {Point}
