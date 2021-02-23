import {Point} from "./Point.mjs";
import {Polygon} from "./Polygon.mjs";

class Surface{
    a1;
    a2;
    b1;
    b2;
    c1;
    c2;
    d0;

    constructor(a1,a2,b1,b2,c1,c2,d0) {
        this.a1 = a1?a1:0;
        this.a2 = a2?a2:0;
        this.b1 = b1?b1:0;
        this.b2 = b2?b2:0;
        this.c1 = c1?c1:0;
        this.c2 = c2?c2:0;
        this.d0 = d0?d0:0;
    }

    quadraticEquation = (a, b, c) => {
        if(a === 0)
            return null;
        let res = {};
        let D = b * b - 4 * a * c;
        console.log('D = ' + D);
        if(D < 0)
            return false;
        res['discriminant'] = D;
        let tmp = [];
        if(D === 0) {
            tmp.push((-b + Math.sqrt(D)) / (2 * a));
            return tmp;
        }
        else if(D > 0){
            let tmp = [];
            tmp.push((-b + Math.sqrt(D)) / (2 * a));
            tmp.push((-b - Math.sqrt(D)) / (2 * a));
            return tmp;
        }
        return res;
    }

    getPointsOfCrossedByLine(line){
        let a = this.a2*Math.pow(line.getEquation().m, 2)+
            this.b2*Math.pow(line.getEquation().n, 2) +this.c2*Math.pow(line.getEquation().p, 2);
        let b = this.a2*2*line.getEquation().m + line.getEquation.m*this.a1 +
            this.b2*2*line.getEquation().n + line.getEquation.n*this.b1 +
            this.c2*2*line.getEquation().p + line.getEquation.p*this.c1;
        let c = this.a2*line.getEquation().x1*line.getEquation().x1 + this.a1*line.getEquation().x1 +
            this.b2*line.getEquation().y1*line.getEquation().y1 + this.b1*line.getEquation().y1 +
            this.c2*line.getEquation().z1*line.getEquation().z1 + this.c1*line.getEquation().z1 + this.d0;
        let t = this.quadraticEquation(a,b,c);
        return t.map((value)=>{
            return new Point(line.getEquation().x1+value*line.getEquation().m,
                line.getEquation().y1+value*line.getEquation().n,
                line.getEquation().z1+value*line.getEquation().p,
            )
        })
    }
    getPointsOfCrossedByLineArray(lineArray){
        let rezultArray = [];
        for (let i of lineArray) {
            let temp = this.getPointsOfCrossedByLine(i);
            for (let j of temp)
                rezultArray.push(j)
        }
        return rezultArray;
    }
    getSortedGraphOfPoints(lineArray){
        let pointsNotVisited = this.getPointsOfCrossedByLineArray(lineArray);
        let visitedPoints = [];
        visitedPoints.push(pointsNotVisited[0])
        pointsNotVisited.shift();
        while (pointsNotVisited.length){
            pointsNotVisited.sort((p1,p2)=>{
                return Point.getDistance(visitedPoints[visitedPoints.length-1], p1) -
                    Point.getDistance(visitedPoints[visitedPoints.length-1], p2);
            })
            visitedPoints.push(pointsNotVisited[0])
            pointsNotVisited.shift();
        }
    }
    getPolygonMeshingArray(sortedPointsArray){
        let polygonArray = [];
        for (let i = 9; i< sortedPointsArray-3; i++)
            polygonArray.push(new Polygon(sortedPointsArray[i],sortedPointsArray[i+1],sortedPointsArray[i+2] ))
        return polygonArray;
    }
    toString(){
        return `Equation: ${this.a2}*x^2 + ${this.a1}*x + `+
            `${this.b2}*y^2 + ${this.b1}*y + ${this.c2}*z^2 + ${this.c1}*z + ${this.d0} = 0`
    }
}

console.log(new Surface(1,2,3,4,5,6,7).toString())
