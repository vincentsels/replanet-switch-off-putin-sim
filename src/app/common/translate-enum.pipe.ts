import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { initCase } from './helper';

@Pipe({ name: 'enumtranslate' })
export class TranslateEnumPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: any, exclude: number[] = []) : any {
    const keys: { key: number, value: string }[] = [];
    for (const enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10)) && !exclude.includes(Number(enumMember))) {
        const text = value[enumMember];
        this.translate.get(text).toPromise().then((translation) => {
          const translationOrDefault = translation || initCase(text);

          const entry = {
            key: Number(enumMember),
            value: translation || translationOrDefault,
          };
          keys.push(entry);
        });
      }
    }
    return keys;
  }
}
