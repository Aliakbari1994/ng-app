class Genre {
  'title-fa': string = '';
  'title-en': string = '';
  'slug': string | null = null;
  'thumbnail': string | null = null;
}

export class Genres {
  genres: Genre[] = []
}
