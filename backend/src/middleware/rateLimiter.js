import ratelimit from "../config/upstash,js";

const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({
                message: "Too many requests. Please try again later."
            });
        }

        //application run as expected
        next()
        
    } catch (error) {
        console.error("Rate Limiter Error:", error);
        next(error);
    }
}

export default rateLimiter; 