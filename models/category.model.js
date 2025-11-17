const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        autoIncrement: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    image: {
        type: String,
        required: true,
        get(value) {
            if (!value) return value;
            return `${process.env.BASE_URL}${value}`;
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
        default: null
    }
}, {
    toJSON: { getters: true },
    toObject: { getters: true }
})

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;