const Teacher = require('../models/teacher');
const XLSX = require('xlsx');
const fs = require('fs');
// Example controller functions
exports.renderAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    console.log(teachers)
    res.render('teachers', { teachers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTeacherById = async (req, res) => {
  try {
    const _id = req.params.id
    const teachers = await Teacher.find({_id});
    console.log(teachers)
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createTeacher = async (req, res) => {
  try {
    let teacherData = req.body
    const teacher = new Teacher(teacherData);
    await teacher.save();
    // console.log('Teacher created successfully:', teacher);
    res.json({status: true, message: "L'enseignant enregistrée avec succès"})

  } catch (error) {
    console.error('Error creating teacher:', error);
  }
};
exports.editTeacher = async (req, res) => {
  try {
    let studentData = req.body
    let _id = req.params.id
    
    const updatedTeacher = await Teacher.findByIdAndUpdate(_id, req.body, {new: true})
    console.log("updated teacher ")
    console.log(updatedTeacher )
    // res.json({ state: true, msg: "alright" })
    res.json({status: true, message: "L'enseignant modifié avec succès"})

    // console.log('Student created successfully:', tudent);
  } catch (error) {
    console.error('Error updateing teacher:', error);
  }
};
exports.addPaymentTeacher = async (req, res) => {

  try {
    let teacherData = req.body
    
    const teacher = await Teacher.findById(teacherData._id)
    teacher.salary.push({date : req.body.date , amount : req.body.amount })
    teacher.save()

    // res.json({ state: true, msg: "alright" })
    res.status(200).json({status: true, message: "Paiement de l'enseignant enregistré avec succès"})

    // console.log('Student created successfully:', tudent);
  } catch (error) {
    console.error('Error updateing teacher:', error);
  }

};

exports.deleteTeacher = async (req, res) => {
  try {
    let _id = req.params.id
    const deletedUser = await Teacher.findByIdAndDelete(_id);
    console.log('Deleted User:', deletedUser);
    res.status(200).json({status: true, message: "Enseignant supprimé avec succès"})

  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


exports.exportXls = async (req, res) => {
  try {
    const rows = await Teacher.find({ _id: { $in: req.body } }).lean(); // Use lean() to get plain JavaScript objects

        if (rows.length === 0) {
            console.log("no rows server")
            return res.status(404).send('No rows found for selected IDs.');
        }
        console.log("rows server")

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, 'Selected Rows');

        const filePath = './public/selected_rows.xlsx';
        XLSX.writeFile(wb, filePath);

        res.download(filePath, 'selected_rows.xlsx', (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error exporting data.');
            }
            fs.unlinkSync(filePath); // Delete the temporary file after download
        });


  } catch (error) {
    console.error('Error creating Teacher:', error);
  }
};
