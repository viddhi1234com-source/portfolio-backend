import Project from '../models/Project.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({
      success: true,
      data: newProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
};