const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../authMiddleware');

// Protect all routes
//uncoment this || after done - it's necessary for security reasons
//              V
// router.use(authMiddleware.ensureAuthenticated);

router.get('/', studentController.renderAllStudents);

router.post('/add-student', studentController.createStudent);
router.post('/export', studentController.exportXls);
router.get('/:id', studentController.getStudentById);
router.post('/edit/:id', studentController.editStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/groups/:id', studentController.getStudentWithGroupsById);
router.post('/presence', studentController.addPresence);
router.post('/payment', studentController.addPayment);


// router.get('/', studentController.getAllStudents); 
// router.get('/:id', studentController.getStudentById);
// router.put('/:id', studentController.updateStudent);
// router.delete('/:id', studentController.deleteStudent);

module.exports = router;
