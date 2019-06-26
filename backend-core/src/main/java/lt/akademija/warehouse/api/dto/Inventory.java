package lt.akademija.warehouse.api.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Inventory {
    private int id;
    private String name;
    private int weight;
    private int sectorNumber;
    private LocalDate placeDate;
    private int customerId;
}