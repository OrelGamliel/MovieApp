import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../movies.service";

@Component({
  selector: "app-movie-gallery",
  templateUrl: "./movie-gallery.component.html",
  styleUrls: ["./movie-gallery.component.scss"],
})
export class MovieGalleryComponent implements OnInit {
  constructor(private movieService: MoviesService) {}

  isScrolled = false;
  notScrolly = true;
  notEmptyPost = true;

  ngOnInit(): void {
    this.movieService.getMovies();
    this.movieService.setSearchParms(
      this.movieService.year,
      this.movieService.page + 1
    );
  }

  onScroll() {
    if (this.notScrolly && this.notEmptyPost) {
      this.isScrolled = true;
      this.notScrolly = false;
      this.fetchMoreMoviesOnScroll();
    }
  }

  fetchMoreMoviesOnScroll() {
    this.movieService.setSearchParms(
      this.movieService.year,
      this.movieService.page + 1
    );
    this.notScrolly = true;
    this.movieService.getMovies();
  }

  get movies$() {
    return this.movieService.movies$;
  }
  // infiniteScroll() {
  //   if (window.scrollY > (document.body.offsetHeight - 100)
  //     && !this.isScrolled) {
  //     this.isScrolled = true;
  //     this.pageNum++
  //     this.fetchMoreMovies();
  //     setTimeout(() => {
  //       this.isScrolled = false
  //     }, 1000)

  //   }
  // }
  // fetchMoreMovies() {
  //   this.movieService.getMoviesByYear(this.year, this.pageNum)
  //     .then(res => {
  //       for (let i = 0; i < res.results.length; i++) {
  //         this.movies.push(res.results[i])
  //       }
  //     }
  //     )
  // }
}
