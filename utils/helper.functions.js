const generateOtp = () => {
    return Math.floor(785210 + Math.random() * 90)
}

module.exports = { generateOtp }