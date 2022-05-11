import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

import { TranslatedText } from '../main/proposal';
import { LanguageService } from './language.service';

@Pipe({ name: 'translateText' })
export class TranslateTextPipe implements PipeTransform {
  constructor(private translate: LanguageService) {}

  transform(value: TranslatedText[] | undefined): string {
    if (!value || value.length === 0) return '';

    const lang = this.translate.language.value;

    const translatedText = value.find(t => t.lang === lang);
    if (translatedText) return translatedText.text;

    const defaultText = value.find(t => t.lang === environment.defaultLanguage);
    if (defaultText) return defaultText.text;

    return value[0].text;
  }
}
