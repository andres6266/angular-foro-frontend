import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Cargar Modulo Rutas
import { routing, appRoutingProviders } from "./app.routing";

//Formularios
import { FormsModule } from "@angular/forms";

//Cabeceras
import { HttpClient,HttpHeaders } from "@angular/common/http";

//Modulo para peticiones Ajax(services)
import { HttpClientModule } from "@angular/common/http";

//Subir archivos
import { AngularFileUploaderModule } from "angular-file-uploader";

//Cargar panel
import { PanelModule } from "./panel/panel.module";

//Formato de Fechas
import { MomentModule } from "ngx-moment";

//Modulo para resaltar el codigo
import { NgxHighlightJsModule } from "@nowzoo/ngx-highlight-js";

//Componentes
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { SearchComponent } from './components/search/search.component';

//Servicio de usuario para autorizacion
import { UserService } from './services/user.service';
import { UserGuard } from "./services/user.guard";
//Servicio para retringir el acceso a login y registro
import { NoIdentityGuard } from "./services/noidentity.guard";
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    PanelModule,
    MomentModule,
    NgxHighlightJsModule.forRoot()
  ],
  providers: [
    appRoutingProviders,UserService,UserGuard,NoIdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
