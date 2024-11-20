import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { authGuard } from './service/auth.guard';
import { UsersTableComponent } from './users-table/users-table.component';
import { DashBoardComponent } from './pages/dashboard/dashboard.component';
import { TaskListTableComponent } from './task-list-table/task-list-table.component';
import { AddUserFormComponent } from './pages/add-user-form/add-user-form.component';
import { roleAuthGuard } from './service/role-auth.guard';
import { NotFound403Component } from './pages/not-found403/not-found403.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path:"",
                redirectTo:'dashboard',
                pathMatch:'full'

            },

            {
                path: "dashboard",
                component: DashBoardComponent,
                data: { roles: ['admin', "user"] }
            },
            {
                path: "users",
                canActivate: [roleAuthGuard],
                component: UsersTableComponent,
                data: { roles: ['admin'] }
            },
            {
                path: "tasks",
                canActivate: [roleAuthGuard],
                component: TaskListTableComponent,
                data: { roles: ['admin'] }
            },
            {
                path: "add-user",
                canActivate: [roleAuthGuard],
                component: AddUserFormComponent,
                data: { roles: ['admin'] }
            },
            {
                path: "add-task",
                canActivate: [roleAuthGuard],
                component: TaskFormComponent,
                data: { roles: ['admin', 'user'] }
            },
           



        ]
    },
//    {
//         path: "403",
//         component: NotFound403Component
//     },


    {
        path: "login",
        component: LoginPageComponent
    }, {
        path: "register",
        component: RegisterPageComponent
    }, 

];
