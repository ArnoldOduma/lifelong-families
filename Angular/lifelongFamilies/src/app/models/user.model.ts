import { Injectable } from '@angular/core';
import { Adapter } from '../adapters/adapter';

export class User {
  constructor(
    public email: string,
    public username: string,
    public password1: string,
    public password2: string
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User>{
  adapt(item: any): User{
    return new User(
      item.email,
      item.username,
      item.password1,
      item.password2
    );
  }
}
