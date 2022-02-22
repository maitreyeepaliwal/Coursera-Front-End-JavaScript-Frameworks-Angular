import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './approuting/approuting.module';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { BaseURL } from './shared/baseurl';
import { HighlightDirective } from './directives/highlight.directive';
import { Feedback } from './shared/feedback';
import { FeedbackService } from './services/feedback.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule 
  ],  providers: [
    DishService,
    PromotionService,
    LeaderService,
    ProcessHTTPMsgService,
    FeedbackService,
    { provide: 'BaseURL', useValue: BaseURL}
  ],
  entryComponents: [
    LoginComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
