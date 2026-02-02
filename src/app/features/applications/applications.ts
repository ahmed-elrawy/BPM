import { afterNextRender, AfterRenderRef, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from '../../core/components/side-nav/side-nav';
import { SidebarService } from '../../core/services/sidebar';
import { APPLICATIONS_NAV_ITEMS } from './constants/applications';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.html',
  styleUrl: './applications.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Applications {

}
