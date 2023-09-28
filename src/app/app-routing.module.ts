import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from 'src/guards/auth.guard';
;

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', redirectTo: "/login",pathMatch:'full' },
  {path:'admin',
  canActivate:[AuthGuard],
  loadChildren:()=> import('./modules/dashboard/dashboard.module')
  .then((m)=>m.DashboardModule)}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
