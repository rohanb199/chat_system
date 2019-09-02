import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class ChannelService {
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:3000/svc/user';

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {}

  getChannelList(userId) {
    return this._httpClient.get(`${this._url}/${userId}/channel`).pipe(map((res: any) => {
      if (res.status.code === 'STATUS_OK') {
        return res.body.data;
      }
    }));
  }

  addChannel(userId, conversation) {
    return this._httpClient.post(`${this._url}/${userId}/channel/new`, conversation);
  }
}
