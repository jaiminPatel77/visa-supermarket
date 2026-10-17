import { StatItem } from '../shared/models/stats.models';

export const STATS_DATA: StatItem[] = [
  {
    id: 'stores',
    // TODO: PLACEHOLDER - replace with confirmed store count across European markets
    value: 280,
    suffix: '+',
    label: 'Stores',
    isPlaceholder: true,
    notes: 'Placeholder count pending validated corporate registry figures'
  },
  {
    id: 'formats',
    value: 3,
    suffix: '',
    label: 'Retail Formats',
    isPlaceholder: false,
    notes: 'Grocery Store, Supermarket, and Warehouse Formats'
  },
  {
    id: 'experience',
    // TODO: PLACEHOLDER - replace with confirmed operational years
    value: 25,
    suffix: '+',
    label: 'Years of Experience',
    isPlaceholder: true,
    notes: 'Placeholder operational span pending validated group founding date'
  }
];
