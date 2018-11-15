/* eslint-disable no-console */
import GroceryItem from '../models/groceryItem';

export const groceryItems = [
  {
    name: 'Power Oil',
    price: 1500,
    quantity: 34
  },
  {
    name: 'Prawn Crackers',
    price: 550,
    quantity: 21
  },
  {
    name: 'Potato Chips',
    price: 2410,
    quantity: 50
  },
  {
    name: 'French Stick',
    price: 920,
    quantity: 5
  },
  {
    name: 'Cabbage',
    price: 235,
    quantity: 63
  },
  {
    name: 'Baron de Valis',
    price: 2210,
    quantity: 45
  },
  {
    name: 'Cottage Cheese',
    price: 1780,
    quantity: 25
  },
  {
    name: 'Green Pepper',
    price: 150,
    quantity: 60
  }
];

export const seedDb = () => {
  GroceryItem.deleteMany({}, (err) => {
    if (err) throw new Error('Database transaction error');
    console.log('🍺 Seeding Database...');

    groceryItems.forEach((groceryItem) => {
      const newGroceryItem = new GroceryItem(groceryItem);
      newGroceryItem.save();
    });

    console.log('🍺 Database successfully seeded....');
  });
};
