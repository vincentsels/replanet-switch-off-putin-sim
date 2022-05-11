import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProposalDetailComponent } from './main/proposal-detail/proposal-detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'proposal/:idorslug', component: ProposalDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
