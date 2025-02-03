import jwt from 'jsonwebtoken';

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject('Token is invalid or expired');
      } else {
        resolve(decoded);
      }
    });
  });
};

export default verifyJWT;