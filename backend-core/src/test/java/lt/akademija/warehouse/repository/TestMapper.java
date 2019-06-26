package lt.akademija.warehouse.repository;

import lt.akademija.warehouse.api.dto.Book;
import lt.akademija.warehouse.api.dto.Customer;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TestMapper {

    @Insert("INSERT INTO customer (id, first_name, last_name, role) VALUES (#{customer.id}, #{customer.firstName}, #{customer.lastName}, #{customer.role})")
    @SelectKey(statement = "SELECT nextval('customer_seq_id')", keyProperty = "customer.id", before = true, resultType = int.class)
    void addCustomer(@Param("customer") Customer customer);

    @Select("SELECT * FROM book")
    List<Book> getAllBooks();

    @Delete("DELETE FROM book")
    void deleteAllBooks();

    @Delete("DELETE FROM reservation")
    void deleteAllReservations();

    @Delete("DELETE FROM location")
    void deleteAllLocations();
}