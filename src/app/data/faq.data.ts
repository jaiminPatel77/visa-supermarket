import { FaqItem } from '../shared/models/faq.models';

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'what-is-kineth',
    question: 'What is Kineth Supermarket?',
    answer:
      'Kineth Supermarket is an established European retail group operating modern grocery stores, supermarkets, and warehouse-format retail environments. The group is structured around quality, accessibility, long-term infrastructure, and dependable everyday shopping.',
    isHomeTeaser: false
  },
  {
    id: 'store-types',
    question: 'What types of stores does Kineth operate?',
    answer:
      'The group operates three distinct formats: Grocery Stores (neighborhood-scale stores focused on everyday essentials), Supermarkets (full-size stores designed for comprehensive household shopping), and Warehouse-format stores (large-format environments designed around scale, efficiency, and high merchandise capacity).',
    isHomeTeaser: true
  },
  {
    id: 'online-store',
    question: 'Does Kineth operate an online store?',
    answer:
      'No. This website provides information about Kineth Supermarket and its retail formats. Products cannot be purchased through this website.',
    isHomeTeaser: true
  },
  {
    id: 'purchase-online',
    question: 'Can I purchase products through this website?',
    answer:
      'No. This website provides information about Kineth Supermarket and its retail formats. Products cannot be purchased through this website.',
    isHomeTeaser: false
  },
  {
    id: 'store-locations',
    question: 'Where are Kineth stores located?',
    answer:
      'Kineth Supermarket operates across selected European markets. Individual store locations and addresses are not published on this website.',
    isHomeTeaser: true
  },
  {
    id: 'store-format-consistency',
    question: 'Does every store follow the same format?',
    answer:
      'No. Our stores are organized across three distinct formats—Grocery Store, Supermarket, and Warehouse—to align with community requirements while maintaining uniform operational excellence across the entire group.',
    isHomeTeaser: false
  }
];
