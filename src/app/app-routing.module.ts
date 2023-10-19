import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { TablaCategoriaComponent } from './modules/categorias/tabla-categoria/tabla-categoria.component';
import { categoriaResolve } from './modules/categorias/tabla-categoria/categorias.resolvers';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'categoria/lista' },

  {
    path: 'categoria',
    // canActivate: [AuthGuard],
    component: NavigationComponent,
    children: [
      {
        path: 'lista',
        resolve: {
          // contacts:   categoriaResolve  ,
        },
        component: TablaCategoriaComponent
      },
    ]
  },
  { path: '**', redirectTo: 'categoria/lista' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
