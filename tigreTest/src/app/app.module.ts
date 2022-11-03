import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AnimalComponent } from './animal/animal.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { animalSearchComponent } from './animal-search/animal-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    AnimalDetailComponent,
    DashboardComponent,
    animalSearchComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
