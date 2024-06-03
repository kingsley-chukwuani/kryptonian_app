module.exports = {
    dbUri: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    elasticEmailApiKey: process.env.ELASTIC_EMAIL_API_KEY,
    otpExpiryTime: 300000, // 5 minutes
    elasticEmailUsername: 'alexkingsley2@gmail.com',
    senderEmail: 'alexkingsley2@gmail.com'

};

