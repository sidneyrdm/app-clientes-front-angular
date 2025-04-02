import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ServicoListComponent } from './servico-list/servico-list.component';
import { LayoutComponent } from '../layout/layout.component';


const routes: Routes = [
  {path: 'servicos', component: LayoutComponent, children: [
    {path:'form', component: ServicoFormComponent},
    {path: 'list', component: ServicoListComponent},
    {path:'', redirectTo: 'servicos/list', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
