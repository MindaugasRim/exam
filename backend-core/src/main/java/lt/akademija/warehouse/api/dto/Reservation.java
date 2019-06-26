package lt.akademija.warehouse.api.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
public class Reservation extends BaseReservedBook {
    private int id;
    private LocalDate returnedDate;
    private LocalDate takenDate;
    private int bookId;
}