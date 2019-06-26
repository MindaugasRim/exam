package lt.akademija.warehouse.api.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Customer {
    private int id;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private int phoneNumber;
    private boolean clientTypeStatus;
}