import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository<Playlist>,
    ) {}

    findAll(): Promise<Playlist[]> {
        return this.playlistRepository.find();
    }

    async findOne(id: string): Promise<Playlist> {
        const playlist = await this.playlistRepository.findOne({
            where: { id },
        });

        if (!playlist) {
            throw new NotFoundException('Playlist not found');
        }

        return playlist;
    }

    create(dto: CreatePlaylistDto): Promise<Playlist> {
        const playlist = this.playlistRepository.create(dto);
        return this.playlistRepository.save(playlist);
    }

    async update(id: string, dto: UpdatePlaylistDto): Promise<Playlist> {
        const playlist = await this.findOne(id);

        Object.assign(playlist, dto);

        return this.playlistRepository.save(playlist);
    }

    async remove(id: string): Promise<void> {
        const playlist = await this.findOne(id);
        await this.playlistRepository.remove(playlist);
    }
}