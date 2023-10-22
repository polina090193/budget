const categories = [
  {
    "id": "000",
    "name": "All categories",
    "slug": "all",
    "link": "/"
  },
  {
    "id": "001",
    "name": "Cat",
    "slug": "cat"
  },
  {
    "id": "002",
    "name": "Dog",
    "slug": "dog"
  },
  {
    "id": "003",
    "name": "Food",
    "slug": "food"
  },
  {
    "id": "004",
    "name": "Flat",
    "slug": "flat"
  }
];

export const getAllCategories = () => categories;

export const getCategoryById = id => categories.find((category) => category.id === id);
