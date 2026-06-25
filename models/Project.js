import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // Image URL
    required: true
  },
  techStack: {
    type: [String], // ['React', 'Node.js', 'MongoDB']
    required: true
  },
  githubLink: String,
  liveLink: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;