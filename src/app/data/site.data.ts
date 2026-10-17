import { BrandData } from '../shared/models/site.models';

// TODO: PLACEHOLDER - replace with confirmed corporate legal identity and brand guidelines
export const BRAND_DATA: BrandData = {
  name: 'EUROVA MARKET GROUP',
  tagline: 'Everyday retail. Built around people.',
  copyrightYear: 2026,
  isPlaceholder: true
};

export const SITE_COPY = {
  header: {
    ariaLabel: 'Primary navigation'
  },
  home: {
    hero: {
      eyebrow: 'EUROVA MARKET GROUP',
      heading: 'Retail built for everyday life.',
      text: 'Across our growing network, we operate modern grocery stores, supermarkets and warehouse-format stores designed around quality, accessibility and everyday value.',
      exploreStoresLabel: 'Explore Our Stores',
      exploreStoresRoute: '/our-stores',
      aboutGroupLabel: 'About Our Group',
      aboutGroupRoute: '/about-us'
    },
    intro: {
      eyebrow: 'Our Retail Footprint',
      heading: 'A retail group built for communities.',
      lead: 'Eurova Market Group brings together multiple retail formats under one shared approach: dependable everyday shopping, thoughtfully designed stores and consistently high operating standards.'
    },
    formats: {
      eyebrow: 'Retail Network',
      heading: 'Three formats. One standard.',
      lead: 'Our formats are tailored to match community and shopping dynamics while adhering to rigorous operational consistency.'
    },
    brandMessage: {
      heading: 'Committed to dependable retail across European communities.',
      text: 'Every format in our network is developed with long-term infrastructure, direct operating discipline and a clear focus on serving daily household needs.'
    },
    faqTeaser: {
      eyebrow: 'Quick Answers',
      heading: 'Questions about our group?',
      viewAllLabel: 'View all FAQs',
      viewAllRoute: '/faq'
    }
  },
  ourStores: {
    heading: 'Our Store Formats',
    intro: 'Our retail network operates through three distinct formats, allowing us to serve different shopping needs while maintaining consistent standards across the group.'
  },
  aboutUs: {
    heading: 'Built for everyday retail.',
    ourStory: {
      heading: 'Our Story',
      // TODO: PLACEHOLDER - replace with confirmed group corporate history and foundation archive
      text: 'Eurova Market Group was created around a simple principle: everyday retail should be dependable, accessible and thoughtfully operated. Over time, the group has expanded through multiple retail formats while maintaining a consistent focus on store quality, operational discipline and customer experience.',
      isPlaceholder: true
    },
    vision: {
      heading: 'Our Vision',
      text: 'To build a trusted modern retail group known for dependable everyday shopping experiences.'
    },
    mission: {
      heading: 'Our Mission',
      text: 'To operate efficient, welcoming and consistent retail environments while adapting our formats to different everyday shopping needs.'
    },
    values: {
      eyebrow: 'Guiding Principles',
      heading: 'The values shaping our retail operations.'
    },
    milestones: {
      eyebrow: 'Group Development',
      heading: 'Key operational milestones.'
    }
  },
  faq: {
    heading: 'Frequently Asked Questions',
    intro: 'Common inquiries regarding Eurova Market Group, our corporate structure, store formats, and operating standards.'
  },
  notFound: {
    heading: 'Page Not Found',
    message: 'The page you requested does not exist or has been moved within our corporate portal.',
    backHomeLabel: 'Return to Home',
    backHomeRoute: '/'
  },
  footer: {
    description: 'European retail group operating modern grocery stores, supermarkets and warehouse formats.',
    copyrightNote: 'Eurova Market Group. All rights reserved.'
  }
};
