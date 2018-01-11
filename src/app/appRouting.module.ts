import { NgModule } from '@angular/core';
import { RouterModule,Routes }  from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthentificationComponent } from './authentification/authentification.component';



const routes: Routes = [
    {path: 'accueil', component: AccueilComponent},
    {path: '',redirectTo:'/accueil',pathMatch:'full'},
    { path: 'authentification', component: AuthentificationComponent}
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule{}