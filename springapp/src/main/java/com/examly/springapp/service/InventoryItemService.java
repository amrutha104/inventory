package com.examly.springapp.service;

import com.examly.springapp.model.InventoryItem;
import java.util.List;

public interface InventoryItemService {
    List<InventoryItem> getAllInventoryItems();
    InventoryItem getInventoryItemById(Long id);
    InventoryItem createInventoryItem(InventoryItem inventoryItem);
    InventoryItem updateInventoryItem(Long id, InventoryItem inventoryItem);
    void deleteInventoryItem(Long id);
}