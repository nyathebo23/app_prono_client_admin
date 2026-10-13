import { Component, signal } from '@angular/core';
import { sideNavItems } from './side-nav-items';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-home-layout',
  imports: [RouterLink, RouterLinkActive, NgComponentOutlet, RouterOutlet],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.scss',
})
export class HomeLayout {
  protected readonly sideNavItems = sideNavItems;
  protected readonly sidebarOpen = signal(true);

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }
}
