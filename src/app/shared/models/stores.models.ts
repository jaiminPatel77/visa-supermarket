export interface StoreFormatFeature {
  title: string;
}

export interface StoreFormat {
  id: string; // grocery | supermarket | warehouse
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  mainImageKey: string;
  subImage1Key: string;
  subImage2Key: string;
}
