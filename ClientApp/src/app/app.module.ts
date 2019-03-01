import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonaFormComponent } from './components/persona/persona-form/persona-form.component';
import { RegisterComponent } from './components/register/register.component';

import { PersonaService } from './services/persona.service';
import { DireccionesService } from './services/direcciones.service';
import { LogInterceptorService } from './services/log-interceptor.service';
import { LeaveFormService } from './services/leave-form.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AccountService } from './services/account.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PersonaComponent,
    PersonaFormComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'personas', component: PersonaComponent, canActivate: [AuthGuardService] },
      { path: 'personas-agregar', component: PersonaFormComponent, canDeactivate: [LeaveFormService] },
      { path: 'personas-editar/:id', component: PersonaFormComponent, canDeactivate: [LeaveFormService] },
      { path: 'register-login', component: RegisterComponent }
    ])
  ],
  providers: [
    PersonaService,
    DireccionesService,
    LeaveFormService,
    AuthGuardService,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
