import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.scss']
})

export class HomeComponent {
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.displayXmasMessage();
  }

  displayXmasMessage(): void {
    this.toastr.success(
      '<i class="fas fa-tree"></i> Joyeuses fêtes de Noël ! <i class="fas fa-sparkles"></i>',
      'Message festif', {
      closeButton: true,
      progressBar: true, 
      positionClass: 'toast-top-right', 
      timeOut: 5000,
      enableHtml: true
    });;
  }
}