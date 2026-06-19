import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from '../../../core/models/playlist.model';
import { PlaylistService } from '../../../core/services/playlist.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  playlists: Playlist[] = [];

  constructor(
    private readonly playlistService: PlaylistService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    console.log('Dashboard chargé');
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.findAll().subscribe({
      next: (data) => {
        console.log('Playlists reçues :', data);
        this.playlists = [...data];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToCreate(): void {
    this.router.navigate(['/playlists/create']);
  }

  deletePlaylist(id: string): void {
    const confirmed = confirm('Voulez-vous vraiment supprimer cette playlist ?');

    if (!confirmed) {
      return;
    }

    this.playlistService.delete(id).subscribe({
      next: () => this.loadPlaylists(),
    });
  }


}
