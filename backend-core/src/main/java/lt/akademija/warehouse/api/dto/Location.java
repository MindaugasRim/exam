package lt.akademija.warehouse.api.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=true)
@Data
public class Location extends BaseLocation {
    private int id;
    private boolean locDeletedStatus;
}
