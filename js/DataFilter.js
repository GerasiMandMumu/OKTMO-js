import {Place} from './Place.js';


function enableString(tag, n){
    tag.addEventListener('input', e =>{
        let strings = document.querySelector('.box').getElementsByTagName('table')[0].rows; 
        let val = e.target.value;
        let mainCode = 0;
        for(let i = 1; i < strings.length; i++){
            let string = strings[i];
            let code = string.cells[1].textContent;
            if (val.length >= 3){
                if(code.length == n){
                    let name = string.cells[2].textContent;
                    if(name.startsWith(val)){
                        mainCode = code;
                        string.style.display = '';
                    }
                    else{
                        string.style.display = 'none';
                    }
                }else{
                    if(mainCode === code.substr(0, n)){
                        string.style.display = '';
                    }
                    else{
                        string.style.display = 'none';
                    }
                }
            }else{
               string.style.display = '';
            }
        }
    });
}

export class DataFilter{
    
    static filterRegion(){
        let region = document.querySelector('.region');
        enableString(region, 2);
    }

    static filterDistrict(){ 
        let district = document.querySelector('.district');
        enableString(district, 5);
    }

    static filterLocality(){
        let locality = document.querySelector('.locality');
        locality.addEventListener('input', e =>{
            let count = 0;
            let strings = document.querySelector('.box-1').getElementsByTagName('table')[0].rows;            
            let val = e.target.value;
            for(let i = 0; i < strings.length; i++){
                let string = strings[i];
                let code = string.cells[1].textContent;
                if (val.length >= 3){
                    if(code.length == 11){
                        let name = string.cells[2].textContent;
                        if(name.startsWith(val) && count < 20){
                            string.style.display = '';
                            count++;
                        }
                        else{
                            string.style.display = 'none';
                        }
                    }else{
                        string.style.display = 'none';
                    }
                }else{
                    string.style.display = '';
                }
            }
        });
    }

    static toList(){
        let places = find();
        sort(places);
        show(places);
    }
}

function find(){
    let strings = document.querySelectorAll('tr');
    let places = new Array();
    for(let i = 1; i < strings.length; i++){
        let code = strings[i].children[1].textContent;
        if(code.length == 11){
            let name = strings[i].children[2].textContent;
            let level = strings[i].children[3].textContent;
            places.push(new Place(name, code, level));
        }
    }
    return places;
}

function sort(data){
    data.sort(function(a, b){
        if (a.name > b.name) return 1;
        if (a.name == b.name) return 0;
        if (a.name < b.name) return -1;
    });
}

function show(data){
    let tableArr=['<br><table><tbody>'];
    for(let i = 1; i < data.length; i++){
        tableArr.push(`<tr><td>${i}</td><td>${data[i - 1].code}</td><td>${data[i - 1].name}</td><td>${data[i - 1].level}</td></tr>`);
    }
    tableArr.push('</tbody></table>');
    document.querySelector(".box-1").innerHTML=tableArr.join('\n');
}