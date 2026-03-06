import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { blogService } from "@/api/services";
import { ClientError } from "@/api/client";
import { getBlogBySlug } from "@/data/blogs";
import { ArrowLeft, Calendar, Clock, User, MapPin } from "lucide-react";
import type { BlogPostDetail } from "@/types";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

/** Map static BlogPost to API-shaped BlogPostDetail for fallback when API 404s. */
function staticToDetail(p: {
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
}): BlogPostDetail {
  return {
    id: parseInt(p.id, 10) || 0,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    coverImage: p.image,
    images: [],
    tags: p.tags ?? [],
    readingTime: p.readTime,
    category: p.category,
    relatedBlogs: [],
    status: "published",
    publishedAt: p.publishedAt,
    views: 0,
    authorId: "",
    authorName: p.author,
    createdAt: "",
    updatedAt: "",
  };
}

function formatBlogContent(content: string) {
  const paragraphs = content.split(/\n\n+/).filter(Boolean);
  return paragraphs.map((block, i) => {
    if (block.startsWith("**") && block.endsWith("**")) {
      const text = block.replace(/\*\*/g, "");
      return (
        <h3
          key={i}
          className="text-base md:text-lg font-bold text-gray-900 mt-6 mb-2"
        >
          {text}
        </h3>
      );
    }
    return (
      <p
        key={i}
        className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 break-words text-justify"
      >
        {block}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let post: BlogPostDetail;
  try {
    post = await blogService.getPublishedBySlug(slug);
  } catch (e) {
    if (e instanceof ClientError && e.status === 404) {
      const staticPost = getBlogBySlug(slug);
      if (staticPost) post = staticToDetail(staticPost);
      else notFound();
    } else {
      throw e;
    }
  }

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </section>

        {/* Title */}
        <section className="py-6 md:py-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center leading-tight">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Main content */}
        <section className="py-8 md:py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-6 max-w-7xl">
            <div className="mb-6 md:mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 md:gap-2 bg-white border border-gray-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm hover:bg-gray-50 hover:border-brand-orange/50 transition-all group"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Back to Blog
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              <div className="lg:col-span-2 min-w-0 space-y-6 md:space-y-8">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-orange" />
                    {post.authorName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-orange" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-orange" />
                    {post.readingTime}
                  </span>
                </div>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="prose prose-gray max-w-none w-full break-words overflow-hidden text-justify">
                  {formatBlogContent(post.content)}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-20 md:top-24 space-y-4 md:space-y-5">
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 shadow-md border border-gray-100">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-4 md:mb-5">
                      About the author
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                      {post.authorName} curates luxury travel experiences across
                      Sri Lanka. From wildlife safaris to heritage tours and
                      beach getaways, we help you discover the island with
                      comfort and style.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 shadow-md border border-gray-200">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      Explore tour packages
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
                      Turn inspiration into reality. Browse our curated tours across Sri Lanka—wildlife, heritage, wellness, and more.
                    </p>
                    <Link
                      href="/tours"
                      className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange/80 font-medium text-xs sm:text-sm transition-all group"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>View all tours</span>
                      <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <Link
                    href="/tours"
                    className="block w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-xs sm:text-sm py-2.5 sm:py-3 md:py-3.5 px-4 rounded-lg md:rounded-xl transition-all hover:scale-[1.02] text-center shadow-md"
                  >
                    Plan your trip
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
