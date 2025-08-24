import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header.component';

/**
 * Главный корневой компонент приложения
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent {
  // protected readonly title = signal('angular-frontend');

  /**
   * Конструктор главного корневого компонента приложения
   */
  constructor() {
    // this.title.set('12');
  }
}
