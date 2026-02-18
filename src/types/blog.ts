export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    publishedAt: string;
    readTime: string;
    category: string;
    tags?: string[];
}
