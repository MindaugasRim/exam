package lt.akademija.warehouse.api.dto;

import lombok.Data;

@Data
public class Customer {
    private int id;
    private String firstName;
    private String lastName;
    private String role;
}