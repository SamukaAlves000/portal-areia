import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateMeta(title: string, description: string) {
    this.generateTags({ title, description });
  }

  generateTags(config: { title?: string, description?: string, image?: string }) {
    const fullTitle = config.title ? `${config.title} | AREIA - Porto Nacional` : 'AREIA - Porto Nacional';
    this.title.setTitle(fullTitle);

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
    }

    this.meta.updateTag({ property: 'og:title', content: fullTitle });

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }
  }
}
