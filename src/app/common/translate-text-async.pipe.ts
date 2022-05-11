import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslatedText } from '../main/proposal';
import { LanguageService } from './language.service';

@Pipe({ name: 'translateTextAsync' })
export class TranslateTextAsyncPipe implements PipeTransform {
  constructor(private translate: LanguageService) {}

  transform(value: TranslatedText[] | undefined): Observable<string> {
    if (!value || value.length === 0) return of('');

    return this.translate.language.pipe(map((l) => {
      const translatedText = value.find(t => t.lang === l);
      if (translatedText) return translatedText.text;

      const defaultText = value.find(t => t.lang === 'en');
      if (defaultText) return defaultText.text;

      return value[0].text;
    }))
  }
}
