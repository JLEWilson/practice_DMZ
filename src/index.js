import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jQuery';
import Character from './js/character.js';
import PlayerHandbook from './js/playerHandbook.js';

let characterArray = [];
//Utility Functions
async function callForJobClass(){
  const response = await PlayerHandbook.getJobClass();
  populateJobClassDropdown(response);
}
async function callForArmour(){
  const response = await PlayerHandbook.getArmour();
  populateArmourDropdown(response);
}
async function callForWeapon(){
  const response = await PlayerHandbook.getWeapon();
  populateWeaponDropdown(response);
}
async function callForSpells(){
  const response = await PlayerHandbook.getSpells()
  populateSpellDiv(response);
}
async function goDeeper(level, str, dex, con, int, wis, cha, ulr1, url2, url3){
  const response1 = await PlayerHandbook.tellMeMore(ulr1);
  const response2 = await PlayerHandbook.tellMeMore(url2);
  const response3 = await PlayerHandbook.tellMeMore(url3);
  const character = new Character(level, str, dex, con, int, wis, cha, response1, response2, response3);
  characterArray.push(character);
  console.log(characterArray);
}
function populateJobClassDropdown(reference){
  for(let i = 0; i<reference.results.length; i++){
    $("#populate-job-class").append("<option value='" + reference.results[i].url + "'>" + reference.results[i].name + "</option>");
  }
}
function populateArmourDropdown(reference){
  for(let i = 0; i<reference.equipment.length; i++){
    $("#populate-armour").append("<option value='" + reference.equipment[i].url + "'>" + reference.equipment[i].name + "</option>");
  }
}
function populateWeaponDropdown(reference){
  for(let i = 0; i<reference.equipment.length; i++){
    $("#populate-equipped-weapon").append("<option value='" + reference.equipment[i].url + "'>" + reference.equipment[i].name + "</option>");
  }
}
function populateSpellDiv(reference){
  for(let i = 0; i<reference.results.length; i++){
    $("#spellection").append("<label><input type='checkbox' value='" + reference.results[i].url + "'></input> " + reference.results[i].name + "</label><br>");
  }
}

callForJobClass();
callForArmour();
callForWeapon();
callForSpells();

async function magicProcess(magicArray){
  let promiseArray = magicArray.map(async (spell)=>{
    try{
    let focus = await fetch("https://www.dnd5eapi.co" + spell);
    if(!focus.ok){
      throw Error(focus.statusText);
    }
    return await focus.json();
  } catch(error) {
    return error.message;
  }
  });
  Promise.all(promiseArray).then((fullSpell)=> {console.log(fullSpell)});
}


$('#character').submit(function(event){
  event.preventDefault();
  const level = $('#level-input').val();
  const str = $('#str-input').val();
  const dex = $('#dex-input').val();
  const con = $('#con-input').val();
  const int = $('#int-input').val();
  const wis = $('#wis-input').val();
  const cha = $('#cha-input').val();
  const charClass = $("#populate-job-class").val();
  const charAr = $("#populate-armour").val();
  const charWep = $("#populate-equipped-weapon").val();
  const spells = $("input:checkbox:checked").map(function(){
    return $(this).val();
  }).get();
  magicProcess(spells);
  goDeeper(level, str, dex, con, int, wis, cha, charClass, charAr, charWep);
});