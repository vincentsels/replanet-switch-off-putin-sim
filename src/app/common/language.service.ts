import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageType } from '../main/proposal';

export const LOCAL_STORAGE_KEY_LANGUAGE = 'language';

@Injectable()
export class LanguageService {
  constructor(private translate: TranslateService, private adapter: DateAdapter<any>) {
  }

  language = new BehaviorSubject<LanguageType>(<LanguageType>localStorage.getItem(LOCAL_STORAGE_KEY_LANGUAGE) || 'en');

  setLanguage(inputLang: LanguageType) {
    localStorage.setItem(LOCAL_STORAGE_KEY_LANGUAGE, inputLang);
    this.translate.use(inputLang);
    this.adapter.setLocale(inputLang + '-BE');
    setTimeout(() => this.language.next(inputLang));
  }
}
