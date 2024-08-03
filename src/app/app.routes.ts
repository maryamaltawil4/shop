import { Routes } from '@angular/router';

export const routes: Routes = [
   
        { path: '', loadChildren: () => import('../app/shared/shared.module').then(m => m.SharedModule) },
      
];
