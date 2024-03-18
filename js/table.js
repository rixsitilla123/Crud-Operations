let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")
let elLogoutBtn = document.querySelector(".navbar__left-bottom-btn")
let tBody = document.querySelector(".tbody")
let elAddBtn = document.querySelector(".student__list-add")
let elAvatarImg = document.querySelector(".navbar__card-img")
let elAvatarInputImg = document.querySelector(".avatar-input-img")
let elSearchInput = document.querySelector(".right__top-input")
let elSortItem = document.querySelector(".student__list-sort")
let studentList = JSON.parse(window.localStorage.getItem("studentList")) || [];  
elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal")
    }
})
elAvatarInputImg.addEventListener("change", function(evt){
    elAvatarImg.src = URL.createObjectURL(evt.target.files[0])
})
elLogoutBtn.addEventListener("click", function(evt){
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <p class="logout-m-span">do you want logout this page</p>
    <div class="logout-btn-wrap">
    <button onclick="logoutNBtn()" class="logout__btn-not logout-all-c-btn">Not</button>
    <button onclick="logoutWBtn()" class="logout__btn-want logout-all-c-btn">Want</button>
    </div>
    `
})
function logoutNBtn(){
    elModalWrapper.classList.remove("open-modal")
}
function logoutWBtn(){
    window.location = "./login.html"
}
renderStudent(studentList, tBody)
window.localStorage.setItem("studentList", JSON.stringify(studentList))
function renderStudent(arr, list){
    list.innerHTML = "";
    arr.map(item => {
        let elTr = document.createElement("tr")
        elTr.innerHTML = `
        <td class="tbody-value rounded-l-[8px]">
            <img class="mx-auto" src=${item.img} alt="Render img" width="65" height="55"/>
        </td>
        <td class="tbody-value">${item.name}</td> 
        <td class="tbody-value">${item.email}</td>
        <td class="tbody-value">${item.phone}</td> 
        <td class="tbody-value">${item.enrollNumber}</td>
        <td class="tbody-value">${item.dataAdmission}</td>
        <div class="btn-wrap">
            <button class="w-[19px]" onclick="updateBtn(${item.id})"><img src="./images/update-img.svg" alt="btn" width="19" height="19"/></button>
            <button class="w-[19px]" onclick="deleteBtn(${item.id})"><img src="./images/delete-img.svg" alt="btn" width="18" height="18"/></button>
        </div>
        `
        list.appendChild(elTr)
    })
}
renderStudent(studentList, tBody)
elSearchInput.addEventListener("keyup", function(evt){
    let searchInputValue = evt.target.value.trim()
    const data = studentList.filter(item => item.name.toLowerCase().includes(elSearchInput.toLowerCase()) || item.email.toLowerCase().includes(elSearchInput.toLowerCase()) || item.phone.includes(elSearchInput) || item.enrollNumber.includes(elSearchInput) || item.dataAdmission.includes(elSearchInput))
    studentList(data, tBody)
})
elAddBtn.addEventListener("click", function(){
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <form class="add-form">
            <label class="img-wrapper">
                <div class="img-wrap">
                    <img class="img-add-p render-img" src="./images/user-choose-img.jpg" alt="avatar" width="100%" height="100%">
                </div>
                    <input class="visually-hidden get-img" type="file"/>
            </label>
            <div class="inputs-wrap">
                <label class="inputs-label">
                    <span class="input-spans">Name</span>
                    <input class="input-add-n add-input" type="text" autocomplete="off" required placeholder="Enter your name"/>
                </label>
                <label class="inputs-label">
                    <span class="input-spans">Email</span>
                    <input class="input-email-n add-input" type="email" autocomplete="off" required placeholder="Enter your email"/>
                </label>
                <label class="inputs-label">
                    <span class="input-spans">Phone</span>
                    <input class="input-add-n add-input" type="tel" autocomplete="off" required placeholder="Enter your phone"/>
                </label>
                <label class="inputs-label">
                    <span class="input-spans">Enroll Number</span>
                    <input class="input-add-n add-input" type="number" autocomplete="off" required placeholder="Enter your enroll number"/>
                </label>
                <label class="inputs-label">
                    <span class="input-spans">Data Admission</span>
                    <input class="input-add-n add-input" type="date" autocomplete="off" required placeholder="Enter your data admission"/>
                </label>
                <button class="input-btn">ADD</button>
            </div>
        </form>
    `
    let elForm = document.querySelector(".add-form")
    let elInputChange = document.querySelector(".get-img")
    let elRenderImg = document.querySelector(".render-img")
    elInputChange.addEventListener("change", function(evt){
        elRenderImg.src = URL.createObjectURL(evt.target.files[0])
    })
    elForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        let data = {
            id: studentList.length,
            img: URL.createObjectURL(evt.target[0].files[0]),
            name: evt.target[1].value,
            email: evt.target[2].value,
            phone: evt.target[3].value,
            enrollNumber: evt.target[4].value,
            dataAdmission: evt.target[5].value,
        }
        studentList.push(data)
        renderStudent(studentList, tBody)
        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("studentList", JSON.stringify(studentList))
    })
})
function updateBtn(id){
    let data = studentList.find(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <form class="add-form update-form">
            <label class="img-wrapper">
                <div class="img-wrap">
                    <img class="img-add-p render-img" src="${data.img}" alt="avatar" width="100%" height="100%">
                </div>
                    <input class="visually-hidden get-img" type="file"/>
            </label>
            <div class="inputs-wrap">
                <label class="inputs-label">
                    <span class="input-spans">Name</span>
                    <input class="input-add-n add-input" value="${data.name}" type="text" required placeholder="Enter your name"/>
                </label>
                <label class="inputs-label">
                    <span class="input-spans">Email</span>
                    <input class="input-email-n add-input" value="${data.email}" type="email" required placeholder="Enter your email"/>
                </label>
                <label class="inputs-label">
                    <span class="input-spans">Phone</span>
                    <input class="input-add-n add-input" value="${data.phone}" type="tel" required placeholder="Enter your phone"/>
                </label>
                <label class="inputs-label">
                    <span class="input-spans">Enroll Number</span>
                    <input class="input-add-n add-input" value="${data.enrollNumber}" type="number" required placeholder="Enter your enroll number"/>
                </label>
                <label class="inputs-label">
                    <span class="input-spans">Data Admission</span>
                    <input class="input-add-n add-input" value="${data.dataAdmission}" type="date" required placeholder="Enter your data admission"/>
                </label>
                <button class="input-submit-btn input-btn">Submit</button>
            </div>
        </form>
    `
    let elUpdateForm = document.querySelector(".add-form")
    let elUpdateImg = document.querySelector(".img-add-p")
    let elUpdateInputImg = document.querySelector(".get-img")
    elUpdateInputImg.addEventListener("change", function(evt){
        elUpdateImg.src = URL.createObjectURL(evt.target.files[0])
    })
    elUpdateForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        data.img = elUpdateImg.src
        data.name = evt.target[1].value
        data.email = evt.target[2].value
        data.phone = evt.target[3].value
        data.enrollNumber = evt.target[4].value
        data.dataAdmission = evt.target[5].value
    
        renderStudent(studentList, tBody)
        window.localStorage.setItem("studentList", JSON.stringify(studentList))
        elModalWrapper.classList.remove("open-modal")
    })
}
elSortItem.addEventListener("click", function(){
    studentList.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    renderStudent(studentList, tBody)
})
function deleteBtn(id){
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
      <p class="font-bold text-white text-center">do you want to delete</p>
      <div class="logout-btn-wrap">
        <button onclick="NotBtn()" class="modalNotBtn">Not</button>
        <button onclick="deleteBtn(${id})" class="modalDeleteBtn">Delete</button>
      </div>
    `
}
function NotBtn(){
    elModalWrapper.classList.remove("open-modal")
}
function deleteBtn(id){
    let result = studentList.findIndex(item => item.id == id)
    studentList.splice(result, 1)
    renderStudent(studentList, tBody)   
    window.localStorage.setItem("studentList", JSON.stringify(studentList))
    elModalWrapper.classList.remove("open-modal")
}
