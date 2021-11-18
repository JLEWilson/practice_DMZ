import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jQuery';
import Character from './js/character.js';
import PlayerHandbook from './js/playerHandbook.js';

//Populate the selects using the api
const playerHandbook = new PlayerHandbook();
console.log(playerHandbook);
//Maybe we can do something with promise all


//Utility Functions
async function callForArmor(){
  const response = await PlayerHandbook.getArmor();
  const book = response;
  return book;
}
async function populateArmorDropdown(){
  let reference = callForArmor();
  console.log(reference);
  for(let i = 0; i<reference.armorOptions.equipment.length; i++){
    $("#populate-armor").append("<option value='" + PlayerHandbook.tellMeMore(reference.armorOptions.equipment[i].url).armor_class.base + "'>" + reference.armorOptions.equipment[i].name + "</option>");
  }
}
populateArmorDropdown();

// async function getApiInfo(){
  //   const jobClassResponse = await
  //   const armorResponse = 
  //   const weaponResponse = 
  // }


  // for(let i = 0; i<book.armorOptions.equipment.length; i++){
  //   $("#populate-armor").append("<option value='" + PlayerHandbook.tellMeMore(book.armorOptions.equipment[i].url).armor_class.base + "'>" + book.armorOptions.equipment[i].name + "</option>");
  // }