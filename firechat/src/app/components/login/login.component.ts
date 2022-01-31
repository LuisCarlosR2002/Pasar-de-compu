import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private chatserive:ChatService) { }

  ngOnInit(): void {
  }
  ingresar(proveedor:string){
    console.log(proveedor);
    this.chatserive.login(proveedor);

  }
}
