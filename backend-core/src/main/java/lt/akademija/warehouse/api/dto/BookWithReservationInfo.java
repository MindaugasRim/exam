package lt.akademija.warehouse.api.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper=true)
@Data
public class BookWithReservationInfo extends Book {

    private LocalDate takenDate;
    private String firstName;
    private String lastName;
    private String locName;
}
