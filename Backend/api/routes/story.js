var express = require('express');
var router = express.Router();
var storyModel = require('../models/story');


router.get('/', async (req, res) => {
  try {
    const stories = await storyModel.find();
    res.json(stories);
  } catch (err) {
    console.error("Error fetching Stories:", err);
    res.status(500).json({ message: 'Error fetching stories' });
  }
});

router.post('/add', async (req, res) => {
  const storyDetails = new storyModel(req.body); // Directly use req.body
  try {
    await storyDetails.save();
    res.status(201).json({ message: 'Story successfully added', story: storyDetails });
  } catch (err) {
    console.error("Error saving Story:", err);
    res.status(500).json({ message: 'Error saving story' });
  }
});

// Fetch a single story by ID
router.get('/:_id', async (req, res) => {
  try {
    const story = await storyModel.findById(req.params._id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    console.error("Error fetching story:", err);
    res.status(500).json({ message: 'Error fetching story' });
  }
});

// Update an existing story by ID
router.put('/update/:_id', async (req, res) => {
  try {
    const updatedStory = await storyModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updatedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Story updated successfully', story: updatedStory });
  } catch (err) {
    console.error("Error updating story:", err);
    res.status(500).json({ message: 'Error updating story' });
  }
});

module.exports = router;