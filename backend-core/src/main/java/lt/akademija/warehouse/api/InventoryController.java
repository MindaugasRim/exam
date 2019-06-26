package lt.akademija.warehouse.api;

import lt.akademija.warehouse.api.dto.Inventory;
import lt.akademija.warehouse.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public void addInventory(@RequestBody Inventory inventory) {
        inventoryService.addInventory(inventory);
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

}
