import { Request, Response } from "express";
import * as CategoryService from "../services/category.Service";
import cloudinary from "../utils/cloudinary";
import * as fs from "fs";

const validPetTypes = ["dog", "cat", "both"] as const;

export const createCategory = async (req: Request, res: Response) => {
  const { name, description, petType } = req.body;
  const file = req.file;

  if (!name || !petType || !validPetTypes.includes(petType)) {
    return res.status(400).json({ error: "Nombre o petType inválido" });
  }

  try {
    let imageUrl = undefined;

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "categories",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(file.path);
    }

    const newCategory = await CategoryService.createCategory({
      name,
      description,
      image: imageUrl,
      petType,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (!id) return res.status(400).json({ error: "ID inválido" });

  try {
    const category = await CategoryService.getCategoryById(id);
    if (!category) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(category);
  } catch (error) {
    console.error("Error al obtener categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (!id) return res.status(400).json({ error: "ID inválido" });

  const { petType } = req.body;
  if (petType && !validPetTypes.includes(petType)) {
    return res.status(400).json({ error: "petType inválido" });
  }

  try {
    const updatedCategory = await CategoryService.updateCategory(id, req.body);
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (!id) return res.status(400).json({ error: "ID inválido" });

  try {
    await CategoryService.deleteCategory(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};
