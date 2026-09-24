import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rj-propousal';
  currentPage = 0;

  readonly pageNames = [
    'Cover',
    'About',
    'Family',
    'Education',
    'Career',
    'Gallery',
    'Family',
    'Values',
    'Partner',
    'Beginning'
  ];

  readonly totalPages = this.pageNames.length;
  pages = this.pageNames;

  lightboxOpen = false;
  selectedPhoto = '';

  private touchStartX = 0;
  private touchEndX = 0;

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.showPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.showPage(this.currentPage - 1);
    }
  }

  goToPage(index: number): void {
    this.showPage(index);
  }

  private showPage(index: number): void {
    this.currentPage = Math.max(0, Math.min(index, this.totalPages - 1));
  }

  openPhoto(src: string): void {
    this.selectedPhoto = src;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closePhoto(): void {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  getFileName(src: string): string {
    return src.split('/').pop() || 'photo';
  }

  showPlaceholder(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.style.display = 'none';

    const placeholder = image.nextElementSibling as HTMLElement | null;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;

    const distance = this.touchEndX - this.touchStartX;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance < 0) {
      this.nextPage();
    } else {
      this.previousPage();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      this.nextPage();
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      this.previousPage();
    }

    if (event.key === 'Escape') {
      this.closePhoto();
    }
  }
}
