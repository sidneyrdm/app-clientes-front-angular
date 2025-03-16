import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;

  constructor(private service: ClientesService, private router: Router) { }

  ngOnInit(): void {

   this.carregarClientes();
  }

  cadastrarCliente() {
    this.router.navigate(['/clientes-form']);
  }

  preDelete(cliente: Cliente) {
    this.clienteSelecionado = cliente
  }

  deletarCliente(){
    this.service.deletar(this.clienteSelecionado.id)
     .subscribe(resposta => {
      console.log("cliente "+this.clienteSelecionado.nome+" deletado com sucesso!");
      this.carregarClientes();
     })
  }

  carregarClientes(){
    this.service.getClientes()
    .subscribe(resposta => {
      this.clientes = resposta;
    }),
    erro => {
      console.log('erro ao tentar carregar os clientes.')
    }
  }

}
