import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    let params: Observable<Params> = this.activetedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      this.service.getClienteByID(this.id)
      .subscribe(
        resposta => this.cliente = resposta)
    })
  }

  onSubmit() {
    if (this.id) {
      this.service.Atualizar(this.cliente)
      .subscribe(resposta => {
        alert('cliente atualizado com sucesso.')
        this.voltar();
      })
      

    } else {
      this.service.salvar(this.cliente)
        .subscribe(resposta => {
          this.voltar();
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
    this.router.navigate(['clientes/list']);
  }

}
