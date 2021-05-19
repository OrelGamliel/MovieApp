import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, from, Subject } from "rxjs";
import { first, map, switchMap, pluck } from "rxjs/operators";
import { MovieDto } from "../models/MovieDto.interface";
import { TheMovieDBResponse } from "../models/TheMovieDBResponse.interface";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  //not safe i know but its a small demo app so i allowed it to slide usually will use .env
  APIkey = "55db3ed9d6df316f97e88bd6c6d0475b";
  //keeping a single source of truth in the form of a BehaviorSubject
  //which keeps an array of Movie Objects and emits next every change
  // and by that keeping depending arrays in other places in the app up to date
  private moviesSubject = new BehaviorSubject<MovieDto[]>([]);

  constructor(private readonly httpClient: HttpClient) {}
  page = 1;
  year = 2020;

  setSearchParms(year: number, page: number) {
    this.page = page;
    this.year = year;
  }

  getMovies() {
    //getting response in an observable and combining both observables with
    //combineLatest and then using first() to prevent infinite loop of events
    // and then subscribing to the result and emiting it outside with next
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_year=${this.year}&page=${this.page}`;
    const newMovies$ = this.httpClient
      .get<TheMovieDBResponse<MovieDto>>(url)
      .pipe(map((response) => response.results));
    combineLatest([newMovies$, this.movies$])
      .pipe(first())
      .subscribe(([newMovies, currentMovies]) => {
        this.moviesSubject.next([...currentMovies, ...newMovies]);
      });
  }
  //getting movie by id
  getMovie(movieId: number) {
    return this.movies$.pipe(
      first(),
      map((movies) => movies.find((movie) => movie.id === movieId))
    );
  }
  //getting all movies
  get movies$() {
    return this.moviesSubject.pipe(map((movies) => movies.slice()));
  }
}
