package lt.akademija.warehouse.api;


import lt.akademija.warehouse.api.dto.Reservation;
import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/{id}")
    public Reservation getReservation(@PathVariable int id) {
        return reservationService.getReservation(id);
    }
}
