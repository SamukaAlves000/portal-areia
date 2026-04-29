import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateMeta(title: string, description: string, image?: string) {
    this.generateTags({ title, description, image });
  }

  generateTags(config: { title?: string, description?: string, image?: string }) {
    const fullTitle = config.title ? `${config.title} | AREIA - Porto Nacional` : 'AREIA - Porto Nacional';
    const defaultImage = 'https://i.ibb.co/bMwQ1mhx/Chat-GPT-Image-29-de-abr-de-2026-17-23-56.png';
    const image = config.image || defaultImage;

    this.title.setTitle(fullTitle);

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });

    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }
}
