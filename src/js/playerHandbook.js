export default class PlayerHandbook{
  constructor(){
    this.armorOptions = {};
    this.weaponOptions = {};
    this.jobClasses = {};
    this.spellBook = {};
  }

  
  static async getArmor(){
    try{
      const response = await fetch("https://www.dnd5eapi.co/api/equipment-categories/armor");
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
  static async getWeapon(){
    try{
      const response = await fetch("https://www.dnd5eapi.co/api/equipment-categories/weapon");
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
  static async getJobClass(){
    try{
      const response = await fetch("https://www.dnd5eapi.co/api/classes");
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
  static async getSpells(){
    try{
      const response = await fetch("https://www.dnd5eapi.co/api/spells");
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
  static async tellMeMore(urlSuffix){
    try{
      const response = await fetch("https://www.dnd5eapi.co" + urlSuffix);
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}