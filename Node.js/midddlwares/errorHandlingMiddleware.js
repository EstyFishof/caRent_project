export const errorHandling=(req,res,next,err)=>{
    let statusCode=res.statusCode||500;
    let message=err.message||"Sorry, an error occurred on the server";
    res.status(statusCode).send(message);
}