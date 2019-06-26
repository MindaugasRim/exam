package lt.akademija.warehouse.service;

import lt.akademija.warehouse.api.dto.BaseReservation;
import lt.akademija.warehouse.api.dto.Reservation;
import lt.akademija.warehouse.service.exception.ValidationException;
import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.repository.ReservationMapper;
import lt.akademija.warehouse.repository.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    private final ReservationMapper reservationMapper;
    private final BookMapper bookMapper;

    @Autowired
    public ReservationService(ReservationMapper reservationMapper, BookMapper bookMapper) {
        this.reservationMapper = reservationMapper;
        this.bookMapper = bookMapper;
    }

    public Reservation getReservation(int id) {
        return reservationMapper.getReservation(id);
    }

    public int addReservation(int bookId, int customerId) {
        if (bookMapper.getNotReservedAndDeletedBooks(bookId) != null) {

            BaseReservation baseReservation = new BaseReservation();
            baseReservation.setCustomerId(customerId);
            baseReservation.setBookId(bookId);

            reservationMapper.addReservation(baseReservation);
            return baseReservation.getId();
        } else {
            throw new ValidationException("This book does not exist, or book is already reserved");
        }
    }

    public void endReservation(int bookId) {
        reservationMapper.endReservation(bookId);
    }
}
