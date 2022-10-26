const constants= require('../../common/constants.json');
const auth= require('../../utils/authentication.js');
const logger= require('../../common/winston.js');
const changeSchedule= async(req, res) => {
    try {
      const cred = {
        token: req.headers[constants.HEADERS.ACCESS_TOKEN],
        id: req.headers[constants.HEADERS.USER_ID],
        type: constants.HEADERS_TYPE.LOGGEDIN_USER
      }
      const authorization = await auth.authorize(res, cred);
      if(authorization) {
        const body= req.body;
        if(!body.type || !body.id || !body.reason ) {
          return res.status(constants.STATUS.SUCCESS_CODE).send({
            status: constants.STATUS.MISSING_FIELD,
            success: constants.STATUS.FAILURE,
            message: constants.messages.BOOKINGS_STATUS.PARAMS_MISSING
          });
        }
        const session_data= await bookingDao.findById(body.id);
        if(!session_data) {
          return res.status(constants.STATUS.SUCCESS_CODE).send({
            status: constants.STATUS.NOT_FOUND,
            success: constants.STATUS.FAILURE,
            message: constants.messages.BOOKINGS_STATUS.NOT_FOUND
          });
        }
        
        const where = {
          _id: body.id
        };     
        let update= {};
        if(body.type== 'Cancelled') {
          update= {
            'cancel.reason': body.reason,
            status: 'Cancelled',
            'cancel.date': new Date(),
            'cancel.issuedBy': cred.id
          }
        }
        if(body.type== 'Reported') {
          update= {
            'report.reason': body.reason,
            status: 'Reported',
            'report.date': new Date(),
            'report.issuedBy': cred.id
          }
        }
       
        const session_data_update= await bookingDao.updateOne(where, update);
        if(!session_data_update) {
          return res.status(constants.STATUS.SUCCESS_CODE).send({
            status: constants.STATUS.FAILURE_CODE,
            success: constants.STATUS.FAILURE,
            message: constants.messages.BOOKINGS_STATUS.FAILED
          });
        }
        return res.status(constants.STATUS.SUCCESS_CODE).send({
          status: constants.STATUS.SUCCESS_CODE,
          success: constants.STATUS.SUCCESS,
          message: constants.messages.BOOKINGS_STATUS.SUCCESS
        });
      }
    }catch(err) {
      logger.error(`Error caught [reportCancelBookingInfoModule] in catch bolck ${err}`);
      return res.status(constants.STATUS.CATCH_BLOCK_CODE).send({
        status: constants.STATUS.CATCH_BLOCK_CODE,
        success: constants.STATUS.FAILURE,
        error: `Error caught in [reportCancelBookingInfoModule] catch block ${err}`
      }); 
    }
  }
  module.exports= {reportCancelBookingInfo};