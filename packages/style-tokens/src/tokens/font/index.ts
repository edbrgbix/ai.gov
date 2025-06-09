import weight from './weight.js';
import lineheight from './lineheight.js';

export type FontKey = string | number;
export type FontValue = string | number;
export type FontTuple = [key: FontKey, value: FontValue];

export default {
  lineheight,
  'underline-offset': {
    value: '6px',
    type: 'string',
  },
  weight,
};
