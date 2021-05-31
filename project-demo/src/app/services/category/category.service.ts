import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/category";
import {Product} from "../../model/product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = `http://localhost:3000/categories`;
  // private categoryUrl = `http://localhost:3001/data_category`;
  private productUrl = `http://localhost:3001/data_category`;
  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.categoryUrl);

  }
  // getCategoryById(id : any): Observable<Category>{
  //   const urlOfCategory = `${this.categoryUrl}/${id}`
  //   return this.http.get<Category>(urlOfCategory);
  // }
  getCategoryById(id : any): Observable<Product>{
    const urlOfProduct = `${this.productUrl}/${id}`
    return this.http.get<Product>(urlOfProduct);
  }

  // createCategory(createCategoryDto: any):Observable<Category>{
  //   try{
  //     return this.http.post<Category>(this.categoryUrl, createCategoryDto);
  //   } catch (error) {
  //     this.errorHandler.handleError(error);
  //   }
  // }

  // updateCategory(categoryId: number , updateCategoryDto: any):Observable<void>{
  //   try{
  //     const urlOfCategory = `${this.categoryUrl}/${categoryId}`
  //     return this.http.put<void>(urlOfCategory, updateCategoryDto);
  //   } catch (error) {
  //     this.errorHandler.handleError(error);
  //   }
  // }

  // updateProduct(categoryId: number, productId: number, updateProductDto: any): Observable<void>{
  //   try{
  //     const urlOfProductOfCategory = `${this.categoryUrl}/${categoryId}/products/${productId}`
  //     return this.http.put<void>(urlOfProductOfCategory, updateProductDto);
  //   } catch (error) {
  //     this.errorHandler.handleError(error);
  //   }
  // }

  // deleteCategory(categoryId: number): Observable<any>{
  //   try{
  //     const urlOfCategory = `${this.categoryUrl}/${categoryId}`
  //     return this.http.delete<void>(urlOfCategory);
  //   } catch (error) {
  //     this.errorHandler.handleError(error);
  //   }
  // }

  // deleteProduct(categoryId: number, productId: number): Observable<void>{
  //   try{
  //     const urlOfProductOfCategory = `${this.categoryUrl}/${categoryId}/products/${productId}`
  //     return this.http.delete<void>(urlOfProductOfCategory);
  //   } catch (error) {
  //     this.errorHandler.handleError(error);
  //   }
  // }

  // getCategoryProducts(id : number): Observable<Product[]>{
  //   try {
  //     return this.http.get<Product[]>(`${this.categoryUrl}/products`);
  //   } catch (error) {
  //     this.errorHandler.handleError(error);
  //   }
  // }

  // addProduct(categoryId: number, createProductDto: any): Observable<void>{
  //   try{
  //     const urlOfCategory = `${this.categoryUrl}/products`
  //     return this.http.put<void>(urlOfCategory, createProductDto);
  //   } catch (error) {
  //     this.errorHandler.handleError(error);
  //   }
  // }
}
