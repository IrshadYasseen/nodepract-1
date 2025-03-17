const express = require('express');
const mongoose = require('mongoose');
const Answers = require('./models/answers');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const uri = process.env._MONGO_cs_1;

// middleware for json
app.use(express.json())

// console.log('MongoDB Connection URI:', uri); 
// Connect to MongoDB
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
});

// listen 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});

// Define a route
app.get('/api', async(req, res) => {
    res.send('Hello World');
});

app.post('/api/answers',async (req, res) => {
    try {

        const answers = await Answers.create(req.body)
        res.status(200).json(answers)
        
    }
    catch (err) {
        res.status(500).json({'message': err.message});
    }

}
)

// get all answers
app.get("/api/answers", async (req, res) => {
    try {
        const answers = await Answers.find({});
        res.status(200).json(answers);
    }
    catch (err) {
        res.status(500).json({'message': err.message});
    }
})

// get selected id
app.get("/api/answers/id/:id", async (req, res) => {
    try {
        const answer = await Answers.findById(req.params.id);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }
        res.status(200).json(answer);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


// it dosent matter if in url there is sid and in values stuid since req.params gets values
app.get("/api/answers/:s_id/:a_no", async (req, res) => {
    try {
        const { s_id, a_no } = req.params
        const answer = await Answers.findOne({ stud_id: s_id, ans_no: a_no })
        if (!answer) {
            return res.status(404).json("Answer not found")
        }
        res.status(200).json(answer)
        
    }
    catch (e) {
        res.status(500).json({message:e.message})
        
    }
})

//delete

app.delete("/api/answers/:stu_id/:ans_no", async (req, res) => {
    try {
        const { stu_id,ans_no } = req.params;
        const answer = await Answers.findOneAndDelete({stud_id: stu_id,ans_no: ans_no });
        if (!answer) {
            return res.status(404).json({ 'message': 'Answer not found' });
        }
        res.status(200).json({"message":"deleted ",'answer':answer});
        
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });

    }
})

// update
app.put("/api/answers/:stud_id/:ans_no", async (req, res) => {
    try {
        const { stud_id, ans_no } = req.params;
        const answer = await Answers.findOneAndUpdate({ stud_id, ans_no }, req.body)
        if (!answer) {
            res.status(404).json({'text-Error':"No answer found"})
        }
        const update_ans = await Answers.findOne({ stud_id, ans_no });
        res.status(200).json(update_ans)
    }
    catch (e) {
        res.status(500).json({ 'message':e.message})
        
    }
})