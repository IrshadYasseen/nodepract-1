const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema(
    {
        'q_no': {
            type: Number,
            required: [true,'Question number is required']
        },
        'question': {
            type: String,
            required: [true,'Question is required']
        },
        'key': {
            type: String,
            required: [true,'Key is required']
        }

    }
)
questionSchema.index({ 'q_no': 1 }, { unique: true })
const Questions = questionSchema('Questions', questionSchema)
module.exports = Questions