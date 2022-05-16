export class OKTMOData{
    constructor(){
        this.places = new Array();
    }
    addPlace(place){
        this.places.push(place);
    }
    getPlaces(){
        return this.places;
    }
}