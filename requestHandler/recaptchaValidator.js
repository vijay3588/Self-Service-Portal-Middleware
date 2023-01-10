const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");
const config = require('../appConfig/appConfig');
const {logger} =  require("../logger/logger");

const recaptchaValidator = async (req, res) => {
    if (req?.body) {
        const token = req.body.key;
        const recaptchaObj = {
            'response': token,
            'secret': config.recaptchaKey,
        };
        try {
             return await requestProcessor.request(
              recaptchaObj,
              res,
              constants.SERVICE_REQUEST.RECAPTCHA_VALIDATOR,
              req.headers,
              jsonHelper.reqUserInfo(req.headers),
              true,
              true,
            );
          } catch (error) {
            logger.logCreator().error(error);
            logger
              .logCreator()
              .trace("Error at recaptcha token");
            res.json(null);
          }
    }
};

module.exports = { recaptchaValidator };
