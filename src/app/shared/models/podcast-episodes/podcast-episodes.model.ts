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

class Episode {
  episode_number: string = '';
  slug_id: string | null = null;
  slug: string | null = null;
  title_fa: string = '';
  title_en: string = '';
  thumbnail: string | null = null;
  duration: string = '';
  info: string = '';
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
}

export class PodcastEpisodes {
  episodes: Episode[] = [];
}
