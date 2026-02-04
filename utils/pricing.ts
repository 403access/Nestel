import { ALL_MENUS, Menu } from '@/data/menus';
import { BreadProduct } from '@/data/products';

/**
 * Calculates the current and original price for a product,
 * considering any discounts from selected menus.
 * @param product The product for which to calculate prices.
 * @param selectedMenusIds An array of IDs of currently selected menus.
 * @returns An object containing currentPrice and originalPrice.
 */
export const getPriceInfo = (
  product: BreadProduct,
  selectedMenusIds: number[]
): { currentPrice: number; originalPrice: number } => {
  let currentPrice = product.price;
  const originalPrice = product.price;

  if (selectedMenusIds.length > 0 && product.menuIds && product.menuIds.length > 0) {
    // Find the best discount from selected menus
    for (const menuId of selectedMenusIds) {
      const menu = ALL_MENUS.find(m => m.id === menuId);
      if (menu && menu.offers) {
        for (const offer of menu.offers) {
          const menuItem = offer.items.find(item => item.productId === product.id);
          if (menuItem && menuItem.discountPrice !== undefined) {
            currentPrice = Math.min(currentPrice, menuItem.discountPrice);
          }
        }
      }
    }
  }
  return { currentPrice, originalPrice };
};
