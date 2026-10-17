export interface MilestoneItem {
  id: string;
  period: string; // e.g. "Phase I", "Expansion Phase", etc. marked with TODO
  title: string;
  description: string;
  isPlaceholder: boolean;
}
