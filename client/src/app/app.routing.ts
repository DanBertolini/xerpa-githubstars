import { NgModule } from '@angular/core';
import { UserContentComponent } from './user-content/user-content.component';
import { Routes, RouterModule } from '@angular/router';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: UserSearchComponent, canActivate: [AuthGuard] },
    { path: 'user/:username', component: UserContentComponent, canActivate: [AuthGuard] },
    { path: 'not-found', component: UserNotFoundComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: UserSearchComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}