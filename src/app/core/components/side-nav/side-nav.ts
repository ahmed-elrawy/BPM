import { Component, inject, signal } from '@angular/core';
import { SidebarService } from '../../services/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  imports: [PanelMenuModule, ButtonModule, CommonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
 private sidebarService = inject(SidebarService);
    sidebarCollapsed = this.sidebarService.isCollapsed;

  // Expose the signal from the service
  menuItems = this.sidebarService.menuItems;
  isCollapsed = signal(false);

  // Transform your custom MenuItem to PrimeNG's format
  mappedItems = () => this.menuItems().map(item => ({
    label: item.label,
    icon: item.icon,
    routerLink: item.routerLink,
    items: item.items // PrimeNG uses 'items' for nesting
  }));

  toggleCollapse() {
    this.isCollapsed.update(v => !v);
  }
}
