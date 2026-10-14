const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const getIds = (objects) => objects.map(({ id }) => id);
const pickProducts = (ids) => ids.map((id) => products.find((product) => product.id === id));

describe('sortProductsByPrice', () => {
  describe('По возрастанию', () => {
    test("все товары с 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
      expect(getIds(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
    });

    test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
      expect(getIds(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
    });

    test("товары [1, 3, 4] с 'asc' сортируются как [3, 4, 1]", () => {
      const inputProducts = pickProducts([1, 3, 4]);

      expect(getIds(sortProductsByPrice(inputProducts, 'asc'))).toEqual([3, 4, 1]);
    });
    
  });

  describe('По убыванию', () => {
    test("все товары с 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
      expect(getIds(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
    });
    
    test("товары [3, 1, 4] с 'desc' сортируются как [1, 4, 3]", () => {
      const inputProducts = pickProducts([3, 1, 4]);

      expect(getIds(sortProductsByPrice(inputProducts, 'desc'))).toEqual([1, 4, 3]);
    });
    
    test("товары [5, 2, 6] с 'desc' сортируются как [2, 5, 6]", () => {
      const inputProducts = pickProducts([5, 2, 6]);
      
      expect(getIds(sortProductsByPrice(inputProducts, 'desc'))).toEqual([2, 5, 6]);
    });
  });

  describe('Исходный массив не меняется', () => {
    test("'asc' не меняет исходный массив [1, 3, 4]", () => {
      const inputProducts = pickProducts([1, 3, 4]);
      
      sortProductsByPrice(inputProducts, 'asc');
      
      expect(getIds(inputProducts)).toEqual([1, 3, 4]);
    });
    
    test("'desc' не меняет исходный массив [1, 3, 4]", () => {
      const inputProducts = pickProducts([1, 3, 4]);

      sortProductsByPrice(inputProducts, 'desc');

      expect(getIds(inputProducts)).toEqual([1, 3, 4]);
    });

    test('направление по умолчанию не меняет исходный массив всех товаров', () => {
      sortProductsByPrice(products);

      expect(getIds(products)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
