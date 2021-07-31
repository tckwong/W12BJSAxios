var parentParticipants = document.querySelectorAll('div h2');
var showMsg = document.querySelectorAll('div p');
for(let i=0; i<parentParticipants.length; i++) {
    var parent = parentParticipants[0];
    var parent2 = parentParticipants[1];
    var parent3 = parentParticipants[2];
}
var participantDrpdwnLst = [1,2,3,4];
var dropdownLst = document.getElementById('dropdownLst');
//checkFlag bool used to check if existing activity displayed on page
var checkFlag = false;
var checkFlag2 = false;
var checkFlag3 = false;

var minPrce = document.getElementById('min');
var maxPrce = document.getElementById('max');

addtoDropdownLst();
function addtoDropdownLst(){
    for(let i=0; i<participantDrpdwnLst.length; i++){
        let optionList = document.createElement('option');
        dropdownLst.appendChild(optionList);
        optionList.innerHTML = participantDrpdwnLst[i];
    }
}

function getRandomRequest(){
    axios.request({
        method : "GET",
        url : "http://www.boredapi.com/api/activity"
    }).then(getSuccess).catch(failure);
}

function getSuccess(response){
    if (checkFlag == true){
        checkActivity(parent);
        let findActivity = document.createElement('h4');
        parent.append(findActivity);
        findActivity.innerText = response.data.activity;
    }else{
        let findActivity = document.createElement('h4');
        parent.append(findActivity);
        findActivity.innerText = response.data.activity;
        checkFlag = true;
    }
}
//Check for existing activity generated
function checkActivity(myparent){
    let removeElemnt = myparent.firstElementChild;
    removeElemnt.remove();
}

function activityByParticipants(){
    axios.request({
        method : "GET",
        url : "http://www.boredapi.com/api/activity",
        params : {
            participants : dropdownLst.value
        }
    }).then(getPrtcpntActvty).catch(failure);
}

function getPrtcpntActvty(response){
    if (checkFlag2 == true){
        checkActivity(parent2);
        let findActivity = document.createElement('h4');
        parent2.append(findActivity);
        findActivity.innerText = response.data.activity;
    }else{
        let findActivity = document.createElement('h4');
        parent2.append(findActivity);
        findActivity.innerText = response.data.activity;
        checkFlag2 = true;
    }
}

function failure(error){
    console.log(error);
}

//Find activity by price range functions
function priceRangeRequest(){
    for(let i=0; i<showMsg.length; i++) {
        showMsg[i].classList.remove('showMsg');
    }
 
    axios.request({
    method : "GET",
    url : "http://www.boredapi.com/api/activity",
    params : {
        minprice : minPrce.value,
        maxprice : maxPrce.value
    }
    }).then(priceRange).catch(failure);
}

function priceRange(response){
    let minPrice = parseFloat(minPrce.value);
    let maxPrice = parseFloat(maxPrce.value);

    if (checkFlag3 == true) {
        checkActivity(parent3);
        if (minPrice < maxPrice) {
            if (minPrice >=0 && minPrice <= 1 && maxPrice >=0 && maxPrice <=1) {
                showMsg[2].classList.add('showMsg');
                let findActivity = document.createElement('h4');
                parent3.append(findActivity);
                findActivity.innerText = response.data.activity;
            }else{
                showMsg[0].classList.add('showMsg');
            }
        }else{
            showMsg[1].classList.add('showMsg');
        }
    }else{
        if (minPrice < maxPrice) {
            if (minPrice >=0 && minPrice <= 1 && maxPrice >=0 && maxPrice <=1) {
                showMsg[2].classList.add('showMsg');
                let findActivity = document.createElement('h4');
                parent3.append(findActivity);
                findActivity.innerText = response.data.activity;
                checkFlag3 = true;
            }else{
                showMsg[0].classList.add('showMsg');
            }
        }else{
            showMsg[1].classList.add('showMsg');
        }
    }
}

function clearFields(){
    minPrice.value = " ";
    maxPrice.value = " ";
}

var userSubmitBtn = document.querySelector('button');
userSubmitBtn.addEventListener('click', getRandomRequest);

var btn = document.querySelectorAll('button');
btn[1].addEventListener('click', activityByParticipants);
btn[2].addEventListener('click', priceRangeRequest);
