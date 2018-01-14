import { NgModule } from '@angular/core';
import { RouterModule,Routes }  from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AuthGuard } from './auth.guard';
import { InscriptionComponent } from './inscription/inscription.component';
import { VerificationComponent } from './verification/verification.component';



const routes: Routes = [
    {path: 'accueil', component: AccueilComponent,canActivate:[AuthGuard]},
    {path: '',redirectTo:'/accueil',pathMatch:'full'},
    { path: 'authentification', component: AuthentificationComponent},
    {path: 'inscription' , component:InscriptionComponent},
    {path: "verifierCode/:email", component:VerificationComponent}
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule{}