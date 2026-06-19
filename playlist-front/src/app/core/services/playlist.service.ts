import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Playlist } from '../models/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private readonly apiService: ApiService) {}

  findAll(): Observable<Playlist[]> {
    return this.apiService.get<Playlist[]>('/playlist/list');
  }

  findOne(id: string): Observable<Playlist> {
    return this.apiService.get<Playlist>(`/playlist/${id}`);
  }

  create(data: Omit<Playlist, 'id'>): Observable<Playlist> {
    return this.apiService.post<Playlist>('/playlist', data);
  }

  update(id: string, data: Partial<Playlist>): Observable<Playlist> {
    return this.apiService.put<Playlist>(`/playlist/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/playlist/${id}`);
  }
}
