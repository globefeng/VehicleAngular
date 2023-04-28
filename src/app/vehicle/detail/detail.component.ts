import { Component, OnInit } from '@angular/core';
import { VehicleInfo } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  vin: string | null = '';
  vehicle?: VehicleInfo;
  confirmResult: any;

  constructor(private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public vehicleService: VehicleService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.vin = routeParams.get('vin');

    if (!this.vin || this.vin.length === 0) return;

    this.vehicleService.getVehicle(this.vin).subscribe((response: VehicleInfo) => {
        this.vehicle = response;
    });

  }  

  onEdit() {
    this.router.navigate(['vehicles/edit/' + this.vin]);
  }

  onDelete() {
    const confirmRef: MatDialogRef<DeleteConfirmationComponent> = this.dialog.open(
      DeleteConfirmationComponent,
      {
        width: '400px',
        data: {
          message: 'Are you sure to execute this action?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );

    confirmRef.afterClosed().subscribe((data) => {
      if (data.clicked === 'Ok') {
        if (!this.vin || this.vin.length === 0) return;
        this.vehicleService.deleteVehicle(this.vin).subscribe((response: void) => {
        });

        window.location.href = "http://localhost:4200/vehicles";
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.router.onSameUrlNavigation = 'reload';
        // this.router.navigate(['vehicles']);
      }
    });

  }  
}