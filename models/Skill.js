import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

export default mongoose.model('Skill', skillSchema);