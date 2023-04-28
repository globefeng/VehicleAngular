import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { VehicleMakerInfo, VehicleInfo } from '../vehicle';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  myDate: Date = new Date();
  vin: string = '';
  makers: VehicleMakerInfo[];

  confirmResult: any;

  vehicleForm = this.fb.group({
    vin: ['', Validators.required],
    year: [0, Validators.required],
    model: ['', Validators.required],
    pass: [false, Validators.required],
    inspectionDate: [this.myDate],
    inspectorName: [''],
    inspectionLocation: [''],
    notes: [''],
    makerId: [0, Validators.required],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public vehicleService: VehicleService) {
      this.makers = [];

      route.params.subscribe(val => {
        this.vehicleService.getVehicleMakers().subscribe((response: VehicleMakerInfo[]) => {
          if (Array.isArray(response)) {
            this.makers = response;
          }
        });
      });      
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.vin = routeParams.get('vin') || '';

    if (!this.vin || this.vin.length === 0) return;

    this.vehicleService.getVehicle(this.vin).subscribe((response: VehicleInfo) => {
      this.vehicleForm.patchValue(response);
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
      this.vehicleService.updateVehicle(this.vin, formData).subscribe(() => {
        this.router.navigate(['vehicles']);
      });
    }
  }
}