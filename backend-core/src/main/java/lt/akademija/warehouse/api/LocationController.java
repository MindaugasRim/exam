package lt.akademija.warehouse.api;

import lt.akademija.warehouse.api.dto.BaseLocation;
import lt.akademija.warehouse.api.dto.Location;
import lt.akademija.warehouse.api.dto.*;
import lt.akademija.warehouse.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @GetMapping("/not-deleted")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Location> getAllNotDeletedLocations() {
        return locationService.getAllNotDeletedLocations();
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public void addLocation(@RequestBody Location location) {
        locationService.addLocation(location);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public void updateLocation(@RequestBody BaseLocation baseLocation, @PathVariable int id) {
        locationService.updateLocation(id, baseLocation);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable int id) {
        locationService.changeLocationDeletedStatus(id, true);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}/recover")
    public void recoverLocation(@PathVariable int id) {
        locationService.changeLocationDeletedStatus(id, false);
    }
}
