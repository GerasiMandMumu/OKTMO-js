import {Place} from './Place.js';
import {Level} from './Level.js';

export class CSVLoader{
  
    static async loadAsync(name){
        let response = await fetch(name, {
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            }
          });
        let text = await response.text().catch(error => console.error(error));
        return text;
    }

    static load(name){
        let response = fetch(name, {
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            }
          });
          return response.then((response) => response.text()).catch(error => console.error(error));
    }
 
    

    static splitParser(text){ 
        let data = new Array();
        text = text.replaceAll("\"", "");
        let strings = text.split("\r\n");
        for(let i = 0; i < strings.length; i++){
          let s = strings[i];
          if(!s.includes("Населенные пункты") && !s.includes("Городские поселения") &&
          !s.includes("Межселенн") && !s.includes("Сельские поселения")){

            let loc = s.split(';');
            let first_val = loc[0];
            let second_val = loc[1];
            let third_val = loc[2];
            let fourth_val = loc[3];
            let name = loc[6];

            let test1 = Boolean("000".localeCompare(second_val));
            let test2 = Boolean("000".localeCompare(third_val));
            let test3 = Boolean("000".localeCompare(fourth_val));
            
            if(!test1 && !test2 && !test3){
              let code = first_val;
              let level = Level.REGION;
              addObject(data, name, code, level);      
            }
            else if(!test2 && !test3){
              let code = first_val + second_val;
              let level = Level.DISTRICT;
              addObject(data, name, code, level);
            }
            else if(!test3){
              let code = first_val + second_val + third_val;
              let level = Level.MUNICIPALITY;
              addObject(data, name, code, level); 
            }
            else{
              let code = first_val + second_val + third_val + fourth_val;
              let level = Level.LOCALITY;
              addObject(data, name, code, level);
            }
          }
        }
        return data;
    }


    static regexParser(text){ 
        let regExp = /(\d\d);(\d\d\d);(\d\d\d);(\d\d\d);(\d);(\d);([А-Яа-я]+.*?);/g;
        let data = new Array();
        text = text.replaceAll("\"", "");
        let strings = text.split("\r\n");
        for(let i = 0; i < strings.length; i++){
          let s = strings[i];
          if(!s.includes("Населенные пункты") && !s.includes("Городские поселения") &&
          !s.includes("Межселенн") && !s.includes("Сельские поселения")){
            
            let matchAll = s.matchAll(regExp); //match
            matchAll = Array.from(matchAll);
            
            let first_val = matchAll[0][1];
            let second_val = matchAll[0][2];
            let third_val = matchAll[0][3];
            let fourth_val = matchAll[0][4];
            let name = matchAll[0][7];
            
            if(second_val === "000" && third_val === "000" && fourth_val === "000"){
              let code = first_val;
              let level = Level.REGION;
              addObject(data, name, code, level);
            }
            else if(third_val === "000" && fourth_val === "000"){
              let code = first_val + second_val;
              let level = Level.DISTRICT;
              addObject(data, name, code, level);
            }
            else if(fourth_val === "000"){
              let code = first_val + second_val + third_val;
              let level = Level.MUNICIPALITY;
              addObject(data, name, code, level);
            }
            else{
              let code = first_val + second_val + third_val + fourth_val;
              let level = Level.LOCALITY;
              addObject(data, name, code, level);
            }
          }
        }
        return data;
    }
}

function addObject(data, name, code, level){
  let object = new Place(name, code, level);
  data.push(object);
}