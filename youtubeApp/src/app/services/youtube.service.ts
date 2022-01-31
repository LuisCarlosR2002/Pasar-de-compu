
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { YoutubeResponse } from '../models/youtube.models';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = "https://www.googleapis.com/youtube/v3";
  private apiKey = "AIzaSyB-IsEZgn42SVXWbbce8wbqHJmfdqQBAgM";
  private playList = "UUFmMw7yTuLTCuMhpZD5dVsg";
  private nextPageToken = "";


  constructor(private http: HttpClient) {
   
  }
  getvideos(){
    const url = `${this.youtubeUrl}/playlistItems`
    const params = new HttpParams()
      .set('part','snippet')
      .set('playlistId', this.playList)
      .set('key', this.apiKey)
      .set('maxResults','10')
      .set('pageToken',this.nextPageToken)

    return this.http.get<YoutubeResponse>(url,{params})
      .pipe(
        map( res => {
          this.nextPageToken = res.nextPageToken;
          return res.items;
        }),
        map( items => items.map( video => video.snippet ))
      )
  }
}
