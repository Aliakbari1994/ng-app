class Artist {
  name_fa: string = '';
  name_en: string = '';
  slug: string = '';
  slug_id: string = '';
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

class Track {
  'track_number': string = '';
  slug_id: string | null = null;
  slug: string | null = null;
  title_fa: string = '';
  title_en: string = '';
  duration: string = '';
  lyrics: string = '';
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
  owner_artists: Artist[] = [];
  feat_artists: Artist[] = [];
  music_artists: Artist[] = [];
  singer_artists: Artist[] = [];
  instrumentalist_artists: Artist[] = [];
  lyricist_artists: Artist[] = [];
  arrangement_artists: Artist[] = [];
  mixMaster_artists: Artist[] = [];
}

export class AlbumTracks {
  tracks: Track[] = [];
}
