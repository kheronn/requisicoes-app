import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from './primeng.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModule,


  ],
  exports:[
    CommonModule,
    FormsModule,
    PrimeNGModule,


  ],
  declarations: []
})
export class SharedModule { }
