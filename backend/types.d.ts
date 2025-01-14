// custom.d.ts
import { Request } from 'express';

// Extending the Express Request interface to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: string; // Add `userId` as an optional property
        }
    }
}
