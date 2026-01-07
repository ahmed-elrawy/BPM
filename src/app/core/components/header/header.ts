import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  Language,
} from '../../../shared/enums/shared.enum';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { PopoverModule } from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';
import { APPS, LANGUAGES, NAV_ITEMS, NOTIFICATIONS, } from './models/header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonModule, MenuModule, BadgeModule, AvatarModule, PopoverModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private router = inject(Router);
  currentLang = signal<Language>(Language.EN);
  notificationCount = signal<number>(NOTIFICATIONS.length);
  navItems = signal<MenuItem[]>(NAV_ITEMS);
  allNavItems = signal<MenuItem[]>(NAV_ITEMS);
  languages = signal<MenuItem[]>(LANGUAGES);
  notifications = signal(NOTIFICATIONS);
  profileItems = signal<MenuItem[]>([
    { label: 'Profile', icon: 'pi pi-user', command: () => this.navigateTo('/profile') },
    { label: 'Settings', icon: 'pi pi-cog', command: () => this.navigateTo('/settings') },
    { label: 'Billing', icon: 'pi pi-credit-card', command: () => this.navigateTo('/billing') },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out' },
  ]);
  apps = signal(APPS);
  navigateTo(route?: string) {
    if (route) {
       this.router.navigate([route]);
    }
  }

  switchLanguage(lang: Language) {
    this.currentLang.set(lang);
    this.languages.set(
      this.languages().map((l) => ({
        ...l,
        icon: l.label && l.label.toLowerCase().startsWith(lang) ? 'pi pi-check' : '',
      }))
    );
  }
}
