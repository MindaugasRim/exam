package lt.akademija.warehouse.api.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BaseBook {
    private String name;
    private int locationId;
    private String author;
    private LocalDate publicationDate;
}
