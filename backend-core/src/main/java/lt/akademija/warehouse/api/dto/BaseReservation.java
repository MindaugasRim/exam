package lt.akademija.warehouse.api.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class BaseReservation extends BaseReservedBook {
    private int id;
    private int bookId;
}