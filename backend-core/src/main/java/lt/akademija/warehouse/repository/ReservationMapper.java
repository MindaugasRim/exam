package lt.akademija.warehouse.repository;


import lt.akademija.warehouse.api.dto.BaseReservation;
import lt.akademija.warehouse.api.dto.Reservation;
import lt.akademija.warehouse.api.dto.*;
import org.apache.ibatis.annotations.*;

@Mapper
public interface ReservationMapper {

    @Select("SELECT * FROM reservation WHERE id = #{id}")
    Reservation getReservation(int id);

    @Insert("INSERT INTO reservation (id, customer_id, book_id, taken_date) VALUES (#{baseReservation.id}, #{baseReservation.customerId}, #{baseReservation.bookId}, CURRENT_DATE)")
    @SelectKey(statement = "SELECT nextval('reservation_seq_id')", keyProperty = "baseReservation.id", before = true, resultType = int.class)
    void addReservation(@Param("baseReservation") BaseReservation baseReservation);

    @Update("UPDATE reservation SET returned_date = CURRENT_DATE WHERE book_id = #{bookId} AND returned_date IS NULL")
    void endReservation(@Param("bookId") int bookId);
}
