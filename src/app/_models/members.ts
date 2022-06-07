import { photo } from "./photos";
export interface members {
    id :number;
    username : string;
    photoUrl:string;
    age:number;
    knownAs:string;
    created:Date;
    lastActive:Date;
    gender:string;
    introduction : string;
    lookingFor:string;
    intrests: string;
    city:string;
    country:string;
    photos:photo[];

}