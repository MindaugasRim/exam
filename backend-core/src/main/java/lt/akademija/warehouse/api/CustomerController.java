package lt.akademija.warehouse.api;

import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public void addCustomer(@RequestBody Customer customer) {
        customerService.addCustomer(customer);
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

}
