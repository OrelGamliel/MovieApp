import { Component, OnInit } from "@angular/core";
import { NavLink } from "../../models/NavLink.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  // keep an array of links enabling easy adding of one or more links when necessary
  navLinks: NavLink[] = [
    {
      label: "Home",
      path: "/home",
    },
    {
      label: "Movies",
      path: "/movies",
    },
  ];
  // deciding whether the burger button gets into action
  navActive: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
