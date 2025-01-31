import {EColorSideDishList, TStatusType} from "./utils";

export const colorTheme = {
  primary: '#FF4713',
  active: '#0C783C',
  darkPrimary: '#D5401E',
  navbar: '#EFF3F4',
  black: '#000000',
  white: '#FFFFFF',
}

export const statusColorIcon: Record<TStatusType, string> = {
  'completed': '#BADBC6',
  'cancelled': '#C0C0C2',
  'processing': '#E1B4AA',
  'cancel-request': '#E9D5AA',
  'on-hold': '#BBC6E0',
}

export const statusColorText: Record<TStatusType, string> = {
  'completed': colorTheme.active,
  'cancelled': '#68696D',
  'processing': colorTheme.darkPrimary,
  'cancel-request': '#F1AC1D',
  'on-hold': '#567DD2',
}

export const colorSideDishList: Record<EColorSideDishList, string> = {
  'RISE': '#3454A24D',
  'SALAD': '#0C783C4D',
  'GRILLED': '#D5401E4D',
  'POTATO': '#F4CF104D',
  'BARLEY': '#E0E0E0',
}
