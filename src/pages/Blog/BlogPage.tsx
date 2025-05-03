import BlogList from "../../components/blog/BlogList";
type Props = {};

function BlogPage({}: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-text-primary">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <BlogList />
      </div>
    </div>
  );
}

export default BlogPage;
