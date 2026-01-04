import { Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
 // Signal to hold the current feature's menu items
  readonly menuItems = signal<MenuItem[]>([]);
  isCollapsed = signal(false);

  // Method for features to "register" their items
  setMenuItems(items: MenuItem[]) {
    this.menuItems.set(items);
  }
  
}
