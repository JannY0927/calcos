package hu.f3fu1m.icalcv0.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.INTERNAL_SERVER_ERROR, reason="No instance is found in database")
public class NotFoundInDatabaseError extends Exception{
    public NotFoundInDatabaseError() {
    }

    public NotFoundInDatabaseError(String message) {
        super(message);
    }

    public NotFoundInDatabaseError(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundInDatabaseError(Throwable cause) {
        super(cause);
    }

    public NotFoundInDatabaseError(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
