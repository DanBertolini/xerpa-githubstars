import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
} from '@angular/material';
import { SearchBoxComponent } from './search-box/search-box.component';
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { CurrentUserComponent } from './current-user/current-user.component';

@NgModule({
  imports: [
    CommonModule,  
    FormsModule,  
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpModule,
  ],
  declarations: [SearchBoxComponent, CurrentUserComponent],
  exports: [SearchBoxComponent, CurrentUserComponent],
  providers: [UserService]
})
export class SharedModule { }
