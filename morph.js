let rid = null;
const spring = 0.5;
const friction = 0.5;
let ry = [];

class pathsPair {  
constructor(thePath, yes, no) {
    this.path = thePath;
    this.yes = yes;    
    this.no = no;    
    this.vals = this.getArgsRy(yes);    
    this.target = this.getArgsRy(no);    
    this.vel = this.initRy();  
    }  
initRy() {    
    let Ry = [];    
    this.vals.map(t => {      
    let ry = [];      
    t.map(() => {
    ry.push(0);});      
    Ry.push(ry);});
    return Ry;  
    }  
getArgsRy(path) {
    let d = path.getAttribute("d").replace(/\r?\n|\r/g, ""); 
    //remove breaklines    
    if (d.charAt(0) == "m") {d = "M" + d.slice(1);}
    let argsRX = /(?=[a-zA-Z])/;
    let args = d.split(argsRX);
    //console.log(args)
    let ArgsRy = [];
    args.map(arg => {let argRy = arg.slice(1).replace(/\-/g, " -").split(/[ ,]+/);     
    argRy.map((p, i) => {if (p == "") {argRy.splice(i, 1);}     
    });          
    for (let i = 0; i < argRy.length; i++) {
            argRy[i] = parseFloat(argRy[i]);}      
            argRy.unshift(arg[0]);      
            ArgsRy.push(argRy);    
        });    
    return ArgsRy;  }  
 morph() {
     let newD = "";    
     this.vals.map((v, vi) => {      
     let newStr = v[0];      
     for (let i = 1; i < v.length; i++) {        
     this.updateProp(vi, i);        
     newStr += v[i].toFixed(3) + " ";      
     }      
     newD += newStr + " ";    
 });    
 this.path.setAttributeNS(null, "d", newD);   
 }  
 
 updateProp(vi, i) {
     let dist = this.target[vi][i] - this.vals[vi][i];    
     let acc = dist * spring;    
     this.vel[vi][i] += acc;    
     this.vel[vi][i] *= friction;    
     this.vals[vi][i] += this.vel[vi][i];  
     }  
 sayNO() {
     this.target = this.getArgsRy(this.no);
     }  
sayYES() {
    this.target = this.getArgsRy(this.yes);
}
}
class CheckBox {
  constructor(cb) {
      this.pairs = [];    
      this.checkbox = cb;    
      this.addEvent();  
  }
  addEvent() {
      let _this = this;
      this.checkbox.addEventListener("change", function() {
            if (rid) {window.cancelAnimationFrame(rid);
                      rid = null;
                      }
            if (_this.checkbox.checked) {
                    _this.pairs.map(pair => pair.sayYES());      
                    } else {       
                     _this.pairs.map(pair => pair.sayNO());
            
            }
            Frame(); 
            });
   }
 }
 let c = new CheckBox(checkbox4);
 c.pairs.push(new pathsPair(_12, n,y));
 c.pairs.push(new pathsPair(_22, o,e));
 c.pairs.push(new pathsPair(_32, O,s));
 ry.push(c);
 
 function Frame() {  
     rid = window.requestAnimationFrame(Frame);  
     ry.map(e => {e.pairs.map(pair => pair.morph()); });
     }
     
Frame();
