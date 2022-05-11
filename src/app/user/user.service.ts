import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  getUserName = () => 'Vincent Sels'; // For now just return hard coded username
}
