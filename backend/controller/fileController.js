const File = require('../model/fileModel')
const mongoose = require('mongoose')

// get all files
const getFiles = async (req, res) => {
  const {email} = req.body

  console.log(email)

  const files = await File.find().sort({year: -1})

  res.status(200).json(files)
}

// get a single file
const getFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such File'})
  }

  const file = await File.findById(id)

  if (!file) {
    return res.status(404).json({error: 'No such File'})
  }
  
  res.status(200).json(file)
}

// Find only task of owner

const getOnlyOwnerTask = async (req, res) => {
  const {email} = req.body

  const file = await File.find({owner: {$in: email}})

  res.status(200).json(file)
}

// create new file
const createFile = async (req, res) => {
  const {task, owner} = req.body

  let emptyFields = []

  if(!task) {
    emptyFields.push('No Task Contents')
  }
  // add file to db
  try {
    const file = await File.create({task, owner})
    res.status(200).json(file)
  } catch (error) {
    res.status(400).json({error: emptyFields})
  }
}

// delete a file
const deleteFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such File'})
  }

  const file = await File.findOneAndDelete({_id: id})

  if (!file) {
    return res.status(400).json({error: 'No such File'})
  }

  res.status(200).json(file)
}

// update a file
const updateFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such File'})
  }

  const file = await File.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!file) {
    return res.status(400).json({error: 'No such File'})
  }

  res.status(200).json(file)
}

module.exports = {
  getFiles,
  getFile,
  getOnlyOwnerTask,
  createFile,
  deleteFile,
  updateFile
}
