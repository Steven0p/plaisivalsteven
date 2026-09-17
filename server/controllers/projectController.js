const projectModel = require('../models/projectModel');

async function listProjects(req, res, next) {
  try {
    const projects = await projectModel.findAll();
    return res.json(projects);
  } catch (err) {
    return next(err);
  }
}

async function createProject(req, res, next) {
  try {
    const project = await projectModel.create(req.body);
    return res.status(201).json(project);
  } catch (err) {
    return next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const updated = await projectModel.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Pwojè a pa jwenn.' });
    }
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const deleted = await projectModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Pwojè a pa jwenn.' });
    }
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { listProjects, createProject, updateProject, deleteProject };
