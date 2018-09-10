package com.inm.stores.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.inm.stores.entities.Category;

@Service
public interface CategoryService {
	
	Category saveCategory(Category category);
	
	Category updateCategory(Category category);
	
	void deleteCategory(Category category);
	
	Optional<Category> getCategoryById(int id);
	
	List<Category> getAllCategories();
	
	List<Category> getAllCategoriesByDeptId(int id);

}
