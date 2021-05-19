import { Route } from "@angular/compiler/src/core";
import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { MoviesService } from "../../movies.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"],
})
export class MovieComponent implements OnInit {
  constructor(
    private readonly movieService: MoviesService,
    private readonly route: ActivatedRoute,
    private sanitization: DomSanitizer
  ) {}
  // getting the currently selected movie id from the route snapshot
  movie$ = this.movieService.getMovie(+this.route.snapshot.params["id"]);
  movieBackdrop$ = this.movie$.pipe(
    map((movie) => `url(http://image.tmdb.org/t/p/w1280${movie.backdrop_path}`),
    map(this.sanitization.bypassSecurityTrustStyle)
  );
  ngOnInit(): void {}
}
