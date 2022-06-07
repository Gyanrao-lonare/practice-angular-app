import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { members } from '../_models/members';
@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private https: HttpClient) {}
  members : any =[] 
  getMembers() {
    if(this.members.length > 0) return of(this.members);
    return this.https.get<any[]>(this.baseUrl + 'users').pipe(
      map((responce: any[]) => {
        this.members = responce;
        return responce;
      })
    );
  }
  getUsers() {
    return this.https.get<any[]>(this.baseUrl + 'users').pipe(
      map((responce: any) => {
        return responce;
      })
    );
  }
  getMember(username:string) {
    const member = this.members.find(x=>x.username === username);
    if(member !== undefined) return of(member);
    return this.https.get<any>(this.baseUrl + 'users/' + username).pipe(
      map((responce: any) => {
        return responce;
      })
    );
  
  }
}
