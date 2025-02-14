/**
* HTTPNotFound Exception
* 
* @author Prateek Takthar 
* @returns {Object}
* @name HTTPNotFound
* @alias HTTPNotFound Exception
* @param {Null}
* 
*/
const HTTPError = require('./HTTPError')

class HTTPNotFound extends HTTPError {
    constructor(message='Not Found') {
        super(404, message)
    }
}

module.exports = HTTPNotFound
