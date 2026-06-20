import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../../../core/models/playlist.model';
import { PlaylistService } from '../../../core/services/playlist.service';

@Component({
  selector: 'app-detail',
  imports: [CommonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
  playlist?: Playlist;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly playlistService: PlaylistService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.playlistService.findOne(id).subscribe({
      next: (playlist) => {
        this.playlist = playlist;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur chargement détail playlist', error);
        this.errorMessage = 'Impossible de charger la playlist.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/playlists']);
  }
}
