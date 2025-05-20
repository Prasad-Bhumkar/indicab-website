/**
 * Sample Task Generator
 * Creates and manages sample tasks to test the task management system
 */

const TaskManager = require('./index');

// Initialize the task manager
TaskManager.initialize({ autoArchive: false });

// Sample tasks data
const sampleTasks = [
  {
    title: 'Backend API Development',
    description: 'Implement the REST API for the booking system with proper validation and error handling.',
    priority: 'high',
    tags: ['backend', 'api', 'development']
  },
  {
    title: 'User Authentication Flow',
    description: 'Create the authentication flow including login, registration, and password reset functionality.',
    priority: 'high',
    tags: ['auth', 'security', 'frontend']
  },
  {
    title: 'Admin Dashboard UI',
    description: 'Design and implement the UI components for the admin dashboard.',
    priority: 'medium',
    tags: ['frontend', 'ui', 'admin']
  },
  {
    title: 'Payment Gateway Integration',
    description: 'Integrate Stripe payment gateway for processing booking payments.',
    priority: 'high',
    tags: ['payment', 'integration', 'api']
  },
  {
    title: 'Driver Management Module',
    description: 'Implement the driver management module including assignment and tracking features.',
    priority: 'medium',
    tags: ['drivers', 'management', 'backend']
  },
  {
    title: 'Booking Confirmation Emails',
    description: 'Set up email templates and service for sending booking confirmation emails to users.',
    priority: 'low',
    tags: ['email', 'notification']
  },
  {
    title: 'Performance Optimization',
    description: 'Review and optimize the application for better performance, focusing on load times and API response times.',
    priority: 'medium',
    tags: ['optimization', 'performance']
  },
  {
    title: 'Mobile Responsiveness',
    description: 'Ensure all components and pages are fully responsive on mobile devices.',
    priority: 'medium',
    tags: ['frontend', 'responsive', 'ui']
  }
];

// Create all sample tasks
async function createSampleTasks() {
  console.log('Creating sample tasks...');
  
  const createdTasks = [];
  
  for (const taskData of sampleTasks) {
    try {
      const task = TaskManager.createTask(taskData);
      createdTasks.push(task);
      console.log(`Created task: ${task.title} (ID: ${task.id})`);
    } catch (err) {
      console.error(`Error creating task '${taskData.title}':`, err.message);
    }
  }
  
  return createdTasks;
}

// Add dependencies between tasks
function setTaskDependencies(tasks) {
  console.log('\nSetting up task dependencies...');
  
  // Let's create some realistic dependencies
  
  // Auth depends on API
  TaskManager.addDependency(tasks[1].id, tasks[0].id);
  console.log(`Added dependency: ${tasks[1].title} depends on ${tasks[0].title}`);
  
  // Payment gateway depends on Auth
  TaskManager.addDependency(tasks[3].id, tasks[1].id);
  console.log(`Added dependency: ${tasks[3].title} depends on ${tasks[1].title}`);
  
  // Driver management depends on Admin Dashboard
  TaskManager.addDependency(tasks[4].id, tasks[2].id);
  console.log(`Added dependency: ${tasks[4].title} depends on ${tasks[2].title}`);
  
  // Confirmation emails depend on Payment gateway
  TaskManager.addDependency(tasks[5].id, tasks[3].id);
  console.log(`Added dependency: ${tasks[5].title} depends on ${tasks[3].title}`);
  
  // Performance optimization depends on most features being implemented
  TaskManager.addDependency(tasks[6].id, tasks[0].id);
  TaskManager.addDependency(tasks[6].id, tasks[1].id);
  TaskManager.addDependency(tasks[6].id, tasks[3].id);
  console.log(`Added multiple dependencies to: ${tasks[6].title}`);
}

// Update task statuses
function updateTaskStatuses(tasks) {
  console.log('\nUpdating task statuses...');
  
  // Mark API task as completed
  TaskManager.updateTask(tasks[0].id, { status: 'completed' });
  console.log(`Updated ${tasks[0].title} to 'completed'`);
  
  // Try to mark Auth as completed (should fail due to dependencies)
  try {
    TaskManager.updateTask(tasks[1].id, { status: 'completed' });
  } catch (err) {
    console.log(`Expected error: ${err.message}`);
  }
  
  // Mark Admin Dashboard as in-progress
  TaskManager.updateTask(tasks[2].id, { status: 'in-progress' });
  console.log(`Updated ${tasks[2].title} to 'in-progress'`);
  
  // Mark Mobile Responsiveness as in-progress
  TaskManager.updateTask(tasks[7].id, { status: 'in-progress' });
  console.log(`Updated ${tasks[7].title} to 'in-progress'`);
}

// Test archiving
function testArchiving(tasks) {
  console.log('\nTesting archiving functionality...');
  
  // Archive completed tasks
  const archivedTasks = TaskManager.archiveCompletedTasks();
  
  if (archivedTasks.length > 0) {
    console.log(`Successfully archived ${archivedTasks.length} completed tasks`);
  } else {
    console.log('No completed tasks to archive');
  }
  
  // List active tasks after archiving
  const remainingTasks = TaskManager.listTasks();
  console.log(`${remainingTasks.length} active tasks remaining`);
  
  // List archived tasks
  const allArchivedTasks = TaskManager.listArchivedTasks();
  console.log(`${allArchivedTasks.length} tasks in archive`);
}

// Full test workflow
async function runTestWorkflow() {
  console.log('=== Starting Task Management System Test ===');
  
  // Create sample tasks
  const tasks = await createSampleTasks();
  
  // List all tasks
  console.log('\nListing all created tasks:');
  const allTasks = TaskManager.listTasks();
  console.log(`Created ${allTasks.length} tasks successfully`);
  
  // Set up dependencies
  setTaskDependencies(tasks);
  
  // Update statuses
  updateTaskStatuses(tasks);
  
  // Test archiving
  testArchiving(tasks);
  
  console.log('\n=== Task Management System Test Completed ===');
  
  // Print summary
  console.log('\nSystem Status Summary:');
  console.log(`- Active tasks: ${TaskManager.listTasks().length}`);
  console.log(`- Archived tasks: ${TaskManager.listArchivedTasks().length}`);
  console.log(`- Pending tasks: ${TaskManager.listTasks({ status: 'pending' }).length}`);
  console.log(`- In-progress tasks: ${TaskManager.listTasks({ status: 'in-progress' }).length}`);
  console.log(`- Completed tasks: ${TaskManager.listTasks({ status: 'completed' }).length}`);
}

// Run the test workflow
runTestWorkflow().catch(err => {
  console.error('Error in test workflow:', err);
}); 