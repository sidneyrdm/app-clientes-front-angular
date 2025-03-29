import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ServicoService } from 'src/app/servico.service';
import { Servico } from '../servico';
import { servicoBusca } from '../servicoBusca';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {

  lista: servicoBusca[];

  servicos: Servico[] = [];
  servicoSelecionado: Servico;
  nome: string;
  mes: number;
  meses: number[];

  constructor(private router: Router, private servicoService: ServicoService             
  ) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngOnInit(): void {
    this.carregarServicos();
  }

  cadastrarServico(){
      this.router.navigate(['/servico-form']);  
  }

  carregarServicos(){
    this.servicoService.getServicos()
    .subscribe(resposta => {
      this.servicos = resposta;
    }),
    erro => {
      console.log('erro ao tentar carregar os servicos.')
    }
  }

    preDelete(servico: Servico) {
      this.servicoSelecionado = servico;
    }

    consultar(){
      if((this.nome == undefined && this.mes == undefined) && (this.nome == '' && this.mes == null)){
        console.log('nome= ', this.nome, ' mes = ',this.mes );
        this.carregarServicos();
        return;
      }
      this.servicoService.buscar(this.nome, this.mes)
      .subscribe(resposta => {
        this.lista = resposta;
        console.log(this.lista);
        this.populaBusca(this.lista);
      })
    }

    populaBusca(list: servicoBusca[]){
      let servicosCarregados: Servico[] = [];
      let servicoModel: Servico = new Servico;
      
      list.forEach( item => {
           servicoModel.descricao = item.descricao;
           servicoModel.data = item.data;
           servicoModel.valor = item.valor.toString();
           servicoModel.idCliente = item.cliente.id;

           servicosCarregados.push(servicoModel);
      })

      this.servicos = servicosCarregados;
    }

}
