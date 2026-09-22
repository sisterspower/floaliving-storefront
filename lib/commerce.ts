import { products, type Product } from './products';
export interface CommerceAdapter{getCollection(handle:'robes'|'towels'):Promise<Product[]>;getProduct(handle:string):Promise<Product|undefined>}
export const mockCommerce:CommerceAdapter={async getCollection(handle){return products.filter(p=>p.category===handle)},async getProduct(handle){return products.find(p=>p.handle===handle)}};
// Phase 2: replace this adapter with Shopify Storefront API / Web Components.
// Preserve Product/Variant shape so UI components do not need redesigning.
