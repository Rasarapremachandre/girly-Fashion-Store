//create middleweare and a function to handle possible errors(index.js)
export const errorHandler=(statusCode,message)=>{
    const error=new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;
}
