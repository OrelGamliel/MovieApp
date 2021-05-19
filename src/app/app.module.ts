import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MovieGalleryComponent } from "./movies/movie-gallery/movie-gallery.component";
import { HeaderComponent } from "./core/header/header.component";
import { MovieComponent } from "./movies/movie-gallery/movie/movie.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieGalleryComponent,
    MovieComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
