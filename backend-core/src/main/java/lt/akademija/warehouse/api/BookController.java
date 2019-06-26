package lt.akademija.warehouse.api;

import java.util.List;

import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.service.BookService;
import lt.akademija.warehouse.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/books")
public class BookController {

    private BookService bookService;
    private ReservationService reservationService;

    @Autowired
    public BookController(BookService bookService, ReservationService reservationService) {
        this.bookService = bookService;
        this.reservationService = reservationService;
    }

    @GetMapping("/reservation-info")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<BookWithReservationInfo> getAllBooksWithReservationInfo() {
        return bookService.getAllBooksWithReservationInfo();
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<BookWithLocName> getAllBooksWIthLocName() {
        return bookService.getAllBooksWIthLocName();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable int id) {
        return bookService.getBook(id);
    }

    @GetMapping("/reserved")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<BookWithReservationInfo> getAllReservedBooksWithTakenDate() {
        return bookService.getAllReservedBooksWithTakenDate();
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public void addBook(@RequestBody Book book) {
        bookService.addBook(book.getLocationId(), book);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public void updateBook(@RequestBody BaseBook baseBook, @PathVariable int id) {
        bookService.updateBook(id, baseBook);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable int id) {
        bookService.changeBookDeletedStatus(id, true);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}/recover")
    public void recoverBook(@PathVariable int id) {
        bookService.changeBookDeletedStatus(id, false);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{id}/reserve")
    public void addReservation(@PathVariable int id, @RequestBody BaseReservedBook baseReservedBook) {
        reservationService.addReservation(id, baseReservedBook.getCustomerId());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}/return")
    public void endReservation(@PathVariable int id) {
        reservationService.endReservation(id);
    }
}
