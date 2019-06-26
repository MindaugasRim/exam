package lt.akademija.warehouse.repository;

import lt.akademija.warehouse.api.dto.Book;
import lt.akademija.warehouse.api.dto.BookWithReservationInfo;
import lt.akademija.warehouse.api.dto.BaseBook;
import lt.akademija.warehouse.api.dto.BookWithLocName;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BookMapper {

    @Select("SELECT book.id, book.name, book.author, book.publication_date, book.deleted_status, location.loc_name, reservation.taken_date, customer.first_name, customer.last_name\n" +
            "FROM book\n" +
            "LEFT JOIN reservation\n" +
            "ON book.id = reservation.book_id AND reservation.returned_date IS NULL\n" +
            "LEFT JOIN customer\n" +
            "ON reservation.customer_id = customer.id\n" +
            "LEFT JOIN location\n" +
            "ON book.location_id = location.id\n" +
            "WHERE book.deleted_status IS FALSE AND location.loc_deleted_status IS FALSE")
    List<BookWithReservationInfo> getAllBooksWithReservationInfo();

    @Select("SELECT book.id, book.name, book.author, book.publication_date, book.deleted_status, location.loc_name\n" +
            "FROM book\n" +
            "LEFT JOIN location\n" +
            "ON book.location_id = location.id")
    List<BookWithLocName> getAllBooksWIthLocName();

    @Select("SELECT * FROM book WHERE id = #{id}")
    Book getBook(int id);

    @Select("SELECT book.*, reservation.taken_date, location.loc_name\n" +
            "FROM book\n" +
            "LEFT JOIN reservation\n" +
            "ON book.id = reservation.book_id\n" +
            "LEFT JOIN location\n" +
            "ON book.location_id = location.id\n" +
            "WHERE returned_date IS NULL AND book.id\n" +
            "IN (SELECT reservation.book_id\n" +
            "FROM reservation\n" +
            "WHERE returned_date IS NULL)")
    List<BookWithReservationInfo> getAllReservedBooksWithTakenDate();

    @Select("SELECT book.id FROM book WHERE book.id = #{id} AND book.deleted_status IS FALSE EXCEPT SELECT reservation.book_id FROM reservation where reservation.returned_date is NULL")
    Book getNotReservedAndDeletedBooks(int id);

    @Insert("INSERT INTO book (id, name, location_id, author, publication_date) VALUES (#{book.id}, #{book.name}, #{book.locationId}, #{book.author}, #{book.publicationDate})")
    @SelectKey(statement = "SELECT nextval('book_seq_id')", keyProperty = "book.id", before = true, resultType = int.class)
    void addBook(@Param("book") Book book);

    @Update("UPDATE book SET name = #{baseBook.name}, location_id = #{baseBook.locationId}, author = #{baseBook.author}, publication_date = #{baseBook.publicationDate} WHERE id = #{id}")
    void updateBook(
            @Param("id") int id,
            @Param("baseBook") BaseBook baseBook);

    @Update("UPDATE book SET deleted_status = #{deletedStatus} WHERE id = #{id}")
    void changeBookDeletedStatus(
            @Param("id") int id,
            @Param("deletedStatus") boolean deletedStatus);
}
