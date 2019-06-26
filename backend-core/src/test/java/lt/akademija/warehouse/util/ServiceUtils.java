package lt.akademija.warehouse.util;

import lombok.experimental.UtilityClass;
import lt.akademija.warehouse.api.dto.Book;
import lt.akademija.warehouse.api.dto.Customer;
import lt.akademija.warehouse.api.dto.Location;

import java.time.LocalDate;
import java.time.Month;

@UtilityClass
public final class ServiceUtils {

    public static Customer createCustomer() {

        Customer newCustomer = new Customer();
        newCustomer.setFirstName("Name1");
        newCustomer.setLastName("Last Name1");
        newCustomer.setRole("Admin");

        return newCustomer;
    }

    public static Location createLocation() {

        Location newLocation = new Location();
        newLocation.setLocName("Europa 1");

        return newLocation;
    }

    public static Book createBook(int i) {
        Book newBook = new Book();
        newBook.setName("Book Name" + i);
        newBook.setAuthor("Author" + i);
        newBook.setPublicationDate(LocalDate.of(2017, Month.MAY, 15));

        return newBook;
    }

    public static Book createBook() {
        return createBook(1);
    }

}