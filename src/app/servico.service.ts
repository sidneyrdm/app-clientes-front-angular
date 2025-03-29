import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from './servico/servico';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { servicoBusca } from './servico/servicoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  apiURL: string = environment.apiURLBase + '/api/servicos';

  constructor(private http: HttpClient) { }

  salvar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.apiURL, servico);
  }

    getServicos(): Observable<Servico[]> {
      return this.http.get<Servico[]>(this.apiURL+'/list');  
    }

    buscar(nome: string, mes: number): Observable<servicoBusca[]>{
      const httpParams = new HttpParams().set("nome", nome).set("mes", mes ? mes.toString() : '');
      
      const url = this.apiURL + "?" + httpParams.toString();

      console.log('URL= ',url);
      return this.http.get<any>(url);
    }
}
