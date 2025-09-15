import jwt from "jsonwebtoken";
// Generate a token whenever a user signs in or signs up
// this token will be used to authenticate the user in future requests
// token will be sent in the header of the request
// we will use JWT (JSON Web Token) for this purpose
// JWT is a standard for securely transmitting information between parties as a JSON object
// this information can be verified and trusted because it is digitally signed
// JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA
// In our case, we will use a secret key to sign the token
// The token will contain the user id and will be valid for a certain period of time
// We will use the jsonwebtoken library to generate and verify the token
// Install it using npm install jsonwebtoken

const genToken = async (id) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d', // token will be valid for 30 days
        });
        return token;
    } catch (error) {
        throw new Error("Error generating token:", error);
    }
}
export default genToken;

// In the above code, we are using the sign method of the jwt library to generate a token
// The sign method takes three parameters:
// 1. The payload (data to be included in the token) - in our case, we are including the user id
// 2. The secret key - this should be a long and random string to ensure the security of the token
// 3. Options - we are setting the expiresIn option to specify the validity period of the token
// The sign method returns the generated token which can be sent to the client
// The client will store this token (usually in local storage or cookies) and send it in the header of future requests to authenticate the user
// On the server side, we will verify the token using the verify method of the jwt library
// This will ensure that the token is valid and has not been tampered with
// If the token is valid, we can extract the user id from the payload and use it to fetch the user details from the database
// This way, we can authenticate the user and authorize access to protected routes and resources
// Make sure to keep the secret key safe and do not expose it in the client-side code
// It should only be used on the server side
// You can store it in an environment variable for better security
// In a real-world application, you would also want to implement token revocation and refresh mechanisms to enhance security further
// This is a basic implementation of JWT authentication and can be extended based on the requirements of your application   
// Call this function in the sign-in and sign-up controllers after successful authentication