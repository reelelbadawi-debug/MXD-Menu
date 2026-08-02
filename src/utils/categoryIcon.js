// The Google Sheet has no "Icon" column (by design — one less thing to
// manage there). Instead we infer a reasonable icon from the category
// name's keywords, falling back to a generic plate icon.
const RULES = [
  [/برجر|burger/i, 'burger'],
  [/شاورما|راب|فرنساوي|سوري|wrap|shawarma/i, 'wrap'],
  [/مشروب|drink|قهوه|قهوة|عصير|كولا/i, 'cup'],
  [/سلط|salad/i, 'bowl'],
  [/حلو|كنافه|كنافة|dessert|sweet/i, 'dessert'],
  [/بطاطس|مقبل|fries|appetizer/i, 'fries'],
  [/صوص|sauce/i, 'sauce'],
];

export function inferCategoryIcon(categoryName) {
  const match = RULES.find(([regex]) => regex.test(categoryName));
  return match ? match[1] : 'plate';
}
