export enum MediaType
{
    Movies = 0,
    TVShows = 1,
    Books = 2,
    Games = 3,
    Music = 4
}

export enum MediaStatus
{
    Finished = 0,
    Planning = 1,
    InProgress = 2
}

export interface Media {
    MediaTitle: string,
    MediaDescription: string,
    ImageURL: string,
    Ratings: number,
    MediaType: MediaType,
    MediaStatus: MediaStatus,
}