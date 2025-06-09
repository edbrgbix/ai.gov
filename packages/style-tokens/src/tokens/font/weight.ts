import transformArrayToObject from '../../helpers/transform-array-to-object.js';
import type { FontTuple } from './index.js';

const fontWeights: FontTuple[] = [
  ['400', '400'],
  ['600', '600'],
  ['normal', '{font.weight.400}'],
  ['semibold', '{font.weight.600}'],
];

export default transformArrayToObject(fontWeights, 'string');
