# Task Management Workflow

```mermaid
flowchart TD
    Start([Start]) --> CreateTask[Create New Task]
    CreateTask --> TaskCreated[Task Created with Status: 'pending']
    
    TaskCreated --> CheckDeps{Check Dependencies}
    CheckDeps -->|Dependencies Met| UpdateStatus[Update Status to 'in-progress']
    CheckDeps -->|Dependencies Not Met| TaskBlocked[Status: 'blocked']
    
    TaskBlocked -->|Dependencies Resolved| CheckDeps
    
    UpdateStatus --> TaskInProgress[Task In Progress]
    TaskInProgress --> TaskCompleted[Mark Task as 'completed']
    
    TaskCompleted --> ArchivedCheck{Auto Archive?}
    ArchivedCheck -->|Yes| ArchiveTask[Archive Task]
    ArchivedCheck -->|No| End([End])
    
    ArchiveTask --> TaskArchived[Task Moved to Archives]
    TaskArchived --> End
    
    subgraph "Task Creation Process"
        CreateTask
        TaskCreated
    end
    
    subgraph "Task Management Process"
        CheckDeps
        UpdateStatus
        TaskInProgress
        TaskBlocked
        TaskCompleted
    end
    
    subgraph "Task Archiving Process"
        ArchivedCheck
        ArchiveTask
        TaskArchived
    end
```

## Process Details

### Task Creation Process
1. A new task is created with required properties (title, description)
2. System assigns auto-incrementing ID and default values
3. Task is saved with initial status 'pending'

### Task Management Process
1. When user wants to start working on a task, dependencies are checked
2. If all dependencies are completed, status can be changed to 'in-progress'
3. If dependencies are not met, task remains 'pending' or can be marked 'blocked'
4. When work is complete, task is marked as 'completed'

### Task Archiving Process
1. Completed tasks can be archived manually or automatically (daily check)
2. Archived tasks are moved from active tasks to archives folder
3. Archived tasks retain all their properties plus archiving metadata
4. Archived tasks can be restored if needed

## State Transitions

```mermaid
stateDiagram-v2
    [*] --> pending
    pending --> in-progress: Dependencies Met
    pending --> blocked: Dependencies Not Met
    blocked --> pending: Dependencies Changed
    blocked --> in-progress: Dependencies Met
    in-progress --> completed: Work Finished
    in-progress --> blocked: New Dependency Added
    completed --> pending: Reopened
    completed --> archived: Archiving Process
    archived --> pending: Restore Process
```

## Task Dependency Management

```mermaid
flowchart LR
    Task1[Task #1] --> Task3[Task #3]
    Task2[Task #2] --> Task3
    Task3 --> Task5[Task #5]
    Task4[Task #4] --> Task5
    
    classDef completed fill:#9f9,stroke:#484,stroke-width:2px;
    classDef inProgress fill:#9cf,stroke:#348,stroke-width:2px;
    classDef pending fill:#ffa,stroke:#860,stroke-width:2px;
    classDef blocked fill:#fcc,stroke:#800,stroke-width:2px;
    
    class Task1 completed;
    class Task2 completed;
    class Task3 inProgress;
    class Task4 pending;
    class Task5 blocked;
```

## Integration with Indicab Website

The task management system integrates with the indicab-Website project through the following connections:

1. **User Authentication**: Task assignments use the same user system as the main application
2. **Admin Dashboard**: Task management features appear in the admin dashboard for project management
3. **Booking System**: Tasks can be linked to specific bookings for issue tracking
4. **Driver Management**: Tasks can be assigned to drivers through the existing driver management system 