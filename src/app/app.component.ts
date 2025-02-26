import {Component, inject} from '@angular/core';
import {ThemeService} from './shared/shared/services';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private themeService = inject(ThemeService)

  constructor() {
    this.themeService.setInitialTheme()
  }
}
