import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageWrapper from '@/components/PageWrapper';
import { blogPosts, type BlogPost } from '@/data/blogPosts';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

const formatDate = (iso: string) => {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">Our Blog</h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Articles on literacy, learning recovery, and supporting young readers—from the Pickering Reading
                Circle team.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden border-border shadow-sm cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]"
                  onClick={() => setSelectedPost(post)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-primary line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {formatDate(post.date)} · {post.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed line-clamp-3">
                      {post.paragraphs[0]}
                    </p>
                    <p className="text-primary text-sm mt-2 font-medium">
                      Read more →
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogTitle className="text-2xl text-primary">
              {selectedPost?.title}
            </DialogTitle>
            <DialogDescription className="text-base font-normal">
              {selectedPost && formatDate(selectedPost.date)} · {selectedPost?.author}
            </DialogDescription>
            <div className="mt-4 space-y-4">
              {selectedPost?.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-foreground/95 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageWrapper>
  );
};

export default Blog;
