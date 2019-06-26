package lt.akademija.warehouse.api.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BaseCustomer {
    private String firstName;
    private String lastName;
    private boolean clientTypeStatus;
    private int quantity;

}