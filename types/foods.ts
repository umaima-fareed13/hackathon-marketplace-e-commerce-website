

export interface Food{
    _id: string;
    name : string;
    _type : "food";
    price : number;
    image : {
        asset :{
            _ref : string;
            _type : "image";
        }
    };
    originalPrice : string;
    description : string;
    inventory : number;
}