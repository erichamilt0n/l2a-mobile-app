export interface SanityEvent {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  eventDate: string;
  endDate?: string;
  category: "tournament" | "social" | "training";
  venue: {
    name: string;
    address: string;
    city: string;
    postcode: string;
  };
  mainImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt: string;
    caption?: string;
  };
  capacity: number;
}
