import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'rol', redirectTo: 'https://rol.yosiftware.es/' },
    { path: 'cv', redirectTo: 'https://cv.yosiftware.es/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
