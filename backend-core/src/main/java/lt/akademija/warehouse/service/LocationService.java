package lt.akademija.warehouse.service;

import lt.akademija.warehouse.api.dto.BaseLocation;
import lt.akademija.warehouse.api.dto.Location;
import lt.akademija.warehouse.repository.LocationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationMapper locationMapper;

    @Autowired
    public LocationService(LocationMapper locationMapper) {
        this.locationMapper = locationMapper;
    }

    public List<Location> getAllLocations() {
        return locationMapper.getAllLocations();
    }

    public List<Location> getAllNotDeletedLocations() {
        return locationMapper.getAllNotDeletedLocations();
    }

    public void addLocation(Location location) {
        locationMapper.addLocation(location);
    }

    public void updateLocation(int id, BaseLocation baseLocation) {
        locationMapper.updateLocation(id, baseLocation);
    }

    public void changeLocationDeletedStatus(int id, boolean locationDeletedStatus) {
        locationMapper.changeLocationDeletedStatus(id, locationDeletedStatus);
    }

}
