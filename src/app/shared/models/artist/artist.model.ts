class Genre {
  title_fa: string = '';
  title_en: string = '';
  slug: string | null = null;
}

export class Artist {
  thumbnail: string | null = null;
  nameFa: string = '';
  nameEn: string = '';
  type: string | null = null;
  tracksCount: string | number = 0;
  followersCount: string | number = 0;
  plays: string | number = 0;
  downloads: string | number = 0;
  genres: Genre[] = [];
  slugId: string | null = null;
  keywords: string | null = null;
  description: string | null = null;
  followAction: string | null = null;
}
