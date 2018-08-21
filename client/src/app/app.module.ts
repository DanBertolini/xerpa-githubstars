import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { AppComponent } from './app.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserContentComponent } from './user-content/user-content.component';
import { UserContentModule } from './user-content/user-content.module';
import { UserSearchModule } from './user-search/user-search.module';
import { SharedModule } from './shared/shared.module';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    UserNotFoundComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserContentModule,
    UserSearchModule,
    SharedModule,
    MatIconModule,    
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
