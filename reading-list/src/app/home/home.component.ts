import { Book } from './../interfaces/Book';
import { Component,OnInit,ViewChild } from '@angular/core';
import * as bookData from '../../assets/json/amazon.books.json';
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  bookData: Book[] = bookData as Book[];
  books: Book[] = [];
  selectedBook: Book | null = null;
  searchTerm: string = '';

  ngOnInit() {  
    this.books = Object.values(this.bookData);
    console.log(this.books);
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.books, event.previousIndex, event.currentIndex);
  }

  toggleDrawer(book?: Book) {
    if(book){
      this.selectedBook = book;
      console.log(book);
    }
    this.drawer.toggle();
  }
  
  filterBooks() {
    if (!this.searchTerm) {
      this.books = Object.values(this.bookData);
      return;
    }

    this.books = Object.values(this.bookData).filter(
      (book: Book) =>
        book.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.shortDescription?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.authors?.some(author => author.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  
}