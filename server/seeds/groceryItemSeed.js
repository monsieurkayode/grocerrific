/* eslint-disable no-console */
import GroceryItem from '../models/groceryItem';

export const groceryItems = [
  {
    name: 'Power Oil',
    price: 1500,
    quantity: 0,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMG9pbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Prawn Crackers',
    price: 550,
    quantity: 21,
    imageUrl: 'https://images.unsplash.com/photo-1512654448383-47b2fe224e44?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByYXduJTIwY3JhY2tlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Potato Chips',
    price: 2410,
    quantity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1613462847848-f65a8b231bb5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cG90YXRvJTIwY2hpcHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'French Stick',
    price: 920,
    quantity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1484344597163-9347ad5cb26d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlbmNoJTIwc3RpY2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Cabbage',
    price: 235,
    quantity: 63,
    imageUrl: 'https://images.unsplash.com/photo-1504721838965-dfcb29cc11f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhYmJhZ2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Baron de Valis',
    price: 2210,
    quantity: 45,
    imageUrl: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdpbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Cottage Cheese',
    price: 1780,
    quantity: 25,
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dHRhZ2UlMjBjaGVlc2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Green Pepper',
    price: 150,
    quantity: 60,
    imageUrl: 'https://images.unsplash.com/photo-1531697282252-191262363e2b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGdyZWVuJTIwcGVwcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

export const seedDb = () => {
  GroceryItem.count({}, (err, count) => {
    if (err) throw new Error('Database transaction error');
    if (!count) {
      GroceryItem.deleteMany({}, (e) => {
        if (e) throw new Error('Database transaction error');
        console.log('🍺 Seeding Database...');

        groceryItems.forEach((groceryItem) => {
          const newGroceryItem = new GroceryItem(groceryItem);
          newGroceryItem.save();
        });

        console.log('🍺 Database successfully seeded....');
      });
    }
  });
};
