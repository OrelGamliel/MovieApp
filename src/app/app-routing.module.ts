import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HasMovieGuard } from "./guards/has-movie.guard";
import { HomeComponent } from "./home/home.component";
import { MovieGalleryComponent } from "./movies/movie-gallery/movie-gallery.component";
import { MovieComponent } from "./movies/movie-gallery/movie/movie.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "movies", component: MovieGalleryComponent },
  {
    path: "movies/:id",
    component: MovieComponent,
    canActivate: [HasMovieGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
