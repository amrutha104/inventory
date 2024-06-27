package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.InventoryItem;
import com.examly.springapp.repository.InventoryItemRepository;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryItemServiceImpl implements InventoryItemService {

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    @Override
    public List<InventoryItem> getAllInventoryItems() {
        return inventoryItemRepository.findAll();
    }

    @Override
    public InventoryItem getInventoryItemById(Long id) {
        Optional<InventoryItem> optionalItem = inventoryItemRepository.findById(id);
        return optionalItem.orElse(null);
    }

    @Override
    public InventoryItem createInventoryItem(InventoryItem inventoryItem) {
        return inventoryItemRepository.save(inventoryItem);
    }

    @Override
    public InventoryItem updateInventoryItem(Long id, InventoryItem inventoryItem) {
        InventoryItem existingItem = getInventoryItemById(id);
        if (existingItem != null) {
            existingItem.setName(inventoryItem.getName());
            existingItem.setDescription(inventoryItem.getDescription());
            existingItem.setQuantity(inventoryItem.getQuantity());
            existingItem.setPrice(inventoryItem.getPrice());
            return inventoryItemRepository.save(existingItem);
        }
        return null;
    }

    @Override
    public void deleteInventoryItem(Long id) {
        inventoryItemRepository.deleteById(id);
    }
}