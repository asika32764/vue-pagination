import { PageType } from '../enum/PageType';

export interface PageItem {
  type: PageType;
  page: number;
  active: boolean;
  disabled: boolean;
}
