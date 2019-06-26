package lt.akademija.warehouse.api.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=true)
@Data
public class Book extends BaseBook {

    private Integer id;
    private boolean deletedStatus;
}
