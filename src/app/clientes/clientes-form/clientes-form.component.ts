import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {


  cliente: Cliente;
  success: boolean = false;
  mensagem: boolean = false;
  id: number;

  constructor(private service: ClientesService,
    private router: Router,
    private activetedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
    this.mensagem = false;
  }

  ngOnInit(): void {
    let params = this.activetedRoute.params;

    this.id = params.value.id;


    this.service.getClienteByID(this.id)
      .subscribe(resposta => this.cliente = resposta)
  }

  onSubmit() {
    if (this.id) {
      this.service.Atualizar(this.cliente)
      .subscribe(resposta => {
        console.log('cliente atualizado com sucesso.')
      })
      

    } else {
      this.service.salvar(this.cliente)
        .subscribe(resposta => {
          if (resposta == null) {
            this.success = false;
            this.mensagem = true;
          }
          this.success = true;
          this.mensagem = true;
          this.cliente = resposta;
        })
    }

  }

  voltar() {
    this.router.navigate(['clientes-list']);
  }

}
