let teaching = local_teaching


let subjectSelection = document.getElementById("subjectSelection");
for (let t of teaching) {
  let child = document.createElement("OPTION");
  child.innerHTML = t.subjectId;
  subjectSelection.appendChild(child);
}

window.addEventListener("load", function(){
  let event = new Event("change");
  subjectSelection.dispatchEvent(event);
})

subjectSelection.addEventListener("change", function(){
  let selectedSubject = subjectSelection.options[subjectSelection.selectedIndex].text;
  let groupSelection = document.getElementById("groupSelection");
  groupSelection.innerHTML = "";
  let label = document.createElement("LABEL")
  label.setAttribute("for","groupSelection");
  label.setAttribute("class","col-sm-2 col-form-label");
  label.innerText = "group selection :";
  groupSelection.appendChild(label);
  //groupSelection.appendChild(document.createElement("BR"));
  let found = false;
  let i = 0;
  let groups = [];
  while (!found){
    if(teaching[i].subjectId == selectedSubject) {
      found = true;
      groups = teaching[i].groupsIds;
    }
    i++;
  }
  i = 0;
  for (let group of groups) {
    groupSelection.appendChild(createCheckBox(i, group));
    i++;
  }
});

function createCheckBox(number,value) {
  let div = document.createElement("DIV");
  div.className = "form-check form-check-inline";

  let input = document.createElement("INPUT");
  input.setAttribute("class","form-check-input");
  input.setAttribute("id","inlineCheckbox" + number);
  input.setAttribute("name","groupSelection");
  input.setAttribute("type","checkbox");
  input.setAttribute("value",value);

  let label = document.createElement("LABEL")
  label.setAttribute("class","form-check-label");
  label.setAttribute("for","inlineCheckbox" + number);
  label.innerText = value;

  div.appendChild(input);
  div.appendChild(label);
  return div;
}
/*<div class="form-check form-check-inline">
  <input class="form-check-input" id="inlineCheckbox1" name="groupSelection" type="checkbox" value="1CS1" />
  <label class="form-check-label" for="inlineCheckbox1">1CS1</label>
</div>*/
