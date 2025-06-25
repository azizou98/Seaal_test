// article-list.component.ts
// 📖 Article List Component - A vibrant display of articles with interactive features, standalone edition.
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // 📦 Importing needed modules directly.
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  search: string = '';
  page: number = 1;
  limit: number = 20;
  totalArticles: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.http.get(`/articles?page=${this.page}&limit=${this.limit}&search=${this.search}`)
      .subscribe((data: any) => {
        this.articles = data.articles || data; // Support both array and {articles, total}
        this.totalArticles = data.total || (Array.isArray(data) ? data.length : 0);
      });
  }

  get lastPage(): number {
    return Math.max(1, Math.ceil(this.totalArticles / this.limit));
  }

  takeOut(articleId: number) {
    this.http.post('/articles/take-out', { articleId }).subscribe(() => this.loadArticles());
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      console.log('Prev page:', this.page);
      this.loadArticles();
    }
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.page++;
      console.log('Next page:', this.page);
      this.loadArticles();
    }
  }

  onSearch() {
    this.page = 1;
    this.loadArticles();
  }
}