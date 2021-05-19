import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { MoviesService } from "../movies/movies.service";

@Injectable({
  providedIn: "root",
})
export class HasMovieGuard implements CanActivate {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly router: Router
  ) {}
  // guard preventing empty page in the case of reloading in the single movie detail page
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.moviesService.getMovie(+next.params["id"]).pipe(
      map((movie) => movie != null),
      tap((canActivate) => {
        if (!canActivate) {
          this.router.navigate(["../"]);
        }
      })
    );
  }
}
