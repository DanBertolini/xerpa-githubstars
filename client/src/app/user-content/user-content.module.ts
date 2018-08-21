import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContentComponent } from './user-content.component';
import { MatIconModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { StaredRepoService } from './services/stared-repo.service';

@NgModule({
  imports: [
    CommonModule,    
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    SharedModule
  ],
  declarations: [UserContentComponent],
  exports: [UserContentComponent],
  providers: [StaredRepoService]
})
export class UserContentModule { }
