import jwt from 'jsonwebtoken';

// interjects the coming api call and works on it and lets go of it for the destination api to work on
const fetchUser = (req, res, next) => {
    const JWT_SECRET_KEY = 'secretKey';
    const authToken = req.header('Auth-Token');
    if(!authToken) {
        return res.status(401).json({error: 'Please authenticate using a token'});
    }
    try {
        // verifys the auth token and decrypts the auth token to readable data and returns the payload
        const authTokenPayload = jwt.verify(authToken, JWT_SECRET_KEY); 
        /** 
         ** payload has user object with key as id and its value
         ** this payload was created by us in the userLogin route
         ** adds info to the interjected api request and forwards it for the next api(/userData) to work on
         */
        req.userId = authTokenPayload.user.id;
        next();
    }
    catch (error) {
        return res.status(401).json({error: 'Please authenticate using a valid token'});
    }
};

export default fetchUser;
