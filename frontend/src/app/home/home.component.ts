import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.scss']
})

export class HomeComponent implements OnInit {
  constructor(private toastr: ToastrService) { }
  ngOnInit(): void {
    this.toastr.success(
      `🎉 La Brasserie La Fontaine vous souhaite de merveilleuses fêtes de fin d'année ! ✨`,
      'Message festif',
      {}
    );
  }
}