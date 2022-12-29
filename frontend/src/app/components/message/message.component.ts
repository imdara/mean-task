import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() messageObject: any;
  id: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIdFromToken();
    this.authService.currentId.subscribe((res: any) => (this.id = res));
  }
}
