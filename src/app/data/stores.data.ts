import { StoreFormat } from '../shared/models/stores.models';

export const STORE_FORMATS: StoreFormat[] = [
  {
    id: 'grocery',
    title: 'Grocery Store',
    shortDescription:
      'Convenient neighborhood-scale stores focused on everyday essentials and straightforward shopping.',
    fullDescription:
      'Our grocery-store format is designed around convenience and everyday essentials. These stores provide a focused shopping experience in a practical, approachable environment.',
    features: ['Everyday essentials', 'Efficient store layout', 'Convenient shopping format'],
    mainImageKey: 'store-grocery-main',
    subImage1Key: 'store-grocery-sub1',
    subImage2Key: 'store-grocery-sub2'
  },
  {
    id: 'supermarket',
    title: 'Supermarket',
    shortDescription:
      'Full-size stores designed to bring together broad everyday selection, convenience and a comfortable shopping experience.',
    fullDescription:
      'Our supermarket format combines breadth, convenience and an inviting retail environment. It is designed for customers completing their regular household shopping in one well-organized space.',
    features: [
      'Broad everyday selection',
      'Comfortable shopping environment',
      'Modern retail experience'
    ],
    mainImageKey: 'store-supermarket-main',
    subImage1Key: 'store-supermarket-sub1',
    subImage2Key: 'store-supermarket-sub2'
  },
  {
    id: 'warehouse',
    title: 'Warehouse',
    shortDescription:
      'Large-format retail environments designed around scale, efficiency and broad product availability.',
    fullDescription:
      'Our warehouse-format stores operate at a larger scale, combining efficient layouts with extensive retail capacity and a straightforward shopping experience.',
    features: ['Large-format retail', 'Operational efficiency', 'Built for scale'],
    mainImageKey: 'store-warehouse-main',
    subImage1Key: 'store-warehouse-sub1',
    subImage2Key: 'store-warehouse-sub2'
  }
];
