let item = document.querySelector('.item');
let addBtn = document.querySelector('.btn_add');
let list = document.querySelector('.list');
let itemData = [];
let tabStatus = "all";
updateOffNum();

addBtn.addEventListener('click',function(e){
  e.preventDefault();
  if(item.value.trim()==""){
    alert("Please type fist");
    return;
  }
  let obj = {};
  obj.content = item.value.trim();
  obj.status = false;
  itemData.push(obj);
  buildList();
  updateOffNum();
  item.value = '';
});
list.addEventListener('click',function(e){

  if(e.target.getAttribute('class')==="delete"){
    e.preventDefault();
    let key = e.target.getAttribute('data-key');
    itemData.splice(key,1);
    buildList();
    updateOffNum();
  }

  if(e.target.nodeName==="INPUT"){
    let key = e.target.getAttribute('data-key');
    let status = e.target.checked;
    console.log(key,status);
    itemData[key].status = status;
    if(tabStatus!="all"){
      buildList();
    }
    updateOffNum();
  }
});

let tab = document.querySelector('.tab');
tab.addEventListener('click',function(e){
  if(e.target.nodeName=="LI"){
      let lis = document.querySelectorAll('.tab li');
      lis.forEach(function(obj){
        obj.setAttribute('class','');
      });
      e.target.setAttribute('class','active');
      tabStatus = e.target.getAttribute('data-type');
      buildList();
   }
});

document.querySelector('.list_footer a').addEventListener('click',function(e){
  e.preventDefault();
  itemData = itemData.filter(function(item){
    return item.status===false;
  });
  buildList();
});

function buildList()
{
  let html = '';
  itemData.forEach(function(item,key){
    if((tabStatus=="off" && item.status===true) || ((tabStatus=="on" && item.status===false)))    {
      return;
    }
    let checked = item.status===true ? 'checked' : '';
    html += `<li>
          <label class="checkbox" for="">
            <input type="checkbox" data-key="${key}" value="${key}" ${checked}/>
            <span>${item.content}</span>
          </label>
          <a href="#" class="delete" data-key="${key}"></a>
        </li>`;
  });
  list.innerHTML = html;
}
function updateOffNum()
{
  let total = 0;
  itemData.forEach(function(item){
    if(item.status===false){
       total += 1;
    }
  });
  document.querySelector('.list_footer p').innerHTML = `${total} to be completed`;
}

