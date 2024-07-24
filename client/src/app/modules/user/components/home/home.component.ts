import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  total: Number = 0;
  ongoing: Number = 0;
  completed: Number = 0;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getCounts();
    this.userService.countSubject.subscribe((data) => {
      if (data && data.success) {
        this.total = data.data.total;
        this.ongoing = data.data.active;
        this.completed = data.data.past;
      }
    });
  }
}
