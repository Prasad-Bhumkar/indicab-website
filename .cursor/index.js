/**
 * Task Management System
 * Main entry point that integrates all task management rules
 */

const path = require('path');
const fs = require('fs');

// Import rule modules
const taskCreation = require('./rules/task_creation.rule');
const taskManagement = require('./rules/task_management.rule');
const taskArchiving = require('./rules/task_archiving.rule');

// Ensure all required directories exist
const directories = ['rules', 'tasks', 'archives'];
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

/**
 * Task Management API
 */
const TaskManager = {
  // Task Creation
  createTask: taskCreation.createTask,
  
  // Task Management
  getTask: taskManagement.getTaskById,
  updateTask: taskManagement.updateTask,
  listTasks: taskManagement.listTasks,
  addDependency: taskManagement.addDependency,
  removeDependency: taskManagement.removeDependency,
  areDependenciesMet: taskManagement.areDependenciesMet,
  
  // Task Archiving
  archiveTask: taskArchiving.archiveTask,
  archiveCompletedTasks: taskArchiving.archiveCompletedTasks,
  restoreTask: taskArchiving.restoreTask,
  listArchivedTasks: taskArchiving.listArchivedTasks,
  setupAutomaticArchiving: taskArchiving.setupAutomaticArchiving,
  
  // Utilities
  getTaskSchema: () => taskCreation.taskSchema,
  
  // Initialize the system
  initialize: (options = {}) => {
    const { autoArchive = true, archiveInterval = 24 } = options;
    
    console.log('Initializing Task Management System...');
    
    // Set up automatic archiving if enabled
    if (autoArchive) {
      taskArchiving.setupAutomaticArchiving(archiveInterval);
    }
    
    console.log('Task Management System initialized successfully');
    return TaskManager;
  }
};

// Export the API
module.exports = TaskManager;

// Auto-initialize if this file is the main module
if (require.main === module) {
  TaskManager.initialize();
} 