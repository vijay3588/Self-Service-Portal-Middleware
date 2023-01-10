const config = require('../appConfig/appConfig');

class logger {

    static logHelper() {
        let log4js = require('log4js');
        log4js.configure('./logger/logConfig/logConfig.json')

        if (config.logType == "default"){
            return log4js.getLogger('default_helper');
        }else{
            return log4js.getLogger('helper')
        }

    };
    
    static logCreator() {
        let log4js = require('log4js');
        log4js.configure('./logger/logConfig/logConfig.json')

        if (config.logType == "default"){
            return log4js.getLogger('default_creator');
        }else{
            return log4js.getLogger('creator')
        }

    };

    static logIndex() {
        let log4js = require('log4js');
        log4js.configure('./logger/logConfig/logConfig.json')

        return log4js.getLogger('default_index');
    };
}

module.exports = { logger }