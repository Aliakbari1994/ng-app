export class Playlist {
  thumbnail: string | null = null;
  title: string = '';
  slugId: string | null = null;
  type: string | null = null;
  featured: boolean = false;
  creatorId: string | null = '';
  creatorName: string | null = '';
  tracksCount: string | number = 0;
  duration: string = '';
  buttonStatus: string | null = null;
  keywords: string | null = null;
  description: string | null = null;
}
