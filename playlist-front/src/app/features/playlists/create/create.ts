import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';

@Component({
  selector: 'app-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  errorMessage = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    genre: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly playlistService: PlaylistService,
    private readonly router: Router,
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir les champs obligatoires.';
      return;
    }

    this.playlistService.create({
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
      genre: this.form.value.genre ?? '',
    }).subscribe({
      next: () => this.router.navigateByUrl('/playlists'),
      error: () => this.errorMessage = 'Impossible de créer la playlist.',
    });
  }
}
