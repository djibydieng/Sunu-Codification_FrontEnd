import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ HttpModule,Http } from '@angular/http';
import{ ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AppRoutingModule } from './appRouting.module';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentification/authentification.service';
import { AlertService } from './authentification/alert.service';
import { InscriptionComponent } from './inscription/inscription.component';
import { EtudiantService } from './service/etudiant.service';
import { VerificationComponent } from './verification/verification.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AuthentificationComponent,
    InscriptionComponent,
    VerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthenticationService,AlertService,AuthGuard,EtudiantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
