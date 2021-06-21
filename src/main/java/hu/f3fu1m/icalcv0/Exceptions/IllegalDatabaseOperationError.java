package hu.f3fu1m.icalcv0.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.INTERNAL_SERVER_ERROR, reason="Illegal database operation")
public class IllegalDatabaseOperationError extends Exception {
    public IllegalDatabaseOperationError() {
    }

    public IllegalDatabaseOperationError(String message) {
        super(message);
    }

    public IllegalDatabaseOperationError(String message, Throwable cause) {
        super(message, cause);
    }

    public IllegalDatabaseOperationError(Throwable cause) {
        super(cause);
    }

    public IllegalDatabaseOperationError(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
