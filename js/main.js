/**
 * Функция возвращает случайное целого число в заданном интервале, включительно
 * @param {number} min - первое положительное число, включая "0"
 * @param {number} max - второе положительное число, больше первого
 * @param {boolean} includesMax - если true, результат может включать значение 'max'
 */
function getRandomInteger(min, max, includesMax = false) {
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

getRandomInteger(1, 3, true);

/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
 * @param {number} min        - первое положительное число, включая 0
 * @param {number} max        - второе положительное число, больше первого
 * @param {number} precision  - количество знаков после запятой, целое число >= 1
 */
function getRandomFloat(min, max, precision) {
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
  const result = roundTo(min + Math.random() * (max - min), precision);
  return result > max ? max : result;
}

function roundTo(value, precision) {
  const scalar = 10 ** precision;
  const result = Math.round(value * scalar) / scalar;
  return result;
}

getRandomFloat(0.15, 0.19, 2);
