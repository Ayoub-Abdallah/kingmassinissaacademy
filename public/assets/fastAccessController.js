const tab1 = document.querySelector(".add_student-cover")
const tab2 = document.querySelector(".add-promo-student-cover")
const tab3 = document.querySelector(".add-promo-teacher-cover")
const tab4 = document.querySelector(".add-income-cover")
const tab5 = document.querySelector(".add-expenses-cover")

const tabList = [tab1, tab2, tab3, tab4, tab5]

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
}