export interface VehicleInfo {
  vin: string;
  year: number;
  model: string;
  pass: boolean;
  inspectionDate: Date;
  inspectorName: string;
  inspectionLocation: string;
  notes: string;
  makerName: string;
  makerId: number;
}

export interface NewVehicleInfo {
  vin: string;
  year: number;
  model: string;
  pass: boolean;
  inspectionDate: Date;
  inspectorName: string;
  inspectionLocation: string;
  notes: string;
  makerId: number;
}


export interface VehicleMakerInfo {
  id: number;
  name: string;
}


