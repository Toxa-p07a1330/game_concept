import {Point} from "./Point.mjs";
import {MatrixOperations} from "./MatrixOperations.mjs";
import {Line} from "./Line";

class Polygon{
  point1 = new Point();
  point2 = new Point();
  point3 = new Point();
  constructor(point1, point2, point3) {
    this.point1 = point1?point1:new Point();
    this.point2 = point2?point2:new Point();;
    this.point3 = point3?point3:new Point();;
  }
  get point1(){
    return this.point1;
  }
  set point1(point){
    this.point1 = point;
  }
  get point2(){
    return this.point2;
  }
  set point2(point){
    this.point2 = point;
  }
  get point3(){
    return this.point3;
  }
  set point3(point){
    this.point3 = point;
  }
  toString(){
    return `{"point1": ${this.point1.toString()},{"point2": ${this.point2.toString()},{"point3": ${this.point3.toString()}}`;
  }

  /**
   * @returns {object} - coefficients for equation of plane,
   * that contains current polygon
   */
  getPlaneEquation(){
    let a1 = this.point2.x - this.point1.x;
    let b1 = this.point2.y - this.point1.y;
    let c1 = this.point2.z - this.point1.z;
    let a2 = this.point3.x - this.point1.x;
    let b2 = this.point3.y - this.point1.y;
    let c2 = this.point3.z - this.point1.z;
    let a = b1 * c2 - b2 * c1;
    let b = a2 * c1 - a1 * c2;
    let c = a1 * b2 - b1 * a2;
    let d = (- a * this.point1.x- b * this.point1.y - c * this.point1.z);
    let plane = {
      a:a,
      b:b,
      c:c,
      d:d
    }
    return plane
  }
  /**
   * @param {object} line - line in space crossing this plane
   * @param {object} plane - coefficient for equation of plane that is crossed by line
   * @returns {object} - coordinates of point of crossage
   */
  getCrossingPointOfLIneAndPlane(line, plane){
    let point1 = line.point1;
    let point2 = line.point2;
    let n= point2.y - point1.y;
    let m = point2.x - point1.x;
    let p = point2.z - point1.z;
    let matrixLeft = [
      [n, -1*m, 0],
      [p, 0, -1*m],
      [plane.a, plane.b, plane.c]
    ]
    let matrixRight = [[n*point2.x-m*point2.y],[p*point2.x-m*point2.z],[-1*plane.d]]
    let matrixLeft_1 = MatrixOperations.InverseMatrix(matrixLeft);
    let solution = MatrixOperations.MultiplyMatrix(matrixLeft_1, matrixRight);
    let point = {
      x:solution[0][0],
      y:solution[1][0],
      z:solution[2][0],
    }
    return point;
  }
  /**
   * @param {object} point - some point in space
   * @returns {boolean} - is that point inside of current polygon
   */
  isInsidePolygon(point){
    let squareFull = this.getSquare(this.point1, this.point2, this.point3);
    let square1 = this.getSquare(point, this.point2, this.point3);
    let square2 = this.getSquare(point, this.point1, this.point3);
    let square3 = this.getSquare(point, this.point2, this.point1);
    const dimension = 0.0001;
    /*console.log("s1 " + square1)    debug todo remove
    console.log("s2 " + square2)
    console.log("s3 " + square3)
    console.log("s " + squareFull)*/
    return Math.abs(squareFull - (square1+square2+square3)) < dimension;
  }
  /**
   * @param {object} polygon - polygon is crossing need to check
   * @returns {object} - 3 points that are lying on prolongation of passed polygon borders
   * and in current polygon plane
   */
  getPolygonBorderLinesCrossPoints(polygon){
    let plane = this.getPlaneEquation();
    let crossPoint1 = this.getCrossingPointOfLIneAndPlane(new Line(polygon.point1, polygon.point2), plane);
    let crossPoint2 = this.getCrossingPointOfLIneAndPlane(new Line(polygon.point1, polygon.point3), plane);
    let crossPoint3 = this.getCrossingPointOfLIneAndPlane(new Line(polygon.point3, polygon.point2), plane)
    let crossingPoints = {
      p1: crossPoint1,
      p2: crossPoint2,
      p3: crossPoint3,
    }
    return crossingPoints;
  }
  /**
   * @param {object} polygon - polygon is crossing need to check
   * @returns {boolean} - is any of border of passed polygon crossing my plane inside my borders
   */
  doesPolygonCrossMe(polygon){
    let points = this.getPolygonBorderLinesCrossPoints(polygon);
    return this.isInsidePolygon(points.p1) && polygon.isInsidePolygon(points.p1)
        ||
        this.isInsidePolygon(points.p2) && polygon.isInsidePolygon(points.p2)
        ||
        this.isInsidePolygon(points.p3) && polygon.isInsidePolygon(points.p3);
  }
  /**
   * @param {object} polygon - polygon is crossing need to check
   * @returns {boolean} - is passed polygon crossing me or am I crossing it
   */
  arePolygonsCrossing(polygon){     //needs tests
    return this.doesPolygonCrossMe(polygon) && polygon.doesPolygonCrossMe(this);
  }

  /**
   * @param {object} point1 - vertex of triangle
   * @param {object} point2 - vertex of triangle
   * @param {object} point3 - vertex of triangle
   * @returns {float} - square of triangle
   */
  getSquare(point1, point2, point3){
    let a = Point.getDistance(point1, point2);
    let b = Point.getDistance(point2, point3);
    let c = Point.getDistance(point1, point3)
    let p = (a+b+c)/2;
    let square = Math.sqrt(p*(p-a)*(p-b)*(p-c));
    return square;
  }


}
/*
console.log(JSON.stringify(new Polygon(new Point(), new Point(0,3,0), new Point(3,0,0))
    .isInsidePolygon(new Point(2,2,0))))

*/
export  {Polygon}
