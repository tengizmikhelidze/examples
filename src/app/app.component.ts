import {Component, inject} from '@angular/core';
import {ThemeService} from './shared/shared/services';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, Observable, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private themeService = inject(ThemeService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private translate = inject(TranslateService)

  constructor() {
    this.themeService.setInitialTheme()
    this.translate.addLangs(['en', "ka"]);
  }

  ngOnInit() {
    this.selectLanguage()
  }

  selectLanguage() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .pipe(
        map((): Observable<{ lang: 'ka' | 'us' }>=> <Observable<{ lang: 'ka' | 'us' }>>this.route.firstChild?.params ?? of({lang: 'ka'})),
        switchMap((params)=> params)
      )
      .subscribe({
        next: (params) => {
          const lang = params.lang;
          // თუ ენა არსებობს და ხელმისაწვდომია, გამოვიყენოთ
          if (lang && this.translate.getLangs().includes(lang)) {
            this.translate.use(lang);
          } else {
            // თუ არცერთი არ ემთხვევა, დატვირთეთ ნაგულისხმევი ენა
            this.translate.use(this.translate.getDefaultLang());
          }
        }
      });
  }
}
