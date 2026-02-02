import { Component, OnInit } from '@angular/core';
import { IUserInfo } from '../../../../core/Interfaces/user-info';
import { AuthService } from '../../../../core/services/auth';
import { AuthGuard } from '../../../../core/guards/guard';
import { Application } from '../../application';

@Component({
  selector: 'app-assignments',
  imports: [],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss',
})
export class Assignments extends Application implements OnInit   {
  userInfo: IUserInfo | null = null;
  accessToken: string | undefined = undefined;
  refreshToken: string | undefined = undefined;
  hasAdminRole: boolean = false;
  hasAnyUserRole: boolean = false;
  allRoles: boolean = false;
  constructor(private authService: AuthService, private authGuard: AuthGuard) {
    super()
  }


  ngOnInit() {
    this.getUserInfo();
    this.getAccessToken();
    this.getRefreshToken();
    this.checkRoles();
    this.checkAnyRole();
    this.checkAllRoles();
  }
  getUserInfo() {
    this.authService.getUserInfo().subscribe((info) => {
      this.userInfo = info;
      console.log('User Info:', this.userInfo);
    });
  }
  getAccessToken() {
    this.accessToken = this.authService.getAccessToken();
    console.log('Access Token:', this.accessToken);
  }
  getRefreshToken() {
    this.refreshToken = this.authService.getRefreshToken();
    console.log('Refresh Token:', this.refreshToken);
  }
  checkRoles() {
    this.hasAdminRole = this.authGuard.hasRole('admin');
    console.log('Has Admin Role:', this.hasAdminRole);
  }
  checkAnyRole() {
    this.hasAnyUserRole = this.authGuard.hasAnyRole(['user', 'admin']);
    console.log('Has Any User Role:', this.hasAnyUserRole);
  }
  checkAllRoles() {
    this.allRoles = this.authGuard.hasAllRoles(['admin', 'user']);
    console.log('Has All Roles (admin, user):', this.allRoles);
  }

}