import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HelpWidgetComponent } from './common/help-widget.component';

import { LanguageService, LOCAL_STORAGE_KEY_LANGUAGE } from './common/language.service';
import { LanguageType } from './main/proposal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(languageService: LanguageService, titleService: Title, translate: TranslateService,
    matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer, injector: Injector) {
    const lang = <LanguageType>localStorage.getItem(LOCAL_STORAGE_KEY_LANGUAGE) || 'en';
    translate.setDefaultLang('en');
    languageService.setLanguage(lang);
    languageService.language.subscribe({
      next: lang => titleService.setTitle('Replanet - Switch Off Putin Simulator')
    });

    matIconRegistry.addSvgIcon('flanders', domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon_flanders.svg"));
    matIconRegistry.addSvgIcon('belgium', domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon_belgium.svg"));

        const HelpWidgetElement = createCustomElement(HelpWidgetComponent, { injector });
        customElements.define('help-widget', HelpWidgetElement);
  }
}
