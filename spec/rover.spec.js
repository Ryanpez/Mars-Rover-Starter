const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  
  it("constructor sets position and default values for mode and generatorWatts", () => {
    let constructorCheck = new Rover(12)
    expect(constructorCheck).toEqual(new Rover(12, "NORMAL", 110))
  });

  it("response returned by receiveMessage contains the name of the message", () => {
    let rover = new Rover(98382);
    let message = new Message("msgname", modeCommand = new Command('MODE_CHANGE', 'LOW_POWER'));
    expect(rover.receiveMessage(message).message).toBe("msgname");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    let rover = new Rover(98382);
    let commands = [modeCommand = new Command('MODE_CHANGE', 'LOW_POWER'), moveCommand = new Command('MOVE', 12000)];
    let message = new Message("msgname", commands);
    expect(rover.receiveMessage(message).results.length).toBe(commands.length);
  });

  it("responds correctly to the status check command", () => {
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message("msgname", commands);
    expect(rover.receiveMessage(message).results[0]).toEqual({
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 98382
      }
    });
  });

  it("responds correctly to the mode change command", () => {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('msgname', commands);
    rover.receiveMessage(message);
    expect(rover.mode).toBe('LOW_POWER');
    expect(rover.receiveMessage(message).results[0]).toEqual({completed: true});
    commands = [new Command('MODE_CHANGE', 'NORMAL')];
    message = new Message('msgname', commands);
    rover.receiveMessage(message);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.receiveMessage(message).results[0]).toEqual({completed: true});
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('msgname', commands);
    expect(rover.receiveMessage(message).results[0]).toEqual({completed: true});
    commands = [new Command('MOVE', 2560)];
    message = new Message('msgname', commands);
    expect(rover.receiveMessage(message).results[0]).toEqual({completed: false});
  });

  it("responds with the position for the move command", () => {
    let rover = new Rover(98382);
    let commands = [new Command('MOVE', 3000)];
    let message = new Message('msgname', commands);
    rover.receiveMessage(message);
    expect(rover.receiveMessage(message).results[0]).toEqual({completed: true});
    expect(rover.position).toBe(3000);
  });

});

