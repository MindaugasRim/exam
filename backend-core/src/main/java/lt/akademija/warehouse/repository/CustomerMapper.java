package lt.akademija.warehouse.repository;

import lt.akademija.warehouse.api.dto.Customer;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CustomerMapper {

    @Insert("INSERT INTO customer (id, first_name, last_name, birth_date, phone_number, client_type_status) VALUES (#{customer.id}, #{customer.firstName}, #{customer.lastName}, #{customer.birthDate}, #{customer.phoneNumber}, #{customer.clientTypeStatus})")
    @SelectKey(statement = "SELECT nextval('customer_seq_id')", keyProperty = "customer.id", before = true, resultType = int.class)
    void addCustomer(@Param("customer") Customer customer);

    @Select("SELECT * FROM customer")
    List<Customer> getAllCustomers();

    @Select("SELECT * FROM customer")
    List<Customer> getAllCustomerInformation();

//
//    @Delete("DELETE FROM book")
//    void deleteAllBooks();
//
//    @Delete("DELETE FROM reservation")
//    void deleteAllReservations();
//
//    @Delete("DELETE FROM location")
//    void deleteAllLocations();
}