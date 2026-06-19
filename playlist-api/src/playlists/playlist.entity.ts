import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';

@Entity()
export class Playlist {
    @PrimaryColumn()
    id: string = ulid();

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    genre: string;
}