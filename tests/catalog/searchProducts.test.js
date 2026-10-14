const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

const getIds = (objects) => objects.map(({ id }) => id);

describe('searchProducts', () => {
  describe('Точное совпадение', () => {
    test("'Наушники' возвращает товар с ID 1", () => {
      expect(getIds(searchProducts(products, 'Наушники'))).toContain(1);
    });
    
    test("'Чистый код' возвращает товар с ID 6", () => {
      expect(getIds(searchProducts(products, 'Чистый код'))).toContain(6);
    });

    test("'Настольная лампа' возвращает товар с ID 4", () => {
      expect(getIds(searchProducts(products, 'Настольная лампа'))).toContain(4);
    });
  });

  describe('Регистронезависимый запрос', () => {
    test("'javascript' возвращает товар с ID 3", () => {
      expect(getIds(searchProducts(products, 'javascript'))).toContain(3);
    });
    
    test("'ЧЕХОЛ' возвращает товар с ID 5", () => {
      expect(getIds(searchProducts(products, 'ЧЕХОЛ'))).toContain(5);
    });
    
    test("'наушники' возвращает товар с ID 1", () => {
      expect(getIds(searchProducts(products, 'наушники'))).toContain(1);
    });
  });

  describe('Пустой запрос', () => {
    test('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
      expect(getIds(searchProducts(products, ''))).toEqual([1, 2, 3, 4, 5, 6]);
    });
    
    test('строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
      expect(getIds(searchProducts(products, '   '))).toEqual([1, 2, 3, 4, 5, 6]);
    });
  
    test("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
      expect(getIds(searchProducts(products, '\t\n'))).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
