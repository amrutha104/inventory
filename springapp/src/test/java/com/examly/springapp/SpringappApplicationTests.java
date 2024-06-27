package com.examly.springapp;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import java.io.File;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SpringApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void backend_testControllerFolderExists() {
        String directoryPath = "src/main/java/com/examly/springapp/controller";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void backend_testInventoryItemControllerFileExists() {
        String filePath = "src/main/java/com/examly/springapp/controller/InventoryItemController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void backend_testModelFolderExists() {
        String directoryPath = "src/main/java/com/examly/springapp/model";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void backend_testModelFileExists() {
        String filePath = "src/main/java/com/examly/springapp/model/InventoryItem.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void backend_testRepositoryFolderExists() {
        String directoryPath = "src/main/java/com/examly/springapp/repository";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void backend_testRepositoryFileExists() {
        String filePath = "src/main/java/com/examly/springapp/repository/InventoryItemRepository.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void backend_testServiceFolderExists() {
        String directoryPath = "src/main/java/com/examly/springapp/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void backend_testServiceFileExists() {
        String filePath = "src/main/java/com/examly/springapp/service/InventoryItemService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    @Order(1)
    void backend_testAddInventoryItem() throws Exception {
        String itemJson = "{\"name\": \"Item 1\", \"description\": \"Description 1\", \"quantity\": 10, \"price\": 9.99}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(itemJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Item 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.quantity").value("10"));
    }

    @Test
    @Order(2)
    void backend_testGetAllInventoryItems() throws Exception {
        // Perform the GET request and check the status
        mockMvc.perform(MockMvcRequestBuilders.get("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].quantity").exists());
    }

    @Test
    @Order(3)
    void backend_testDeleteInventoryItemById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/inventory/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().string("Item deleted successfully"))
                .andReturn();
    }

}

