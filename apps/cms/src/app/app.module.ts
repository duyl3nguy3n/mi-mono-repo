import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AppLayoutModule,
  ControlMenuBarModule,
  KeyboardClickModule,
} from '@silo/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // #region App features
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    // #endregion
    // #region AppComponent imports
    AppLayoutModule,
    ControlMenuBarModule,
    KeyboardClickModule,
    // #endregion
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
