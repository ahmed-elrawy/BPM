import { afterNextRender, AfterRenderRef, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar';
import { APPLICATIONS_NAV_ITEMS } from './constants/applications';
import { RouterOutlet } from '@angular/router';
import { SideNav } from '../../core/components/side-nav/side-nav';

@Component({
  selector: 'app-application',
  imports: [RouterOutlet, SideNav],
  templateUrl: './application.html',
  styleUrl: './application.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Application {
  private sidebarService = inject(SidebarService);
  sidebarCollapsed = this.sidebarService.isCollapsed;
  init: AfterRenderRef = afterNextRender(() => {
    this.sidebarService.setMenuItems(APPLICATIONS_NAV_ITEMS);
  });
}
