const { logger } = require("../../logger/logger");

class generateMidToken {
    static getMidToken = (user) => {
        try {
            let midToken = user;
            let currentDate = new Date();
            let timeStamp = currentDate.getUTCFullYear() + '/' + (currentDate.getUTCMonth() + 1) + '/' + currentDate.getUTCDate();
            
            timeStamp += "_" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" 
              + currentDate.getSeconds() + ":" + currentDate.getMilliseconds();
              midToken = Buffer.from(midToken + "_" + timeStamp).toString('base64');
            //Buffer.from(midToken, 'base64').toString('ascii')
            return midToken;
        } catch (error) {
            logger.logHelper().error(error);
            logger.logCreator().trace("Error at getMidToken function in generateMidToken file");
        }
    }
}

module.exports = { generateMidToken }