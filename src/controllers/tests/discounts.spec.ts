// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import DiscountController from '../discounts';

describe('Discount controller', () => {
  const controller = new DiscountController();

  describe('calculate discount on item', () => {
    it('should return correct value for type FROM_MIN_QUANTITY', () => {
      const discountValue = 25;
      const discountCalculated = controller['calculateDiscount'](
        {
          value: 0.25,
          minItems: 3,
          type: 'FROM_MIN_QUANTITY',
        },
        20,
        5
      );

      expect(discountCalculated).toBe(discountValue);
    });

    it('should return correct value for type ONLY_MIN_QUANTITY', () => {
      const discountValue = 5;
      const discountCalculated = controller['calculateDiscount'](
        {
          value: 1,
          minItems: 2,
          type: 'ONLY_MIN_QUANTITY',
        },
        5,
        3
      );

      expect(discountCalculated).toBe(discountValue);
    });
  });
});
