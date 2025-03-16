const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    stud_id: {
        type: Number,
        required: [true, 'Student ID is required']
    },
    ans_no: {
        type: Number,
        required: [true, 'Student ID is required']
    },
    ans: {
        type: String,
        required: false,
        default: ''
    },
},
    {
    Timestamp: true
    });

answerSchema.index({ stud_id: 1, ans_no: 1 }, { unique: true });    
const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;