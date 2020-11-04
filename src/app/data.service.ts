import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  mean 
  standardDeviation

  constructor() { }

  getMean(){
    return this.mean
  }

  getStandardDeviation(){
    return this.standardDeviation;
  }
    
  setStandardDeviation(data){
    var localmean = this.getMean();
    var sum =0
    data.forEach(element => {
      sum += Math.pow(Math.abs(localmean -  parseInt(element)), 2);
    });
    this.standardDeviation= Math.sqrt(sum / data.length);
   
  }
  
  setMean(data){
   
    var total = 0
    data.forEach(function (item) {
        total += parseInt(item)        
    });
    this.mean= total/ data.length;
  }

}
