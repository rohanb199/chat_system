import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
  public url = 'http://localhost:3000/svc/user';

  constructor(private httpClient: HttpClient) {}

  getUserList(userId) {
    return this.httpClient.get(`${this.url}/${userId}/users`).pipe(map((res: any) => {
      if (res.status.code === 'STATUS_OK') {
        return res.body.data;
      }
    }));
  }
}
