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

export class Podcast {
  thumbnail: string | null = null;
  titleFa: string = '';
  titleEn: string = '';
  owner: string = '';
  info: string = '';
  explicit: boolean = false;
  followersCount: string | number = 0;
  slugId: string | null = null;
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
  keywords: string | null = null;
  description: string | null = null;
  followAction: string | null = null;
}
