import { IsNotEmpty } from 'class-validator';

export class Metadata {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    ipfs: string;
}

export class CollectionDto {
    @IsNotEmpty()
    metadata: Metadata;
    @IsNotEmpty()
    address: string;
}