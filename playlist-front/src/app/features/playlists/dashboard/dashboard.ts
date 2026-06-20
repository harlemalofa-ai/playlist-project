import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.findAll().subscribe({
      next: (data) => {
        this.playlists = data;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur chargement playlists', error);
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

  goToEdit(id: string): void {
    this.router.navigate(['/playlists/edit', id]);
  }

  userEmail = '';

  loadCurrentUser(): void {
    this.authService.me().subscribe({
      next: (user) => {
        this.userEmail = user.email;
      },
      error: (error) => {
        console.error('Erreur chargement utilisateur', error);
      },
    });
  }
}
