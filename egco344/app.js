const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock student data
const students = [
    { id: 'ENG001', name: 'John Smith', department: 'Computer Engineering', gpa: 3.8 },
    { id: 'ENG002', name: 'Sarah Johnson', department: 'Computer Engineering', gpa: 3.9 },
    { id: 'ENG003', name: 'Mike Chen', department: 'Civil Engineering', gpa: 3.5 },
    { id: 'ENG004', name: 'Emma Davis', department: 'Electrical Engineering', gpa: 3.7 },
    { id: 'ENG005', name: 'Alex Wilson', department: 'Mechanical Engineering', gpa: 3.6 },
    { id: 'ENG006', name: 'Lisa Park', department: 'Civil Engineering', gpa: 3.8 },
    { id: 'ENG007', name: 'Tom Brown', department: 'Electrical Engineering', gpa: 3.4 },
    { id: 'ENG008', name: 'Nina Garcia', department: 'Computer Engineering', gpa: 3.9 }
];

// API: Get all students GPA grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = {};
    
    students.forEach(student => {
        if (!groupedByDept[student.department]) {
            groupedByDept[student.department] = [];
        }
        groupedByDept[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
    });

    res.json({
        success: true,
        data: groupedByDept
    });
});

// API: Get individual student GPA by ID
app.get('/api/students/:studentId/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.studentId);
    
    if (!student) {
        return res.status(404).json({
            success: false,
            message: `Student with ID ${req.params.studentId} not found`
        });
    }

    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});