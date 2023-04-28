import { Component } from '@angular/core';
import { VehicleMakerInfo } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  myDate: Date | null = null;
  makers: VehicleMakerInfo[];

  vehicleForm = this.fb.group({
    vin: [null, Validators.required],
    year: [null],
    model: [null],
    pass: [null],
    inspectionDate: [this.myDate],
    inspectorName: [null],
    inspectionLocation: [null],
    notes: [''],
    makerId: [null, Validators.required],
  });



  constructor(private fb: FormBuilder, public vehicleService: VehicleService, private route: ActivatedRoute, private router: Router) {
    this.makers = [];

    route.params.subscribe(val => {
      this.vehicleService.getVehicleMakers().subscribe((response: VehicleMakerInfo[]) => {
        if (Array.isArray(response)) {
          this.makers = response;
        }
      });
    });
  }
  
  onSubmit() {
    if (!this.vehicleForm.valid) {
      alert('Please correct the errors')
    } else {
      var formData: any = {
        'vin': this.vehicleForm.value.vin,
        'year': this.vehicleForm.value.year,
        'model': this.vehicleForm.value.model,
        'pass': this.vehicleForm.value.pass,
        'inspectionDate': this.vehicleForm.value.inspectionDate,
        'inspectorName': this.vehicleForm.value.inspectorName,
        'inspectionLocation': this.vehicleForm.value.inspectionLocation,
        'notes': this.vehicleForm.value.notes,
        'makerId': this.vehicleForm.value.makerId
      }
      this.vehicleService.addVehicle(formData).subscribe({
        next: data => {
          this.router.navigate(['vehicles']);
        },
        error: error => {
          alert('Fail to add vehicle')
        }
      });
    }
  }
}