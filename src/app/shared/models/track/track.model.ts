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

class Video {
  title_fa: string = '';
  title_en: string = '';
  slug: string | null = null;
  slug_id: string | null = null;
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

export class Track {
  thumbnail: string | null = null;
  titleFa: string = '';
  titleEn: string = '';
  trackRate: string | number = 0;
  userRate: string | number = 0;
  countVoters: string | number = 0;
  explicit: boolean = false;
  ownerArtists: Artist[] = [];
  featArtists: Artist[] = [];
  publicationYear: string | number = '';
  type: string | null = null;
  duration: string = '';
  plays: string | number = '';
  downloads: string | number = '';
  genres: Genre[] = [];
  slug: string | null = null;
  slugId: string | null = null;
  video: Video = {
    title_fa: '',
    title_en: '',
    slug: null,
    slug_id: null,
  };
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
  musicArtists: Artist[] = [];
  singerArtists: Artist[] = [];
  instrumentalistArtists: Artist[] = [];
  lyricistArtists: Artist[] = [];
  arrangementArtists: Artist[] = [];
  mixMasterArtists: Artist[] = [];
  lyrics: string = '';
  keywords: string | null = null;
  description: string | null = null;
}
