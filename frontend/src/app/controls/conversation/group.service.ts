import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class GroupService {
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:3000/svc/user';

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {}

  getGroupList(userId) {
    return this._httpClient.get(`${this._url}/${userId}/group`).pipe(map((res: any) => {
      if (res.status.code === 'STATUS_OK') {
        return res.body.data;
      }
    }));
  }

  addGroup(userId, conversation) {
    return this._httpClient.post(`${this._url}/${userId}/group/new`, conversation);
  }
}
