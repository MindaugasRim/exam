package lt.akademija.warehouse.service;

import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.repository.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomerService {

    private final CustomerMapper customerMapper;

    @Autowired
    public CustomerService(CustomerMapper customerMapper) {

        this.customerMapper = customerMapper;
    }

    public void addCustomer(Customer customer) {
            customerMapper.addCustomer(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerMapper.getAllCustomers();
    }

}
