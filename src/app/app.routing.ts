//Importar modulos del router
import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

//Importar componentes
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { TopicsComponent } from "./components/topics/topics.component";
import { TopicDetailComponent } from "./components/topic-detail/topic-detail.component";
import { UsersComponent } from "./components/users/users.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SearchComponent } from "./components/search/search.component";

//Servicios
import { UserGuard } from "./services/user.guard";
import { NoIdentityGuard } from "./services/noidentity.guard";


//Array de rutas
const appRoutes:Routes=[
    {path:'',component:HomeComponent},
    {path:'inicio',component:HomeComponent},
    {path:'login',canActivate:[NoIdentityGuard],component:LoginComponent},
    {path:'register',canActivate:[NoIdentityGuard],component:RegisterComponent},
    {path:'ajustes',canActivate:[UserGuard],component:UserEditComponent},
    {path:'usuarios',component:UsersComponent},
    {path:'perfil/:id',component:ProfileComponent},
    {path:'temas',component:TopicsComponent},
    {path:'temas/:page',component:TopicsComponent},
    {path:'buscar/:search',component:SearchComponent},
    {path:'tema/:id',component:TopicDetailComponent},
    //para rutas no existentes 404
    {path:'**',component:HomeComponent}
];

//Exportar configuracion 
export const appRoutingProviders:any[]=[];
//Cargar toda la configuracion de rutas
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);