import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}



 
  // {
  //   path: 'bicho',
  //   loadChildren: () => import('./tipos/bicho/bicho.module').then( m => m.BichoPageModule)
  // },
  // {
  //   path: 'oscuro',
  //   loadChildren: () => import('./tipos/oscuro/oscuro.module').then( m => m.OscuroPageModule)
  // },
  // {
  //   path: 'dragon',
  //   loadChildren: () => import('./tipos/dragon/dragon.module').then( m => m.DragonPageModule)
  // },
  // {
  //   path: 'electrico',
  //   loadChildren: () => import('./tipos/electrico/electrico.module').then( m => m.ElectricoPageModule)
  // },
  // {
  //   path: 'hada',
  //   loadChildren: () => import('./tipos/hada/hada.module').then( m => m.HadaPageModule)
  // },
  // {
  //   path: 'lucha',
  //   loadChildren: () => import('./tipos/lucha/lucha.module').then( m => m.LuchaPageModule)
  // },
  // {
  //   path: 'fuego',
  //   loadChildren: () => import('./tipos/fuego/fuego.module').then( m => m.FuegoPageModule)
  // },
  // {
  //   path: 'volador',
  //   loadChildren: () => import('./tipos/volador/volador.module').then( m => m.VoladorPageModule)
  // },
  // {
  //   path: 'fantasma',
  //   loadChildren: () => import('./tipos/fantasma/fantasma.module').then( m => m.FantasmaPageModule)
  // },
  // {
  //   path: 'planta',
  //   loadChildren: () => import('./tipos/planta/planta.module').then( m => m.PlantaPageModule)
  // },
  // {
  //   path: 'tierra',
  //   loadChildren: () => import('./tipos/tierra/tierra.module').then( m => m.TierraPageModule)
  // },
  // {
  //   path: 'hielo',
  //   loadChildren: () => import('./tipos/hielo/hielo.module').then( m => m.HieloPageModule)
  // },
  // {
  //   path: 'normal',
  //   loadChildren: () => import('./tipos/normal/normal.module').then( m => m.NormalPageModule)
  // },
  // {
  //   path: 'veneno',
  //   loadChildren: () => import('./tipos/veneno/veneno.module').then( m => m.VenenoPageModule)
  // },
  // {
  //   path: 'psiquico',
  //   loadChildren: () => import('./tipos/psiquico/psiquico.module').then( m => m.PsiquicoPageModule)
  // },
  // {
  //   path: 'roca',
  //   loadChildren: () => import('./tipos/roca/roca.module').then( m => m.RocaPageModule)
  // },
  // {
  //   path: 'agua',
  //   loadChildren: () => import('./tipos/agua/agua.module').then( m => m.AguaPageModule)
  // },
  // {
  //   path: 'acero',
  //   loadChildren: () => import('./tipos/acero/acero.module').then( m => m.AceroPageModule)
  // },