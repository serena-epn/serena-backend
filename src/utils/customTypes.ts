export interface TPatient{
    _id:string
    name: string;
    lastname:string;
    birthdate:string;
    contactInfo:string;
    idNumber:string;
  
}

export interface TUser{
  _id:string,
  name: string;
  lastname:string;
  birthdate:string;
  phone:string;
  email: string;
  deviceId:string;
  assignedPatient:TPatient
  accessToken: string;
}