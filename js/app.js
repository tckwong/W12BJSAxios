var parent = document.querySelector('div h2');
var parentParticipants = document.querySelectorAll('div h2');
for(let i=0; i<parentParticipants.length; i++) {
    var parent2 = parentParticipants[1];
}
var participantDrpdwnLst = [1,2,3,4];
var dropdownLst = document.getElementById('dropdownLst');
var checkFlag = false;
var checkFlag2 = false;

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
    console.log(response);
    if (checkFlag == true){
        let removeElemnt = parent.firstElementChild;
        removeElemnt.remove();
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
        let removeElemnt = parent2.firstElementChild;
        removeElemnt.remove();
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

let userSubmitBtn = document.querySelector('button');
userSubmitBtn.addEventListener('click', getRandomRequest);

let userSubmitBtn2 = document.getElementById('btn2');
userSubmitBtn2.addEventListener('click', activityByParticipants);
