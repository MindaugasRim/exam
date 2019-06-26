package lt.akademija.warehouse.service;

import lt.akademija.warehouse.api.dto.BaseBook;
import lt.akademija.warehouse.api.dto.Book;
import lt.akademija.warehouse.api.dto.BookWithLocName;
import lt.akademija.warehouse.api.dto.BookWithReservationInfo;
import lt.akademija.warehouse.repository.CustomerMapper;
import lt.akademija.warehouse.service.exception.ValidationException;
import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.repository.BookMapper;
import lt.akademija.warehouse.repository.LocationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookMapper bookMapper;
    private final LocationMapper locationMapper;
    private final CustomerMapper customerMapper;

    @Autowired
    public BookService(BookMapper bookMapper, LocationMapper locationMapper, CustomerMapper customerMapper) {
        this.bookMapper = bookMapper;
        this.locationMapper = locationMapper;
        this.customerMapper = customerMapper;
    }

    public void addCustomer(Customer customer) {
            customerMapper.addCustomer(customer);
    }

    public List<BookWithReservationInfo> getAllBooksWithReservationInfo() {
        return bookMapper.getAllBooksWithReservationInfo();
    }

    public List<BookWithLocName> getAllBooksWIthLocName() {
        return bookMapper.getAllBooksWIthLocName();
    }

    public List<BookWithReservationInfo> getAllReservedBooksWithTakenDate() {
        return bookMapper.getAllReservedBooksWithTakenDate();
    }

    public Book getBook(int id) {
        return bookMapper.getBook(id);
    }

    public void addBook(int locationId, Book book) {
        if (locationMapper.getNotDeletedLocation(locationId) != null) {
            bookMapper.addBook(book);
        } else {
            throw new ValidationException("This Location does not exist");
        }
    }

    public void updateBook(int id, BaseBook baseBook) {
        bookMapper.updateBook(id, baseBook);
    }

    public void changeBookDeletedStatus(int id, boolean deletedStatus) {
        bookMapper.changeBookDeletedStatus(id, deletedStatus);
    }
}
