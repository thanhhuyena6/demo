import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ManageCategoriesComponent} from "./components/manage-categories/manage-categories.component";
import {UserAuthGuard} from "../guards/user-auth.guard";
// import {UserResolverService} from "../resolvers/user-resolver.service";
// import {CategoryResolverService} from "../resolvers/category-resolver.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [UserAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [UserAuthGuard]
      },
      {
        path: 'management',
        children: [
          {
            path: 'manage-categories',
            component: ManageCategoriesComponent,
            // resolve: {
            //   categories: CategoryResolverService
            // }
            canActivate: [UserAuthGuard]
          },
          {
            path: 'manage-users',
            component: ManageCategoriesComponent,
            // resolve: {
            //   allUsers: UserResolverService
            // }
            canActivate: [UserAuthGuard]
          }
        ]
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class AdminRoutingModule { }
