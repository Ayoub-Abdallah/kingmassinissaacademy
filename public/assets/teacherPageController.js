const tab1 = document.querySelector(".add_student-cover")
const tab2 = document.querySelector(".edit_student-cover")
const tab3 = document.querySelector(".delete_student")
const tab4 = document.querySelector(".teacher-payment-cover")
const tab5 = document.querySelector(".add-teacher-payment-cover")
let tab6 = document.querySelector(".success-message-cover")


let selected = []
let selectedTeacher = ""

const tabList = [tab1, tab2, tab3, tab4, tab5, tab6]

function activateTab(num){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
    tabList[num].classList.add("active")
}

function deactivateTabs(num){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
    window.location.href = '/teachers';
}

  
const firstname = document.querySelector('.edit_student-cover .fname')
const lastname = document.querySelector('.edit_student-cover .lname')
const birthdate = document.querySelector('.edit_student-cover .bd')
const birthplace = document.querySelector('.edit_student-cover .bp')
// const parents = document.querySelector('.edit_student-cover .parents')
const sex = document.querySelector('.edit_student-cover .sex')
const phone = document.querySelector('.edit_student-cover .phone')
const email = document.querySelector('.edit_student-cover .email')
const mobile1 = document.querySelector('.edit_student-cover .mobile1')
const mobile2 = document.querySelector('.edit_student-cover .mobile2')
const group = document.querySelector('.edit_student-cover .group')
// const schoolYear = document.querySelector('.edit_student-cover .schoolYear')
const dateInsc = document.querySelector('.edit_student-cover .dateInsc')
const physicalproblem = document.querySelector('.edit_student-cover .phP')
const mentalproblems = document.querySelector('.edit_student-cover .mnP')
const notes = document.querySelector('.edit_student-cover .notes')



function editTeacher(){
  if(selected.length != 1) return
  activateTab(1)
  try{
    fetch('/teachers/'+ selected[0]).then(response => response.json()).then(data => {
      console.log(data)
      firstname.value = data[0].firstname
      lastname.value = data[0].lastname
      birthdate.value = data[0].birthdate
      birthplace.value = data[0].birthplace
      // parents.value = data[0].parents
      sex.value = data[0].sex
      phone.value = data[0].phone
      email.value = data[0].email
      mobile1.value = data[0].mobile1
      mobile2.value = data[0].mobile2
      group.value = data[0].group
      // schoolYear.value = data[0].schoolyear
      dateInsc.value = data[0].inscriptiondate
      physicalproblem.value = data[0].physicalproblem
      mentalproblems.value = data[0].mentalproblems
      notes.value = data[0].notes
    })
  }catch(err){
    console.error(err)
  }
 
}
//============================================================================
tab1.addEventListener('submit', handleAddStudent);

function handleAddStudent(event){
  console.log("handled... ")
  event.preventDefault();

    const formData = new FormData(event.target);
    
    const studentData = {};
    formData.forEach((value, key) => {
      studentData[key] = value;
    });

    // console.log(studentData);!

    fetch('/teachers/add-teacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
      if(data.status){
        document.querySelector(".success-message-cover h2").innerHTML = data.message
        document.querySelector(".success-message-cover").classList.add("active")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
function check(event, id) {
  event.target.classList.toggle("active")
  const index = selected.indexOf(id);
  if (index !== -1) {
      // ID exists, remove it
      selected.splice(index, 1);
  } else {
      // ID does not exist, add it
      selected.push(id);
  }
  console.log("teachers selected: ");
  console.log( selected);
}

function handleEdit(){
  console.log("handled: ")
  // event.preventDefault();

    // const formData = new FormData(event.target);
    
    const objectData = {
      firstname : firstname.value, 
      lastname : lastname.value, 
      birthdate : birthdate.value, 
      birthplace : birthplace.value, 
      // parents : parents.value, 
      sex : sex.value, 
      phone : phone.value, 
      email : email.value, 
      mobile1 : mobile1.value, 
      mobile2 : mobile2.value, 
      group : group.value, 
      // schoolyear : schoolYear.value, 
      inscriptiondate : dateInsc.value, 
      physicalproblem : physicalproblem.value, 
      mentalproblems : mentalproblems.value, 
      notes : notes.value
    };
    
console.log(objectData)
  
    fetch("/teachers/edit/" + selected[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectData)
    })
    .then(response => response.json())
    .then(data => {
      if(data.status){
        document.querySelector(".success-message-cover h2").innerHTML = data.message
        document.querySelector(".success-message-cover").classList.add("active")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



function deleteTeacher(){
  if(selected.length != 1) return
  activateTab(2)
}
async function handleDelete(){
  fetch( "/teachers/" + selected[0], { method: 'delete' } )
  .then(response => response.json())
  .then(data => {
    if(data.status){
      document.querySelector(".success-message-cover h2").innerHTML = data.message
      document.querySelector(".success-message-cover").classList.add("active")
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
}

function teacherPayment(id){
  console.log("teacher's payment " + id)
  selectedTeacher = id
  activateTab(3)
 
  try{
    fetch('/teachers/' + selectedTeacher).then(response => response.json()).then(data => {
      // console.log(data[0])
      document.querySelector(".teacher-payment-container .fname").innerHTML = "Prénom: " + data[0].firstname
      document.querySelector(".teacher-payment-container .lname").innerHTML = "Nom: " + data[0].lastname
      // document.querySelector(".teacher-payment-container .salarydate").innerHTML = data[0].salarydate
      let table = document.querySelector(".teacher-payment-container .salariesDetails")
      table.innerHTML = `
      <tr>
        <th>Date</th>
        <th>Versement</th>
      </tr>`

      data[0].salary.forEach(sal => {
        table.innerHTML += 
        `<tr>
            <td>${sal.date}</td>
            <td>${sal.amount}</td>
          </tr>`
      });
    })
  }catch(err){
    console.error(err)
}}

function addTeacherPayment(){
  console.log("teacher's payment ")
  activateTab(4)
}
function handlePayment(event){
  event.preventDefault()
  const formData = new FormData(event.target);
    
  const studentData = {_id: selectedTeacher};
  formData.forEach((value, key) => {
    studentData[key] = value;
  });

  // console.log(studentData);!

  fetch('/teachers/add-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
  })
  .then(response => response.json())
  .then(data => {
    if(data.status){
      document.querySelector(".success-message-cover h2").innerHTML = data.message
      document.querySelector(".success-message-cover").classList.add("active")
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

//  Excel Exporting  ///////////////////////////////////////////////////////////////////////


async function exportExcel() {
  const table = document.getElementById('dataTable');
  if (selected.length === 0) {
    console.log("No rows selected to export.");
    return;
  }
  try {
    const response = await fetch('/teachers/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selected)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected_rows.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}


//////////////////////////////////////////////////////////////////////////////////

const searchBtn = document.querySelector('.searchbutton')
const categorySlct = document.getElementById('category-select')
const searchInpt = document.getElementById('search-input')
const studentsTable = document.querySelector('.studentsTable tbody')

searchBtn.addEventListener( "click" , event =>{
  // event.preventDefault()
  const category = categorySlct.value
  const input = searchInpt.value.trim()
  if (input == "") return
  const queryParams = new URLSearchParams({
    category: category,
    query: input
  });

  const url = `/search/teachers?${queryParams.toString()}`;

  // fetch(url)
  fetch(url).then(async response => response.json()).then(async students => {
    console.log(students)
    console.log(studentsTable)
    studentsTable.innerHTML = `
                      <tr>
                        <th></th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Sexe</th>
                        <th>Téléphone</th>
                        <th>Groupes</th>
                        <th>Paiement</th>
                    </tr>
    `
    students.forEach(student => {
      // let groups = ''
      // student.groups.map(element => {
      //   groups += element.name + " , "
      // });
      studentsTable.innerHTML += `
          <tr>
                            <td>
                                <button class="checkBox" onclick="check(event, '${ student._id }') ">
                                    &#10003;
                                    <!-- &check; -->
                                </button>
                            </td>

                            <td>
                                ${ student.firstname }
                            </td>
                            <td>
                                ${ student.lastname }
                            </td>
                            <td>
                                ${ student.sex  }
                            </td>
                           
                            <td>
                                ${ student.phone  }
                            </td>
                            <td>
                             ${ student.groups }
                            
                               
                            </td>
                           
                            <td onclick="teacherPayment('${ student._id }')" class="paimentTD">
                               pay
                            </td>
                      
                        </tr>
      `
    });


  })

}) 
