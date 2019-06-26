package lt.akademija.warehouse.service;

import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.repository.TestMapper;
import lt.akademija.warehouse.util.ServiceUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ReservationServiceTests {

    @Autowired
    private BookService bookService;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private TestMapper testMapper;

    @Autowired
    private LocationService locationService;

    @Test
    public void addReservation_checkIfBookIsReservedCorrectly() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();
        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook = ServiceUtils.createBook();
        newBook.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook);

        Customer newCustomer = ServiceUtils.createCustomer();
        testMapper.addCustomer(newCustomer);

        BaseReservation baseReservation = new BaseReservation();
        baseReservation.setBookId(newBook.getId());
        baseReservation.setCustomerId(newCustomer.getId());
        int newReservationId = reservationService.addReservation(baseReservation.getBookId(), baseReservation.getCustomerId());
        Reservation reservation = reservationService.getReservation(newReservationId);

        assertEquals(newBook.getId().intValue(), reservation.getBookId());
        assertEquals(newCustomer.getId(), reservation.getCustomerId());
    }

    @Test
    public void endReservation_checkIfReservationIsEndedCorrectly() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();
        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook = ServiceUtils.createBook();
        newBook.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook);

        Customer newCustomer = ServiceUtils.createCustomer();
        testMapper.addCustomer(newCustomer);

        BaseReservation baseReservation = new BaseReservation();
        baseReservation.setBookId(newBook.getId());
        baseReservation.setCustomerId(newCustomer.getId());

        int newReservationId = reservationService.addReservation(baseReservation.getBookId(), baseReservation.getCustomerId());
        reservationService.endReservation(baseReservation.getBookId());
        Reservation endedReservation = reservationService.getReservation(newReservationId);

        assertNotNull(endedReservation.getReturnedDate());
    }

}