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

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookServiceTests {

    @Autowired
    private BookService bookService;

    @Autowired
    private TestMapper testMapper;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private LocationService locationService;

    @Test
    public void addBook_checkIfBookIsAddedCorrectly() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();
        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook = ServiceUtils.createBook();
        newBook.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook);
        Book book = bookService.getBook(newBook.getId());

        assertEquals(newBook.getName(), book.getName());
        assertEquals(newBook.getAuthor(), book.getAuthor());
        assertEquals(newBook.getLocationId(), book.getLocationId());
        assertEquals(newBook.getPublicationDate(), book.getPublicationDate());
        assertFalse(book.isDeletedStatus());
    }

    @Test
    public void addBook_checkIfBookIdIsAddedCorrectly() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();
        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book bookWithManualId = ServiceUtils.createBook();
        int manualId = 999;
        bookWithManualId.setId(manualId);
        bookWithManualId.setLocationId(newLocation.getId());

        bookService.addBook(newLocation.getId(), bookWithManualId);
        Book book = bookService.getBook(bookWithManualId.getId());

        assertNotEquals(manualId, book.getId().intValue());
    }

    @Test
    public void updateBook_checkIfBookIsUpdatedCorrectly() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();
        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook = ServiceUtils.createBook();
        newBook.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(),newBook);

        BaseBook updatedBook = new BaseBook();
        updatedBook.setName("Updated Book Name");
        updatedBook.setAuthor("Updated Author");
        updatedBook.setLocationId(newLocation.getId());
        updatedBook.setPublicationDate(LocalDate.of(2019, Month.MAY, 22));

        bookService.updateBook(newBook.getId(), updatedBook);
        Book book = bookService.getBook(newBook.getId());

        assertEquals(updatedBook.getName(), book.getName());
        assertEquals(updatedBook.getAuthor(), book.getAuthor());
        assertEquals(updatedBook.getLocationId(), book.getLocationId());
        assertEquals(updatedBook.getPublicationDate(), book.getPublicationDate());
    }

    @Test
    public void getAllBooksWithReservationInfo_checkIfBookListDoNotHaveDuplicates() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();

        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook1 = ServiceUtils.createBook(1);
        newBook1.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook1);
        Book newBook2 = ServiceUtils.createBook(2);
        newBook2.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook2);
        Book newBook3 = ServiceUtils.createBook(3);
        newBook3.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook3);
        Book newBook4 = ServiceUtils.createBook(4);
        newBook4.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook4);
        Book newBook5 = ServiceUtils.createBook(5);
        newBook5.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook5);

        Customer newCustomer = ServiceUtils.createCustomer();
        testMapper.addCustomer(newCustomer);

        BaseReservation baseReservation = new BaseReservation();
        baseReservation.setBookId(newBook3.getId());
        baseReservation.setCustomerId(newCustomer.getId());
        reservationService.addReservation(baseReservation.getBookId(), baseReservation.getCustomerId());

        BaseReservation baseReservation2 = new BaseReservation();
        baseReservation2.setBookId(newBook5.getId());
        baseReservation2.setCustomerId(newCustomer.getId());
        reservationService.addReservation(baseReservation2.getBookId(), baseReservation2.getCustomerId());

        assertEquals(testMapper.getAllBooks().size(), bookService.getAllBooksWithReservationInfo().size());
    }

    @Test
    public void getAllBooksWithReservationInfo_checkIfTakenDateIsNotNullOfReservedBook() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();

        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook1 = ServiceUtils.createBook(1);
        newBook1.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook1);
        Book newBook2 = ServiceUtils.createBook(2);
        newBook2.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook2);
        Book newBook3 = ServiceUtils.createBook(3);
        newBook3.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook3);
        Book newBook4 = ServiceUtils.createBook(4);
        newBook4.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook4);
        Book newBook5 = ServiceUtils.createBook(5);
        newBook5.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook5);

        Customer newCustomer = ServiceUtils.createCustomer();
        testMapper.addCustomer(newCustomer);

        BaseReservation baseReservation = new BaseReservation();
        baseReservation.setBookId(newBook3.getId());
        baseReservation.setCustomerId(newCustomer.getId());
        reservationService.addReservation(baseReservation.getBookId(), baseReservation.getCustomerId());

        BaseReservation baseReservation2 = new BaseReservation();
        baseReservation2.setBookId(newBook5.getId());
        baseReservation2.setCustomerId(newCustomer.getId());
        reservationService.addReservation(baseReservation2.getBookId(), baseReservation2.getCustomerId());

        List<BookWithReservationInfo> booksWithReservationInfo = bookService.getAllBooksWithReservationInfo();
        BookWithReservationInfo reservedBookWithInfo = booksWithReservationInfo
                .stream()
                .filter(c -> c.getName().equals(newBook3.getName()))
                .findAny()
                .orElse(null);

        assertNotNull(reservedBookWithInfo);
        assertNotNull(reservedBookWithInfo.getTakenDate());
    }

    @Test
    public void getAllBooksWithReservationInfo_checkIfTakenDateIsNullOfNotReservedBook() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();

        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook1 = ServiceUtils.createBook(1);
        newBook1.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook1);
        Book newBook2 = ServiceUtils.createBook(2);
        newBook2.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook2);
        Book newBook3 = ServiceUtils.createBook(3);
        newBook3.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook3);
        Book newBook4 = ServiceUtils.createBook(4);
        newBook4.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook4);
        Book newBook5 = ServiceUtils.createBook(5);
        newBook5.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook5);

        Customer newCustomer = ServiceUtils.createCustomer();
        testMapper.addCustomer(newCustomer);

        BaseReservation baseReservation = new BaseReservation();
        baseReservation.setBookId(newBook3.getId());
        baseReservation.setCustomerId(newCustomer.getId());
        reservationService.addReservation(baseReservation.getBookId(), baseReservation.getCustomerId());

        BaseReservation baseReservation2 = new BaseReservation();
        baseReservation2.setBookId(newBook5.getId());
        baseReservation2.setCustomerId(newCustomer.getId());
        reservationService.addReservation(baseReservation2.getBookId(), baseReservation2.getCustomerId());

        List<BookWithReservationInfo> booksWithReservationInfo = bookService.getAllBooksWithReservationInfo();
        BookWithReservationInfo notReservedBookWithInfo = booksWithReservationInfo
                .stream()
                .filter(c -> c.getName().equals(newBook2.getName()))
                .findAny()
                .orElse(null);

        assertNotNull(notReservedBookWithInfo);
        assertNull(notReservedBookWithInfo.getTakenDate());
    }

    @Test
    public void getAllBooksWithReservationInfo_checkIfTakenDateIsNullAfterBookIsReturned() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();

        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook1 = ServiceUtils.createBook(1);
        newBook1.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook1);
        Book newBook2 = ServiceUtils.createBook(2);
        newBook2.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook2);
        Book newBook3 = ServiceUtils.createBook(3);
        newBook3.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook3);
        Book newBook4 = ServiceUtils.createBook(4);
        newBook4.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook4);
        Book newBook5 = ServiceUtils.createBook(5);
        newBook5.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook5);

        Customer newCustomer = ServiceUtils.createCustomer();
        testMapper.addCustomer(newCustomer);

        BaseReservation baseReservation = new BaseReservation();
        baseReservation.setBookId(newBook3.getId());
        baseReservation.setCustomerId(newCustomer.getId());
        int newReservationId = reservationService.addReservation(baseReservation.getBookId(), baseReservation.getCustomerId());

        BaseReservation baseReservation2 = new BaseReservation();
        baseReservation2.setBookId(newBook5.getId());
        baseReservation2.setCustomerId(newCustomer.getId());
        reservationService.addReservation(baseReservation2.getBookId(), baseReservation2.getCustomerId());

        Reservation reservation = reservationService.getReservation(newReservationId);
        reservationService.endReservation(reservation.getBookId());

        List<BookWithReservationInfo> booksWithReservationInfo = bookService.getAllBooksWithReservationInfo();
        BookWithReservationInfo reservedBookWithInfo = booksWithReservationInfo
                .stream()
                .filter(c -> c.getName().equals(newBook3.getName()))
                .findAny()
                .orElse(null);

        assertNotNull(reservedBookWithInfo);
        assertNull(reservedBookWithInfo.getTakenDate());
    }

    @Test
    public void deleteBook_checkIfBookIsDeletedCorrectly_true() {
        testMapper.deleteAllReservations();
        testMapper.deleteAllBooks();
        testMapper.deleteAllLocations();

        Location newLocation = ServiceUtils.createLocation();
        locationService.addLocation(newLocation);

        Book newBook = ServiceUtils.createBook();
        newBook.setLocationId(newLocation.getId());
        bookService.addBook(newLocation.getId(), newBook);
        bookService.deleteBook(newBook.getId());
        Book book = bookService.getBook(newBook.getId());
        assertTrue(book.isDeletedStatus());
    }

}