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

    @Select("SELECT DISTINCT customer.id, customer.first_name, customer.last_name, customer.client_type_status, customer.birth_date, customer.phone_number, (SELECT count(*) AS quantity\n" +
            "                             FROM inventory\n" +
            "                             WHERE customer_id = customer.id) as quantity\n" +
            "FROM customer\n" +
            "         LEFT JOIN inventory\n" +
            "                   ON customer.id = inventory.customer_id")
    List<Customer> getAllCustomerInformation();

    @Select("SELECT DISTINCT customer.first_name, customer.last_name, (SELECT count(*) AS quantity\n" +
            "    FROM inventory\n" +
            "    WHERE customer_id = customer.id) as quantity\n" +
            "FROM customer\n" +
            "    LEFT JOIN inventory\n" +
            "ON customer.id = inventory.customer_id\n" +
            "ORDER BY quantity DESC\n" +
            "LIMIT 5")
    List<Customer> getStatisticsByOrders();

    @Select("SELECT DISTINCT customer.first_name, customer.last_name, (SELECT SUM(weight) AS quantity\n" +
            "    FROM inventory\n" +
            "    WHERE customer_id = customer.id) as quantity\n" +
            "FROM customer\n" +
            "    LEFT JOIN inventory\n" +
            "ON customer.id = inventory.customer_id\n" +
            "ORDER BY quantity DESC\n" +
            "LIMIT 5")
    List<Customer> getStatisticsByWeight();

}