class Rover {
   constructor(position, mode, generatorWatts) {
      
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(message) {  //returns object with message and results property
      let results = [];
      let obj = {};
      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            obj = {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               },
            };
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
            obj = {completed: true};
            this.mode = message.commands[i].value;
         } else if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               obj = {completed: false};
            } else {
               this.position = message.commands[i].value;
               obj = {completed: true};
         } 
         }
         results.push(obj);
      }
      return {
         message: message.name,
         results: results
      }
   }
}     

module.exports = Rover;