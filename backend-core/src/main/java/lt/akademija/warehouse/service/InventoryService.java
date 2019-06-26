package lt.akademija.warehouse.service;

import lt.akademija.warehouse.api.dto.Customer;
import lt.akademija.warehouse.api.dto.Inventory;
import lt.akademija.warehouse.repository.CustomerMapper;
import lt.akademija.warehouse.repository.InventoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class InventoryService {

    private final InventoryMapper inventoryMapper;

    @Autowired
    public InventoryService(InventoryMapper inventoryMapper) {

        this.inventoryMapper = inventoryMapper;
    }

    public void addInventory(Inventory inventory) {
            inventoryMapper.addInventory(inventory);
    }

    public List<Inventory> getAllInventory() {
        return inventoryMapper.getAllInventory();
    }

    public List<Inventory> getInventoryByWeight() {
        return inventoryMapper.getInventoryByWeight();
    }

}
