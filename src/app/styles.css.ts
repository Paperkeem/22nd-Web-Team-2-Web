import { palette } from '@/styles/color';
import { expandGlobalPadding } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const filterContainer = style([
  expandGlobalPadding,
  {
    display: 'flex',
    columnGap: 8,
    flexWrap: 'nowrap',
    overflowX: 'scroll',
    alignItems: 'center',
    '::-webkit-scrollbar': {
      display: 'none'
    },
    background: palette.white
  }
]);

export const title = style([
  expandGlobalPadding,
  {
    background: palette.white,
    paddingBottom: 16,
    paddingTop: 32
  }
]);

export const empty = style({
  padding: '54px 0',
  textAlign: 'center'
});
