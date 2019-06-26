package lt.akademija.warehouse.repository;

import lt.akademija.warehouse.api.dto.BaseLocation;
import lt.akademija.warehouse.api.dto.Location;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LocationMapper {

    @Select("SELECT * FROM location")
    List<Location> getAllLocations();

    @Select("SELECT id FROM location WHERE id = #{id} AND loc_deleted_status is FALSE")
    Location getNotDeletedLocation(int id);

    @Select("SELECT * FROM location WHERE loc_deleted_status IS FALSE")
    List<Location> getAllNotDeletedLocations();

    @Insert("INSERT INTO location (id, loc_name) VALUES (#{location.id}, #{location.locName})")
    @SelectKey(statement = "SELECT nextval('location_seq_id')", keyProperty = "location.id", before = true, resultType = int.class)
    void addLocation(@Param("location") Location location);

    @Update("UPDATE location SET loc_name = #{baseLocation.locName} WHERE id = #{id}")
    void updateLocation(
            @Param("id") int id,
            @Param("baseBook") BaseLocation baseLocation);

    @Update("UPDATE location SET loc_deleted_status = #{locationDeletedStatus} WHERE id = #{id}")
    void changeLocationDeletedStatus(
            @Param("id") int id,
            @Param("locationDeletedStatus") boolean locationDeletedStatus);
}
