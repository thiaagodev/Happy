declare namespace Express {
    export interface Request {
       userId?: string
    }
}

declare namespace NodeJS {  
   export interface ProcessEnv {    
      APP_SECRET: string = happy_jwt_flux;    
   }
}