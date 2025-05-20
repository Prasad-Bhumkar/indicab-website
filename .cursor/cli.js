#!/usr/bin/env node

/**
 * Task Management System CLI
 * Command-line interface for interacting with the task management system
 */

const TaskManager = require('./index');
const readline = require('readline');
const util = require('util');

// Initialize task manager
TaskManager.initialize({ autoArchive: false });

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promise-based version of rl.question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Format task for display
function formatTask(task) {
  return `Task #${task.id}: ${task.title} [${task.status}] (${task.priority})
  Description: ${task.description}
  Created: ${new Date(task.created_at).toLocaleString()}
  Updated: ${new Date(task.updated_at).toLocaleString()}
  Dependencies: ${task.dependencies.length ? task.dependencies.join(', ') : 'None'}
  Tags: ${task.tags.length ? task.tags.join(', ') : 'None'}`;
}

// Display all active tasks
function displayTasks() {
  const tasks = TaskManager.listTasks();
  
  if (tasks.length === 0) {
    console.log('No active tasks found');
    return;
  }
  
  console.log(`\n=== Active Tasks (${tasks.length}) ===`);
  tasks.forEach(task => {
    console.log(`\n${formatTask(task)}`);
  });
}

// Display archived tasks
function displayArchivedTasks() {
  const archivedTasks = TaskManager.listArchivedTasks();
  
  if (archivedTasks.length === 0) {
    console.log('No archived tasks found');
    return;
  }
  
  console.log(`\n=== Archived Tasks (${archivedTasks.length}) ===`);
  archivedTasks.forEach(task => {
    console.log(`\n${formatTask(task)}`);
  });
}

// Create a new task
async function createTask() {
  console.log('\n=== Create New Task ===');
  
  const title = await question('Title: ');
  const description = await question('Description: ');
  const priority = await question('Priority (low/medium/high/critical) [medium]: ') || 'medium';
  const tagsInput = await question('Tags (comma-separated): ');
  
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];
  
  try {
    const task = TaskManager.createTask({
      title,
      description,
      priority,
      tags
    });
    
    console.log(`\nTask created successfully: #${task.id}`);
  } catch (err) {
    console.error(`Error creating task: ${err.message}`);
  }
}

// Update a task
async function updateTask() {
  console.log('\n=== Update Task ===');
  
  const taskId = parseInt(await question('Enter task ID: '), 10);
  
  try {
    const taskInfo = TaskManager.getTask(taskId);
    
    if (!taskInfo) {
      console.log(`Task with ID ${taskId} not found`);
      return;
    }
    
    console.log(`\nCurrent task details:\n${formatTask(taskInfo.task)}`);
    
    const statusOptions = ['pending', 'in-progress', 'completed', 'blocked'];
    const newStatus = await question(`New status (${statusOptions.join('/')}): `);
    
    if (newStatus && !statusOptions.includes(newStatus)) {
      console.log(`Invalid status: ${newStatus}`);
      return;
    }
    
    const priorityOptions = ['low', 'medium', 'high', 'critical'];
    const newPriority = await question(`New priority (${priorityOptions.join('/')}): `);
    
    if (newPriority && !priorityOptions.includes(newPriority)) {
      console.log(`Invalid priority: ${newPriority}`);
      return;
    }
    
    const updateData = {};
    if (newStatus) updateData.status = newStatus;
    if (newPriority) updateData.priority = newPriority;
    
    const updatedTask = TaskManager.updateTask(taskId, updateData);
    console.log(`\nTask #${taskId} updated successfully`);
  } catch (err) {
    console.error(`Error updating task: ${err.message}`);
  }
}

// Manage task dependencies
async function manageDependencies() {
  console.log('\n=== Manage Dependencies ===');
  
  const taskId = parseInt(await question('Enter task ID: '), 10);
  
  try {
    const taskInfo = TaskManager.getTask(taskId);
    
    if (!taskInfo) {
      console.log(`Task with ID ${taskId} not found`);
      return;
    }
    
    console.log(`\nCurrent task details:\n${formatTask(taskInfo.task)}`);
    
    const action = await question('Add or remove dependency? (add/remove): ');
    
    if (action !== 'add' && action !== 'remove') {
      console.log('Invalid action. Please choose "add" or "remove"');
      return;
    }
    
    const dependencyId = parseInt(await question('Enter dependency task ID: '), 10);
    
    if (action === 'add') {
      TaskManager.addDependency(taskId, dependencyId);
      console.log(`Dependency #${dependencyId} added to task #${taskId}`);
    } else {
      TaskManager.removeDependency(taskId, dependencyId);
      console.log(`Dependency #${dependencyId} removed from task #${taskId}`);
    }
  } catch (err) {
    console.error(`Error managing dependencies: ${err.message}`);
  }
}

// Archive a task
async function archiveTask() {
  console.log('\n=== Archive Task ===');
  
  const taskId = parseInt(await question('Enter task ID to archive: '), 10);
  
  try {
    TaskManager.archiveTask(taskId);
    console.log(`Task #${taskId} archived successfully`);
  } catch (err) {
    console.error(`Error archiving task: ${err.message}`);
  }
}

// Archive all completed tasks
function archiveCompletedTasks() {
  console.log('\n=== Archive All Completed Tasks ===');
  
  try {
    const archivedTasks = TaskManager.archiveCompletedTasks();
    console.log(`${archivedTasks.length} tasks archived successfully`);
  } catch (err) {
    console.error(`Error archiving tasks: ${err.message}`);
  }
}

// Restore a task from archives
async function restoreTask() {
  console.log('\n=== Restore Archived Task ===');
  
  const taskId = parseInt(await question('Enter archived task ID to restore: '), 10);
  
  try {
    TaskManager.restoreTask(taskId);
    console.log(`Task #${taskId} restored successfully`);
  } catch (err) {
    console.error(`Error restoring task: ${err.message}`);
  }
}

// Main CLI menu
async function showMenu() {
  console.clear();
  console.log('=== Task Management System ===');
  console.log('1. List all tasks');
  console.log('2. List archived tasks');
  console.log('3. Create new task');
  console.log('4. Update task');
  console.log('5. Manage dependencies');
  console.log('6. Archive a task');
  console.log('7. Archive all completed tasks');
  console.log('8. Restore task from archives');
  console.log('9. Run test workflow');
  console.log('0. Exit');
  
  const choice = await question('\nEnter your choice: ');
  
  switch (choice) {
    case '1':
      displayTasks();
      break;
    case '2':
      displayArchivedTasks();
      break;
    case '3':
      await createTask();
      break;
    case '4':
      await updateTask();
      break;
    case '5':
      await manageDependencies();
      break;
    case '6':
      await archiveTask();
      break;
    case '7':
      archiveCompletedTasks();
      break;
    case '8':
      await restoreTask();
      break;
    case '9':
      console.log('\nRunning test workflow...');
      const { runTestWorkflow } = require('./sample-tasks');
      await runTestWorkflow();
      break;
    case '0':
      console.log('Exiting Task Management System. Goodbye!');
      rl.close();
      process.exit(0);
      break;
    default:
      console.log('Invalid choice. Please try again.');
  }
  
  await question('\nPress Enter to continue...');
  await showMenu();
}

// Start the CLI
async function startCLI() {
  try {
    await showMenu();
  } catch (err) {
    console.error('An error occurred:', err);
    rl.close();
  }
}

// Run the CLI
startCLI(); 