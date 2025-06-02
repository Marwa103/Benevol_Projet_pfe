
package com.benevol.repository;

import com.benevol.model.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StockItemRepository extends JpaRepository<StockItem, String> {
    List<StockItem> findByOrderByNomAsc();
    List<StockItem> findByCategorie(String categorie);
    
    @Query("SELECT s FROM StockItem s WHERE s.quantite <= s.seuilAlerte")
    List<StockItem> findLowStockItems();
}
