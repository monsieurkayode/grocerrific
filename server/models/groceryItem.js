import mongoose from 'mongoose';

const { Schema } = mongoose;

const groceryItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name should be minimum of 3 characters'],
    maxlength: [30, 'Name should be maximum of 30 characters'],
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true
  },
  quantity: {
    type: Number,
    min: [0, 'Invalid quanity value'],
    required: [true, 'Quantity is required'],
  },
  inStock: Boolean
});

groceryItemSchema.pre('save', function (next) { // eslint-disable-line
  this.set({ inStock: this.quantity > 0 });
  next();
});

const GroceryItemModel = mongoose.model('GroceryItem', groceryItemSchema);

export default GroceryItemModel;
