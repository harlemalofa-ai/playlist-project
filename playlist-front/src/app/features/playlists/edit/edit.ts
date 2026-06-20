import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit implements OnInit {
  playlistId = '';
  errorMessage = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    genre: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly playlistService: PlaylistService,
  ) {}

  ngOnInit(): void {
    this.playlistId = this.route.snapshot.paramMap.get('id') ?? '';

    this.playlistService.findOne(this.playlistId).subscribe({
      next: (playlist) => {
        this.form.patchValue({
          name: playlist.name,
          description: playlist.description,
          genre: playlist.genre,
        });
      },
      error: () => {
        this.errorMessage = 'Impossible de charger la playlist.';
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir les champs obligatoires.';
      return;
    }

    this.playlistService.update(this.playlistId, {
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
      genre: this.form.value.genre ?? '',
    }).subscribe({
      next: () => this.router.navigateByUrl('/playlists'),
      error: () => this.errorMessage = 'Impossible de modifier la playlist.',
    });
  }
}
