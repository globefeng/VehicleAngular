import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleInfo, VehicleMakerInfo, NewVehicleInfo } from './vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  public getVehicleMakers(): Observable<VehicleMakerInfo[]> {
    const url = 'http://localhost:63310/api/VehicleMakers';

    return this.http.get<VehicleMakerInfo[]>(url);
  }

  public addVehicle(vehicle: NewVehicleInfo): Observable<void> {
    const url = 'http://localhost:63310/api/Vehicles';

    return this.http.post<void>(url, vehicle);
  }

  public updateVehicle(vin: string, vehicle: NewVehicleInfo): Observable<void> {
    const url = 'http://localhost:63310/api/Vehicles/' + vin;

    return this.http.put<void>(url, vehicle);
  }

  public getVehicles(): Observable<VehicleInfo[]> {
    const url = 'http://localhost:63310/api/Vehicles';

    return this.http.get<VehicleInfo[]>(url);
  }

  public getVehicle(vin: string): Observable<VehicleInfo> {
    const url = 'http://localhost:63310/api/Vehicles/' + vin.toString();

    return this.http.get<VehicleInfo>(url);
  }

  public deleteVehicle(vin: string): Observable<void> {
    const url = 'http://localhost:63310/api/Vehicles/' + vin.toString();

    return this.http.delete<void>(url);
  }  
}
