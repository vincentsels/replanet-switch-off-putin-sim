import { Component } from '@angular/core';

import { UserService } from '../../user/user.service';
import { LanguageService } from '../../common/language.service';
import { LanguageType } from '../../main/proposal';

@Component({
  selector: 'app-navbar-profile-menu',
  templateUrl: './navbar-profile-menu.html',
  styleUrls: ['./navbar-profile-menu.scss'],
})
export class NavBarProfileMenuComponent {
  version = '0.1';

  languages = ['en', 'fr', 'nl'];
  language: string | null = null;
  userName: string | null = null;

  constructor(private userService: UserService, private languageService: LanguageService) {
    this.language = languageService.language.value;
    this.userName = userService.getUserName();
  }

  languageChanged(lang: LanguageType) {
    this.language = lang;
    this.languageService.setLanguage(lang);
  }

  toUpper = (lang: string | null) => lang ? lang.toUpperCase(): '';
}
