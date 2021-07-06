class Artist {
  name_fa: string = '';
  name_en: string = '';
  slug: string = '';
  slug_id: string = '';
}

class Genre {
  title_fa: string = '';
  title_en: string = '';
  slug: string | null = null;
}

class Price {
  toman: string | null = null;
  dollar: string | null = null;
}

class Accessibility {
  type: string | null = null;
  price: Price = {
    toman: null,
    dollar: null
  }
}

class Support {
  available: boolean = false;
  price: Price = {
    toman: null,
    dollar: null
  }
}

export class Album {
  thumbnail: string | null = null;
  titleFa: string = '';
  titleEn: string = '';
  albumRate: string | number = 0;
  userRate: string | number = 0;
  countVoters: string | number = 0;
  explicit: boolean = false;
  ownerArtists: Artist[] = [];
  featArtists: Artist[] = [];
  publicationYear: string | number = '';
  type: string | null = null;
  duration: string = '';
  genres: Genre[] = [];
  slugId: string | null = null;
  slug: string | null = null;
  accessibility: Accessibility = {
    type: null,
    price: {
      toman: null,
      dollar: null
    }
  }
  support: Support = {
    available: false,
    price: {
      toman: null,
      dollar: null
    }
  }
  publishedAt: string | null = null;
  timeNow: string | null = null;
  keywords: string | null = null;
  description: string | null = null;
}
