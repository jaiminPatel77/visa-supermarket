import { FaqItem } from '../shared/models/faq.models';

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'what-is-eurova',
    question: 'What is Eurova Market Group?',
    answer:
      'Eurova Market Group is an established European retail group operating modern grocery stores, supermarkets, and warehouse-format retail environments. The group is structured around quality, accessibility, long-term infrastructure, and dependable everyday shopping.',
    isHomeTeaser: false
  },
  {
    id: 'store-types',
    question: 'What types of stores does Eurova operate?',
    answer:
      'The group operates three distinct formats: Grocery Stores (neighborhood-scale stores focused on everyday essentials), Supermarkets (full-size stores designed for comprehensive household shopping), and Warehouse-format stores (large-format environments designed around scale, efficiency, and high merchandise capacity).',
    isHomeTeaser: true
  },
  {
    id: 'online-store',
    question: 'Does Eurova operate an online store?',
    answer:
      'No. This website provides information about Eurova Market Group and its retail formats. Products cannot be purchased through this website.',
    isHomeTeaser: true
  },
  {
    id: 'purchase-online',
    question: 'Can I purchase products through this website?',
    answer:
      'No. This website provides information about Eurova Market Group and its retail formats. Products cannot be purchased through this website.',
    isHomeTeaser: false
  },
  {
    id: 'store-locations',
    question: 'Where are Eurova stores located?',
    answer:
      'Eurova Market Group operates across selected European markets. Individual store locations and addresses are not published on this website.',
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
