const asyncHandler  = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(requestHandler, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}