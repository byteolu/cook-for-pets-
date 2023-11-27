
// app/posts/[slug]

import NavigationBar from "@/app/components/NavigationBar";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, ["title", "author", "content"]);

  const content = await markdownToHtml(post.content || "");

  return (
    <div className="container mx-auto">
      <NavigationBar />
      <main>
        <div className="w-full h-16  text-black">
          <p className="text-2xl">{post.title}</p>
          <p className="text-gray-400">{post.author}</p>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </main>
    </div>
  );
}

// if i reimport markdown-styler.css
//             className={markdownStyles["markdown"]}
