// Middleware for validation of user
module.exports = (req, res, next) => {
    // Check if password is typed
    req.checkBody("password", "Password is required").notEmpty();
     // Check if confirm password is typed
     req.checkBody("confirmPassword", "Confirm password is required").notEmpty();
    // Check if password length if legth is below 6 charcters
    req.checkBody("password", "Password must be at least 6 charcter long").isLength({min: 6});
    // Check if confirm password length if legth is below 6 charcters
    req.checkBody("confirmPassword", " Confirm password Password must be at least 6 charcter long").isLength({min: 6});
    // Check if Passowrd match to confirm password field
    req.checkBody("confirmPassword", "Password do not match").equals(req.body.password);

    let errors = req.validationErrors();
    // If there errors
    if(errors) {
        res.statusCode = 409;
        res.json(errors);
    } else {
        next();
    }
}