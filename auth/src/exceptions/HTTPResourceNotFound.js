/**
* HTTPResourceNotFound
* 
* @author Prateek Takthar
* @returns {Object}
* @name HTTPResourceNotFound
* @alias HTTPResourceNotFound Exception
* @param {Null}
* 
*/
const HTTPError = require('./HTTPError')

class HTTPResourceNotFound extends HTTPError {
    constructor(message = 'Resource is No longer available') {
        super(410, message)
    }
}

module.exports = HTTPResourceNotFound
