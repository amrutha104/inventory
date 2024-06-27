package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.model.InventoryItem;
import com.examly.springapp.service.InventoryItemService;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryItemController {

    @Autowired
    private InventoryItemService inventoryItemService;

    @GetMapping
    public List<InventoryItem> getAllInventoryItems() {
        return inventoryItemService.getAllInventoryItems();
    }

    @GetMapping("/{id}")
    public InventoryItem getInventoryItemById(@PathVariable Long id) {
        return inventoryItemService.getInventoryItemById(id);
    }

    @PostMapping
    public ResponseEntity<InventoryItem> createInventoryItem(@RequestBody InventoryItem inventoryItem) {
        InventoryItem createdItem = inventoryItemService.createInventoryItem(inventoryItem);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public InventoryItem updateInventoryItem(@PathVariable Long id, @RequestBody InventoryItem inventoryItem) {
        return inventoryItemService.updateInventoryItem(id, inventoryItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInventoryItem(@PathVariable Long id) {
        inventoryItemService.deleteInventoryItem(id);
        return new ResponseEntity<>("Item deleted successfully", HttpStatus.OK);
    }
}
