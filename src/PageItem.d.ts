import { PageType } from './PageType';

export default interface PageItem {
  type: PageType;
  page: number;
  active: boolean;
  disabled: boolean;
}
