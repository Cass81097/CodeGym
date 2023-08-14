const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(3001, () => {
    console.log("Server running on port 3001");
});

const students = [
    {
        id: 1,
        name: 'Chu Xuân Hiếu',
        description: 'Đi gội đầu lâu, hay ngủ gật',
        action: 'Xem xét',
        score: 6
    }, {
        id: 2,
        name: 'Nguyễn Thị Quỳnh',
        description: 'Nói chuyện nhiều',
        action: 'Xem xét',
        score: 7
    }, {
        id: 3,
        name: 'Trần Văn Hiệp',
        description: 'Thiếu tập trung, chưa tích cực khi học',
        action: 'Xem xét',
        score: 4
    }, {
        id: 4,
        name: 'Bui Huu Nghia',
        description: 'Thiếu tập trung, chưa tích cực khi học',
        action: 'Xem xét',
        score: 5
    }, {
        id: 5,
        name: 'Trương Hoàng Anh',
        description: 'Đi ra ngoài lâu',
        action: 'Xem xét',
        score: 5
    },
];

app.get("/students", (req, res, next) => {
    res.json(students);
});
app.get("/students/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findStudentIndex(id);
    if (index !== -1) {
        res.json(students[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.post("/students", (req, res, next) => {
    const student = {
        id: (new Date()).getTime(),
        name: req.body.name,
        description: req.body.description,
        action: req.body.action,
        score: req.body.score,
    };
    students.push(student);
    res.json(student);
});
app.delete("/students/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findStudentIndex(id);
    if (index !== -1) {
        students.splice(index, 1);
        res.json({message: 'Student deleted', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.put("/students/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findStudentIndex(id);
    if (index !== -1) {
        const student = students[index];
        student.name = req.body.name;
        student.action = req.body.action;
        student.description = req.body.description;
        score: req.body.score,
        res.json(student);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findStudentIndex(id) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            return i;
        }
    }
    return -1;
}
