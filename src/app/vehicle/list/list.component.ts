import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { VehicleInfo } from '../vehicle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehicles: VehicleInfo[];
  collapsed: boolean = true;

  constructor(public vehicleService: VehicleService, private route: ActivatedRoute, private router: Router) {
    this.vehicles = [];

    route.params.subscribe(val => {
      this.vehicleService.getVehicles().subscribe((response: VehicleInfo[]) => {
        if (Array.isArray(response)) {
          this.vehicles = response;
        }
      });
    });
  }

  ngOnInit(): void {
  }  

  onAdd() {
    this.router.navigate(['vehicles/add']);
  }
}
