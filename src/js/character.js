export default class Character{
  constructor(level, str, dex, con, int, wis, cha, jobClass, armor, equippedWeapon){
    this.stats = {
      STR: parseInt(str),
      DEX: parseInt(dex),
      CON: parseInt(con),
      INT: parseInt(int),
      WIS: parseInt(wis),
      CHA: parseInt(cha)
      };
    this.jobClass = jobClass;
    this.armor = armor;
    this.equippedWeapon = equippedWeapon;
    this.spells = [];
    this.level = level;
    }
    getModifier(statKey){
      return Math.floor((this.stats[statKey]-10)/2);
    }
  }
 
