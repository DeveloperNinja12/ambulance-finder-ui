export interface IDoctor {
    doctorName: string;
    designation: string;
    location: string;
    careerObject: string;
    qualifications: Array<string>;
    experience: string;
    fees: number;
    availability: string;
    languages: Array<string>;
    email: string;
};

export interface IAmbulance {
    vehicleNumber: string;
    vehicleType: string;
    vehicleModel: string;
    vehicleYear: number;
    vehicleColor: string;
    vehicleAssignedDriver: string;
    vehicleLocation: string;
    vehicleContactNumber: string;
    vehicleHospital: string;
}