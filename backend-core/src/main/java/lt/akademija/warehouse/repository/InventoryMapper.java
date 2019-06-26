package lt.akademija.warehouse.repository;

import lt.akademija.warehouse.api.dto.Inventory;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface InventoryMapper {

    @Select("SELECT * FROM inventory")
    List<Inventory> getAllInventory();

    @Insert("INSERT INTO inventory (id, name, weight, sector_number, place_date) VALUES (#{inventory.id}, #{inventory.name}, #{inventory.weight}, #{inventory.sectorNumber}, #{inventory.placeDate})")
    @SelectKey(statement = "SELECT nextval('inventory_seq_id')", keyProperty = "inventory.id", before = true, resultType = int.class)
    void addInventory(@Param("inventory") Inventory inventory);

}
