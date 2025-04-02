import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(`User: ${this.userName} - Password: ${this.password}`);
    this.router.navigate(['/home']);
  }

  preCadastro(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

}
