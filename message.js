class Message {
   constructor(name, commands) {
      this.name = name; //string
      if (!name) {
         throw Error("Name required.");
      }
      this.commands = commands; //array of command objects
   }

}



module.exports = Message;