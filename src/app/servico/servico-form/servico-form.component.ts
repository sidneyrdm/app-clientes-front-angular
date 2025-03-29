import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { Servico } from '../servico';
import { Router } from '@angular/router';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: Servico;

  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private servicoService: ServicoService
  ) { 

    this.servico = new Servico();
  }

  ngOnInit(): void {
   this.carregarClientes();
   }

  carregarClientes(){
    this.clienteService.getClientes()
    .subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  onSubmit(){
    console.log(this.servico);
    this.servicoService.salvar(this.servico)
    .subscribe(resposta => {
      this.voltar();
      console.log('cadastro efetuado com sucesso.')
    })
  }

  voltar() {
    this.router.navigate(['/servico-list']);
  }
}
