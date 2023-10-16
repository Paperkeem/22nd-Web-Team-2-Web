import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const calendar = style({
  width: 'calc(100% + 40px)',
  margin: 'auto',
  backgroundColor: palette.white,
  color: palette.gray900,
  transform: `translateX(${-GLOBAL_PADDING_X}px)`,
  padding: '20px 0'
});

export const dotWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute'
});

export const dot = recipe({
  base: {
    height: '4px',
    width: '4px',
    borderRadius: '4px',
    display: 'flex',
    marginTop: '28px'
  },
  variants: {
    date: {
      today: {
        backgroundColor: palette.white
      },
      other: {
        backgroundColor: palette.gray600
      }
    }
  }
});

globalStyle(`${calendar} *`, {
  MozBoxSizing: 'border-box',
  WebkitBoxSizing: 'border-box',
  boxSizing: 'border-box'
});

globalStyle(`${calendar} &::after`, {
  MozBoxSizing: 'border-box',
  WebkitBoxSizing: 'border-box',
  boxSizing: 'border-box'
});

globalStyle(`${calendar} &::before`, {
  MozBoxSizing: 'border-box',
  WebkitBoxSizing: 'border-box',
  boxSizing: 'border-box'
});

globalStyle(`${calendar} button`, {
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  // padding: '4px 6px 4px 6px',
  textAlign: 'center'
});

globalStyle(`${calendar} button:enabled:hover`, {
  cursor: 'pointer'
});

// 캘린더 인디케이터
globalStyle(`${calendar} .react-calendar__navigation`, {
  display: 'flex',
  alignItems: 'center',
  height: '44px',
  padding: '0px 80px 0px 80px'
});

globalStyle(`${calendar} .react-calendar__navigation button`, {
  fontSize: '14px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 700
});

// 요일 column
globalStyle(`${calendar} .react-calendar__month-view__weekdays`, {
  padding: '12px 12px 4px 12px',
  fontSize: '12px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '14px',
  color: '#6c6c6c',
  textAlign: 'center'
});

// 날짜 container
globalStyle(`${calendar} .react-calendar__month-view__days`, {
  padding: '0px 12px 0px 12px'
});

globalStyle(`${calendar} .react-calendar__tile`, {
  margin: 0,
  border: 0,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: '12px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '14px',
  color: '#6c6c6c',

  position: 'relative'
});

globalStyle(`${calendar} .react-calendar__tile::before`, {
  content: '',
  position: 'absolute',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  zIndex: -100
});

// 날짜 호버됐을 시
globalStyle(`${calendar} .react-calendar__tile:enabled:hover`, {
  color: palette.primary200
});
globalStyle(`${calendar} .react-calendar__tile:enabled:hover::before`, {
  background: palette.primary50
});

globalStyle(`${calendar} .react-calendar__month-view__days__day--weekend`, {
  color: palette.error
});

globalStyle(
  `${calendar} .react-calendar__month-view__days__day--neighboringMonth`,
  {
    color: palette.gray200
  }
);

// 오늘 날짜
globalStyle(`${calendar} .react-calendar__tile--now `, {
  color: palette.white
});
globalStyle(`${calendar} .react-calendar__tile--now::before`, {
  background: palette.gray900
});

// 선택한 날짜
globalStyle(`${calendar} .react-calendar__tile--active:enabled:focus`, {
  color: palette.gray800
});
globalStyle(`${calendar} .react-calendar__tile:enabled:focus::before`, {
  background: palette.gray200
});
