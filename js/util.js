/**
 * Функция возвращает случайное целого число в заданном интервале, включительно
 * @param {number} min - первое положительное число, включая "0"
 * @param {number} max - второе положительное число, больше первого
 * @param {boolean} includesMax - если true, результат может включать значение 'max'
 */
export function getRandomInteger(min, max, includesMax = false) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('один из параметров не является целым числом');
  }
  if (min < 0 || max <= min) {
    throw new Error(
      'параметры не удовлетворяют условиям: min, max > 0, max > min'
    );
  }
  let result;
  if (includesMax) {
    result = min + Math.floor(Math.random() * (max - min + 1));
  } else {
    result = min + Math.floor(Math.random() * (max - min));
  }
  return result;
}

/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
 * @param {number} min        - первое положительное число, включая 0
 * @param {number} max        - второе положительное число, больше первого
 * @param {number} precision  - количество знаков после запятой, целое число >= 1
 */
export function getRandomFloat(min, max, precision) {
  if (
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    typeof precision !== 'number' ||
    isNaN(min) ||
    isNaN(max) ||
    isNaN(precision)
  ) {
    throw new Error('один или несколько паоаметров не являются числами');
  }
  if (min < 0 || max <= min || precision < 1 || !Number.isInteger(precision)) {
    throw new Error(
      'нарушены условия: min, precision > 0, max > min, precision - целое число'
    );
  }
  let result = min + Math.random() * (max - min);
  const scalar = 10 ** precision;
  result = Math.round(result * scalar) / scalar;
  return result > max ? max : result;
}
