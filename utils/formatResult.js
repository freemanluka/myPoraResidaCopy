function formatResult(validationResult) {
    if (validationResult.error) {
        // Handle validation errors
        const errorMessages = validationResult.error.details.map(detail => detail.message);
        return {
            success: false,
            message: errorMessages.join(', '), // Combine error messages
        };
    } else {
        // Validation succeeded
        return {
            success: true,
            message: 'Validation passed successfully!',
        };
    }
}

module.exports = formatResult;
// Example usage:
// const validationData = {
//     email: 'user@example.com',
//     password: 'secret123',
// };

// const result = formatResult(schema.validate(validationData));
// console.log(result);
