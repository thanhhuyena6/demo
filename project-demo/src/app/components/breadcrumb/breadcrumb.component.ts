import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private _router: Router, private menuService: MenuService) { }


  ngOnInit(): void {

  }



}
