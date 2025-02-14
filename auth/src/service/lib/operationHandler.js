/**
 * Otp Helper
 */

class OperationHelper {
    constructor() { }

    generateOTP = () => {
        // Generate a random 6-digit number
        const otp = Math.floor(100000 + Math.random() * 900000)
        return otp.toString()
    }

    calculateAccessTokenExpiryTime(expiryString) {
        const duration = parseInt(expiryString)
        const unit = expiryString[expiryString.length - 1].toLowerCase()

        let multiplier
        switch (unit) {
            case 'd':
                multiplier = 24 * 60 * 60 * 1000; // Days to milliseconds
                break;
            case 'w':
                multiplier = 7 * 24 * 60 * 60 * 1000; // Weeks to milliseconds
                break;
            case 'h':
                multiplier = 60 * 60 * 1000; // Hours to milliseconds
                break;
            default:
                multiplier = 60 * 60 * 1000;
        }

        return new Date(new Date().getTime() + duration * multiplier)
    }
}

module.exports = OperationHelper